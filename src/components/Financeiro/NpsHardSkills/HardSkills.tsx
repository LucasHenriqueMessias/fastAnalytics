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
  maquina_cartao: number;
  emprestimos_financiamentos: number;
  telefonia: number;
  contabilidade: number;
  taxas_bancarias: number;
  taxas_administrativas: number;
  core: boolean;
}

const HardSkills = () => {
  const [roiData, setRoiData] = useState<RoiData[]>([]);
  const [filteredData, setFilteredData] = useState<RoiData[]>([]);
  const [filterCliente, setFilterCliente] = useState(''); // Estado para o filtro de cliente

 
  const apiUrl = process.env.REACT_APP_API_URL;

  const columns: GridColDef[] = [
    { field: 'data_criacao', headerName: 'Data', width: 180 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cliente', headerName: 'Cliente', width: 150 },
    { field: 'usuario', headerName: 'Consultor', width: 150 },
    { field: 'departamento', headerName: 'Departamento', width: 150 },
    { field: 'maquina_cartao', headerName: 'Máquina de Cartão', width: 150 },
    { field: 'emprestimos_financiamentos', headerName: 'Empréstimos/Financiamentos', width: 150 },
    { field: 'telefonia', headerName: 'Telefonia', width: 150 },
    { field: 'contabilidade', headerName: 'Contabilidade', width: 150 },
    { field: 'taxas_bancarias', headerName: 'Taxas Bancárias', width: 150 },
    { field: 'taxas_administrativas', headerName: 'Taxas Administrativas', width: 150 },
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
      const dataWithCore = response.data.map((item: RoiData) => ({
        ...item,
        core: true,
      }));
      setRoiData(dataWithCore);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Filtrar os dados conforme o valor digitado no campo de filtro
    if (filterCliente) {
      setFilteredData(
        roiData.filter((row) =>
          row.usuario.toLowerCase().includes(filterCliente.toLowerCase())
        )
      );
    } else {
      setFilteredData(roiData); // Restaurar todos os dados quando o filtro estiver vazio
    }
  }, [filterCliente, roiData]);

 
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Jornada de Crescimento Core
      </Typography>
      <div>
  <p><strong>Descrição de cada Valor a ser preenchido:</strong></p>
  <p>
    <strong>0 Não Se aplica:</strong> O tema não é pertinente à realidade do cliente (ex: o cliente não utiliza máquina de cartão).<br />
    <strong>1 Tema Não Tratado:</strong> O consultor ainda não iniciou qualquer abordagem ou análise sobre o tema.<br />
    <strong>2 Tema identificado:</strong> O consultor identificou o tema como relevante, mas ainda não realizou ações concretas (ex: apenas anotado no plano de ação).<br />
    <strong> 3 Tema em andamento:</strong> O consultor já iniciou ações (ex: comparou taxas, levantou dados), mas ainda sem implementação ou resultado perceptível.<br />
    <strong>4 Tema Tratado Parcialmente:</strong> O consultor atuou, houve implementação ou mudança, mas os resultados ainda são iniciais ou abaixo do esperado.<br />
    <strong>5 Tema tratado com excelência:</strong> O consultor atuou de forma estratégica, houve mudança concreta e os resultados foram significativos para o cliente.
  </p>
</div>
      <br />
      <TextField
        margin="normal"
        label="Filtrar por Usuário"
        variant="outlined"
        fullWidth
        value={filterCliente}
        onChange={(e) => setFilterCliente(e.target.value)} // Atualiza o estado do filtro
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

export default HardSkills;