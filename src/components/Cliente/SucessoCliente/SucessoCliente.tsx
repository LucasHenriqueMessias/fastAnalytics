import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, useTheme } from '@mui/material';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { tokens } from '../../../theme';

interface SucessoData {
  id: number;
  cnpjCliente: string;
  sucesso: number;
  feedbackPosVenda: string;
  feedbackNegocio: string;
  feedbackProduto: string;
  NpsFast: number;
  LtvConsultor: number;
  usuario: string;
  data: Date;
  dataContato: Date;
  dataUltimoContato: Date;
  dataProximoContato: Date;
}

const SucessoCliente = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [showForm, setShowForm] = useState(false);
  const [newSucesso, setNewSucesso] = useState<SucessoData>({
    id: 0,
    cnpjCliente: '',
    sucesso: 0,
    feedbackPosVenda: '',
    feedbackNegocio: '',
    feedbackProduto: '',
    NpsFast: 0,
    LtvConsultor: 0,
    usuario: '',
    data: new Date(),
    dataContato: new Date(),
    dataUltimoContato: new Date(),
    dataProximoContato: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-sucesso-cliente`, config);
        const data = response.data.map((item: SucessoData) => ({
          ...item,
          data: new Date(item.data).toLocaleDateString(),
          dataContato: new Date(item.dataContato).toLocaleDateString(),
          dataUltimoContato: new Date(item.dataUltimoContato).toLocaleDateString(),
          dataProximoContato: new Date(item.dataProximoContato).toLocaleDateString(),
        }));
        setRows(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert(`Erro ao buscar dados: ${(error as Error).message}`);
      }
    };

    fetchData();
  }, []);

  const handleAddSucesso = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitSucesso = async () => {
    const token = getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sucesso`, newSucesso, config);
      setRows([...rows, { id: response.data.id, ...response.data }]);
      setShowForm(false);
      setNewSucesso({
        id: 0,
        cnpjCliente: '',
        sucesso: 0,
        feedbackPosVenda: '',
        feedbackNegocio: '',
        feedbackProduto: '',
        NpsFast: 0,
        LtvConsultor: 0,
        usuario: '',
        data: new Date(),
        dataContato: new Date(),
        dataUltimoContato: new Date(),
        dataProximoContato: new Date(),
      });
    } catch (error) {
      console.error('Erro ao cadastrar Sucesso:', error);
      if (error instanceof Error) {
        alert(`Erro ao cadastrar Sucesso: ${error.message}`);
      } else {
        alert('Erro ao cadastrar Sucesso: Erro desconhecido');
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cnpjCliente', headerName: 'CNPJ Cliente', width: 150 },
    { field: 'sucesso', headerName: 'Descrição', width: 150 },
    { field: 'feedbackPosVenda', headerName: 'Feedback Pós-Venda', width: 200 },
    { field: 'feedbackNegocio', headerName: 'Feedback Negócio', width: 200 },
    { field: 'feedbackProduto', headerName: 'Feedback Produto', width: 200 },
    { field: 'NpsFast', headerName: 'NPS Fast', width: 150 },
    { field: 'LtvConsultor', headerName: 'LTV Consultor', width: 150 },
    { field: 'usuario', headerName: 'Consultor Comercial', width: 150 },
    { field: 'data', headerName: 'Criado', width: 150 },
    { field: 'dataContato', headerName: 'Primeiro Contato', width: 150 },
    { field: 'dataUltimoContato', headerName: 'Último Contato', width: 150 },
    { field: 'dataProximoContato', headerName: 'Próximo Contato', width: 150 },
  ];
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors

  return (
    <div style={{ height: 600, width: '80%', margin: '0 auto' }}> {/* Adicionado margin: '0 auto' */}
      <h1>Sucesso Cliente</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSucesso}
        style={{ marginBottom: '16px' }} // Adiciona margem inferior
      >
        Cadastrar Sucesso
      </Button>
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Cadastro de Sucesso</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="CNPJ Cliente"
            type="text"
            fullWidth
            value={newSucesso.cnpjCliente}
            onChange={(e) => setNewSucesso({ ...newSucesso, cnpjCliente: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descrição"
            type="number"
            fullWidth
            value={newSucesso.sucesso}
            onChange={(e) => setNewSucesso({ ...newSucesso, sucesso: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Feedback Pós-Venda"
            type="text"
            fullWidth
            value={newSucesso.feedbackPosVenda}
            onChange={(e) => setNewSucesso({ ...newSucesso, feedbackPosVenda: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Feedback Negócio"
            type="text"
            fullWidth
            value={newSucesso.feedbackNegocio}
            onChange={(e) => setNewSucesso({ ...newSucesso, feedbackNegocio: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Feedback Produto"
            type="text"
            fullWidth
            value={newSucesso.feedbackProduto}
            onChange={(e) => setNewSucesso({ ...newSucesso, feedbackProduto: e.target.value })}
          />
          <TextField
            margin="dense"
            label="NPS Fast"
            type="number"
            fullWidth
            value={newSucesso.NpsFast}
            onChange={(e) => setNewSucesso({ ...newSucesso, NpsFast: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="LTV Consultor"
            type="number"
            fullWidth
            value={newSucesso.LtvConsultor}
            onChange={(e) => setNewSucesso({ ...newSucesso, LtvConsultor: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Usuário"
            type="text"
            fullWidth
            value={newSucesso.usuario}
            onChange={(e) => setNewSucesso({ ...newSucesso, usuario: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Criado"
            type="date"
            fullWidth
            value={newSucesso.data.toISOString().split('T')[0]}
            onChange={(e) => setNewSucesso({ ...newSucesso, data: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Primeiro Contato"
            type="date"
            fullWidth
            value={newSucesso.dataContato.toISOString().split('T')[0]}
            onChange={(e) => setNewSucesso({ ...newSucesso, dataContato: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Último Contato"
            type="date"
            fullWidth
            value={newSucesso.dataUltimoContato.toISOString().split('T')[0]}
            onChange={(e) => setNewSucesso({ ...newSucesso, dataUltimoContato: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Próximo Contato"
            type="date"
            fullWidth
            value={newSucesso.dataProximoContato.toISOString().split('T')[0]}
            onChange={(e) => setNewSucesso({ ...newSucesso, dataProximoContato: new Date(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmitSucesso} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 400, width: '80%', marginTop: 20, margin: '0 auto' }}> {/* Adicionado margin: '0 auto' */}
      <DataGrid rows={rows} columns={columns} autoPageSize
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
    </div>
  );
};

export default SucessoCliente;