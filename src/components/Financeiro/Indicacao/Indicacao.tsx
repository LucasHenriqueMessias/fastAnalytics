import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { tokens } from '../../../theme';

const Indicacao = () => {
  const [indicacaoData, setIndicacaoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    usuario: '',
    cnpj_cliente_indicado: '',
    razao_social: '',
    atuacao: '',
    status: ''
  });
  const [chartData, setChartData] = useState<{ labels: string[], datasets: { label: string, data: number[], backgroundColor: string[] }[] }>({ labels: [], datasets: [] });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'usuario', headerName: 'Usuário', width: 150 },
    { field: 'data_criacao', headerName: 'Data de Criação', width: 180},
    { field: 'cnpj_cliente_indicado', headerName: 'CNPJ Cliente Indicado', width: 250 },
    { field: 'razao_social', headerName: 'Razão Social', width: 150 },
    { field: 'atuacao', headerName: 'Atuação', width: 150 },
    { field: 'status', headerName: 'Status', width: 180 },
  ];

  useEffect(() => {
    fetchData();
    fetchChartData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-indicacao-cliente`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIndicacaoData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-indicacao-cliente/count-segmento`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      const labels = data.map((item: { atuacao: string }) => item.atuacao);
      const counts = data.map((item: { count: number }) => item.count);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Segmento de Atuação',
            data: counts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          }
        ]
      });
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = getAccessToken();
      await axios.post(`${process.env.REACT_APP_API_URL}/tab-indicacao-cliente`, newRecord, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Erro ao adicionar registro:', error);
    }
  };
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dados de Indicação
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <div style={{ height: 400, width: '100%', marginTop: 20 }}>
          <DataGrid rows={indicacaoData} columns={columns} autoPageSize
           sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: colors.lightBlue[900], //cabeçalho da tabela
            },
            
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.white[500], //Linhas da tabela
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: colors.lightBlue[900], //Rodapé da tabela
            }
            
          }}
          />
        </div>
        <div style={{ height: 400, width: '50%',  marginTop: 20 }}>
          <Bar data={chartData} />
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="usuario"
            label="Usuário"
            type="text"
            fullWidth
            value={newRecord.usuario}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cnpj_cliente_indicado"
            label="CNPJ Cliente Indicado"
            type="text"
            fullWidth
            value={newRecord.cnpj_cliente_indicado}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="razao_social"
            label="Razão Social"
            type="text"
            fullWidth
            value={newRecord.razao_social}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="atuacao"
            label="Atuação"
            type="text"
            fullWidth
            value={newRecord.atuacao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={newRecord.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Indicacao;