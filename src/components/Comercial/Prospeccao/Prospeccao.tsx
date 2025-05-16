import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { tokens } from '../../../theme';


const Prospeccao = () => {
  const [prospeccaoData, setProspeccaoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    data: '',
    consultor_comercial: '',
    empresa: '',
    cnpj_cpf: '',
    fundacao: '',
    localizacao: '',
    telefone: '',
    responsavel: '',
    email: '',
    indicacao: false,
    indicacao_nome: '',
    status: '',
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { 
      field: 'data', 
      headerName: 'Data', 
      width: 150
    },
    { field: 'consultor_comercial', headerName: 'Consultor Comercial', width: 150 },
    { field: 'empresa', headerName: 'Empresa', width: 150 },
    { field: 'cnpj_cpf', headerName: 'CNPJ/CPF', width: 150 },
    { field: 'fundacao', headerName: 'Fundação', width: 150 },
    { field: 'localizacao', headerName: 'Localização', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'responsavel', headerName: 'Responsável', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'indicacao', headerName: 'Indicação', width: 150, type: 'boolean' },
    { field: 'indicacao_nome', headerName: 'Nome da Indicação', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProspeccaoData(response.data);
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
    const { name, value, type, checked } = e.target;
    setNewRecord({ ...newRecord, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const token = getAccessToken();
      await axios.post(`${process.env.REACT_APP_API_URL}/tab-prospeccao`, newRecord, {
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
        Funil
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={prospeccaoData} columns={columns} autoPageSize 
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
            name="data"
            label="Data"
            type="date"
            fullWidth
            value={newRecord.data}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="consultor_comercial"
            label="Consultor Comercial"
            type="text"
            fullWidth
            value={newRecord.consultor_comercial}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="empresa"
            label="Empresa"
            type="text"
            fullWidth
            value={newRecord.empresa}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cnpj_cpf"
            label="CNPJ/CPF"
            type="text"
            fullWidth
            value={newRecord.cnpj_cpf}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fundacao"
            label="Fundação"
            type="text"
            fullWidth
            value={newRecord.fundacao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="localizacao"
            label="Localização"
            type="text"
            fullWidth
            value={newRecord.localizacao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="telefone"
            label="Telefone"
            type="text"
            fullWidth
            value={newRecord.telefone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="responsavel"
            label="Responsável"
            type="text"
            fullWidth
            value={newRecord.responsavel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newRecord.email}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={newRecord.indicacao}
                onChange={handleChange}
                name="indicacao"
              />
            }
            label="Indicação"
          />
          <TextField
            margin="dense"
            name="indicacao_nome"
            label="Nome da Indicação"
            type="text"
            fullWidth
            value={newRecord.indicacao_nome}
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

export default Prospeccao;