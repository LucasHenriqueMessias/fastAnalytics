import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';



const Roi = () => {
  const [roiData, setRoiData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    cnpj: '',
    usuario: '',
    data_criacao: '',
    maquina_cartao: '',
    emprestimos_financiamentos: '',
    telefonia: '',
    contabilidade: '',
    taxas_bancarias: '',
    taxas_administrativas: '',
    investimentos: '',
    juridico: '',
    mensalidade_roi: '',
    ferias: '',
    aumento_equipe: ''
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cnpj', headerName: 'CNPJ', width: 150 },
    { field: 'usuario', headerName: 'Usuário', width: 150 },
    { field: 'data_criacao', headerName: 'Data de Criação', width: 180},
    { field: 'maquina_cartao', headerName: 'Máquina de Cartão', width: 150 },
    { field: 'emprestimos_financiamentos', headerName: 'Empréstimos/Financiamentos', width: 150 },
    { field: 'telefonia', headerName: 'Telefonia', width: 150 },
    { field: 'contabilidade', headerName: 'Contabilidade', width: 150 },
    { field: 'taxas_bancarias', headerName: 'Taxas Bancárias', width: 150 },
    { field: 'taxas_administrativas', headerName: 'Taxas Administrativas', width: 150 },
    { field: 'investimentos', headerName: 'Investimentos', width: 150 },
    { field: 'juridico', headerName: 'Jurídico', width: 150 },
    { field: 'mensalidade_roi', headerName: 'Mensalidade ROI', width: 150 },
    { field: 'ferias', headerName: 'Férias', width: 150 },
    { field: 'aumento_equipe', headerName: 'Aumento de Equipe', width: 150 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get('http://localhost:3002/tab-roi', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoiData(response.data);
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
      await axios.post('http://localhost:3002/roi', newRecord, {
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
        Dados de Retorno Sobre o Investimento
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Registro
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={roiData} columns={columns} autoPageSize />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="cnpj"
            label="CNPJ"
            type="text"
            fullWidth
            value={newRecord.cnpj}
            onChange={handleChange}
          />
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
            name="data_criacao"
            label="Data de Criação"
            type="date"
            fullWidth
            value={newRecord.data_criacao}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="maquina_cartao"
            label="Máquina de Cartão"
            type="text"
            fullWidth
            value={newRecord.maquina_cartao}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="emprestimos_financiamentos"
            label="Empréstimos/Financiamentos"
            type="text"
            fullWidth
            value={newRecord.emprestimos_financiamentos}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="telefonia"
            label="Telefonia"
            type="text"
            fullWidth
            value={newRecord.telefonia}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contabilidade"
            label="Contabilidade"
            type="text"
            fullWidth
            value={newRecord.contabilidade}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="taxas_bancarias"
            label="Taxas Bancárias"
            type="text"
            fullWidth
            value={newRecord.taxas_bancarias}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="taxas_administrativas"
            label="Taxas Administrativas"
            type="text"
            fullWidth
            value={newRecord.taxas_administrativas}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="investimentos"
            label="Investimentos"
            type="text"
            fullWidth
            value={newRecord.investimentos}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="juridico"
            label="Jurídico"
            type="text"
            fullWidth
            value={newRecord.juridico}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="mensalidade_roi"
            label="Mensalidade ROI"
            type="text"
            fullWidth
            value={newRecord.mensalidade_roi}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="ferias"
            label="Férias"
            type="text"
            fullWidth
            value={newRecord.ferias}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="aumento_equipe"
            label="Aumento de Equipe"
            type="text"
            fullWidth
            value={newRecord.aumento_equipe}
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

export default Roi;