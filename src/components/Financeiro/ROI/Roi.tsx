import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { tokens } from '../../../theme';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

interface RoiData {
  id: number;
  cliente: string;
  usuario: string;
  departamento: string;
  data_criacao: string;
  investimentos: number;
  juridico: number;
  mensalidade_roi: number;
  ferias: number;
  aumento_equipe: number;
}

const Roi = () => {
  const [roiData, setRoiData] = useState<RoiData[]>([]);
  const [filteredData, setFilteredData] = useState<RoiData[]>([]); // Para os dados filtrados
  const [filterUsuario, setFilterUsuario] = useState(''); // Para armazenar o filtro por usuário
  const apiUrl = process.env.REACT_APP_API_URL;

  const columns: GridColDef[] = [
    { field: 'data_criacao', headerName: 'Data', width: 180 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cliente', headerName: 'Cliente', width: 150 },
    { field: 'usuario', headerName: 'Consultor', width: 150 },
    { field: 'departamento', headerName: 'Departamento', width: 150 },
    { field: 'investimentos', headerName: 'Investimentos', width: 150 },
    { field: 'juridico', headerName: 'Jurídico', width: 150 },
    { field: 'mensalidade_roi', headerName: 'Mensalidade ROI', width: 150 },
    { field: 'ferias', headerName: 'Férias', width: 150 },
    { field: 'aumento_equipe', headerName: 'Aumento de Equipe', width: 150 },
  ];

  const theme = useTheme(); // Define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // Inclui o padrão de cores adotado em theme.palette.mode para colors

  const fetchData = useCallback(async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${apiUrl}/tab-roi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoiData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Atualiza os dados filtrados com base no filtro do usuário
    if (filterUsuario) {
      setFilteredData(
        roiData.filter((row) =>
          row.usuario.toLowerCase().includes(filterUsuario.toLowerCase())
        )
      );
    } else {
      setFilteredData(roiData); // Se não houver filtro, exibe todos os dados
    }
  }, [filterUsuario, roiData]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nps Soft Skills
      </Typography>
      <a href="a">Apresenta a avaliação de desempenho do cliente por parte do consultor.</a>
      <br />
      <TextField
        margin="normal"
        label="Filtrar por Usuário"
        variant="outlined"
        fullWidth
        value={filterUsuario}
        onChange={(e) => setFilterUsuario(e.target.value)} // Atualiza o valor do filtro por usuário
      />
      <Button variant="contained" color="primary" >
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          autoPageSize
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: colors.lightBlue[900], // Cabeçalho da tabela
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.white[500], // Linhas da tabela
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: colors.lightBlue[900], // Rodapé da tabela
            },
          }}
        />
      </div>
    </Container>
  );
};

export default Roi;