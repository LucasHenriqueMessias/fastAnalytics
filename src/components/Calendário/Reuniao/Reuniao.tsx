import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';


const Reuniao = () => {
  const [reuniaoData, setReuniaoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    user: '',
    cliente: '',
    status: '',
    tipo_reuniao: '',
    local_reuniao: '',
    Ata_reuniao: '',
    data_marcada: '',
    data_realizada: '',
    data_criacao: '',
    caminho: '',
    nps_reuniao: ''
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'Usuário', width: 150 },
    { field: 'cliente', headerName: 'Cliente', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'tipo_reuniao', headerName: 'Tipo de Reunião', width: 150 },
    { field: 'local_reuniao', headerName: 'Local da Reunião', width: 150 },
    { field: 'Ata_reuniao', headerName: 'Ata da Reunião', width: 150 },
    { field: 'data_marcada', headerName: 'Data Marcada', width: 180 },
    { field: 'data_realizada', headerName: 'Data Realizada', width: 180 },
    { field: 'caminho', headerName: 'Caminho', width: 150 },
    { field: 'nps_reuniao', headerName: 'NPS', width: 150, type: 'number' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get('http://localhost:3002/tab-reuniao', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReuniaoData(response.data);
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
      await axios.post('http://localhost:3002/tab-reuniao', newRecord, {
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
        Dados de Reunião
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={reuniaoData} columns={columns} autoPageSize />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="user"
            label="Usuário"
            type="text"
            fullWidth
            value={newRecord.user}
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
          <TextField
            margin="dense"
            name="tipo_reuniao"
            label="Tipo de Reunião"
            type="text"
            fullWidth
            value={newRecord.tipo_reuniao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="local_reuniao"
            label="Local da Reunião"
            type="text"
            fullWidth
            value={newRecord.local_reuniao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Ata_reuniao"
            label="Ata da Reunião"
            type="text"
            fullWidth
            value={newRecord.Ata_reuniao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="data_marcada"
            label="Data Marcada"
            type="date"
            fullWidth
            value={newRecord.data_marcada}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="data_realizada"
            label="Data Realizada"
            type="date"
            fullWidth
            value={newRecord.data_realizada}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="caminho"
            label="Caminho"
            type="text"
            fullWidth
            value={newRecord.caminho}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="nps_reuniao"
            label="NPS"
            type="number"
            fullWidth
            value={newRecord.nps_reuniao}
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

export default Reuniao;