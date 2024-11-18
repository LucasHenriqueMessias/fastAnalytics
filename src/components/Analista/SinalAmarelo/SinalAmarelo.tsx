import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { tokens } from '../../../theme';

const SinalAmarelo = () => {
  const [sinalAmareloData, setSinalAmareloData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ usuario: '', cliente: '', status: '', data_criacao: '' });
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'usuario', headerName: 'Usuário', width: 200 },
    { field: 'cliente', headerName: 'Cliente', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
    { 
      field: 'data_criacao', 
      headerName: 'Data de Criação', 
      width: 180} 
    
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get('http://localhost:3002/tab-sinal-amarelo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSinalAmareloData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
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
      await axios.post('http://localhost:3002/tab-sinal-amarelo', newRecord, {
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dados de Sinal Amarelo
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={sinalAmareloData} columns={columns} autoPageSize
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor:  colors.lightBlue[900], //cabeçalho da tabela
          },
          
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.white[500], //Linhas da tabela
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: colors.lightBlue[900], //Rodapé da tabela
          }
          
        }} />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
            name="cliente"
            label="Cliente"
            type="text"
            fullWidth
            value={newRecord.cliente}
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

export default SinalAmarelo;