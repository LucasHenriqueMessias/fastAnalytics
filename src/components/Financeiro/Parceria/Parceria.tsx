import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { tokens } from '../../../theme';



const Parceria = () => {
  const [parceriaData, setParceriaData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    padrinho: '',
    parceiro: '',
    justificativa: '',
    status: '',
    resultado: ''
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'data_criacao', headerName: 'Data de Criação', width: 180 },
    { field: 'padrinho', headerName: 'Padrinho', width: 150 },
    { field: 'parceiro', headerName: 'Parceiro', width: 150 },
    { field: 'justificativa', headerName: 'Justificativa', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'resultado', headerName: 'Resultado', width: 180 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-parceria-fast`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setParceriaData(response.data);
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
      await axios.post(`${process.env.REACT_APP_API_URL}/tab-parceria-fast`, newRecord, {
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
        Parceiros
      </Typography>
      <a href=' '> Parceiros que fazem parte do Ecossistema Fast</a>
      <br></br>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={parceriaData} columns={columns} autoPageSize 
        
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
         
          <TextField
            margin="dense"
            name="padrinho"
            label="Padrinho"
            type="text"
            fullWidth
            value={newRecord.padrinho}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="parceiro"
            label="Parceiro"
            type="text"
            fullWidth
            value={newRecord.parceiro}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="justificativa"
            label="Justificativa"
            type="text"
            fullWidth
            value={newRecord.justificativa}
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
            name="resultado"
            label="Resultado"
            type="text"
            fullWidth
            value={newRecord.resultado}
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

export default Parceria;