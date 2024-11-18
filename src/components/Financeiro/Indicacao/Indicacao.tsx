import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';



const Indicacao = () => {
  const [indicacaoData, setIndicacaoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    usuario: '',
    data_criacao: '',
    cnpj_cliente_indicado: '',
    razao_social: '',
    atuacao: '',
    status: ''
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'usuario', headerName: 'Usuário', width: 150 },
    { field: 'data_criacao', headerName: 'Data de Criação', width: 180},
    { field: 'cnpj_cliente_indicado', headerName: 'CNPJ Cliente Indicado', width: 250 },
    { field: 'razao_social', headerName: 'Razão Social', width: 150 },
    { field: 'atuacao', headerName: 'Atuação', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get('http://localhost:3002/tab-indicacao-cliente', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIndicacaoData(response.data);
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
      await axios.post('http://localhost:3002/tab-indicacao-cliente', newRecord, {
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
        Dados de Indicação
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={indicacaoData} columns={columns} autoPageSize />
      </div>
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