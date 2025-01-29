import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, useTheme } from '@mui/material';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { tokens } from '../../../theme';

interface DreData {
  id: number;
  Data: Date;
  Descricao: string;
  Valor: number;
  AnaliseVertical: number;
  AnaliseHorizontal: number;
  Cliente: string;
  Usuario: string;
}

const Dre = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [showForm, setShowForm] = useState(false);
  const [newDre, setNewDre] = useState<DreData>({
    id: 0,
    Data: new Date(),
    Descricao: '',
    Valor: 0,
    AnaliseVertical: 0,
    AnaliseHorizontal: 0,
    Cliente: '',
    Usuario: '',
  });

  const token = getAccessToken(); // Replace with your actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-dre`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.map((item: DreData) => ({
          id: item.id,
          Data: new Date(item.Data).toLocaleDateString(),
          Descricao: item.Descricao,
          Valor: item.Valor,
          AnaliseVertical: item.AnaliseVertical,
          AnaliseHorizontal: item.AnaliseHorizontal,
          Cliente: item.Cliente,
          Usuario: item.Usuario,
        }));
        setRows(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleAddDre = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitDre = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tab-dre`, newDre, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows([...rows, response.data]);
      setShowForm(false);
      setNewDre({
        id: 0,
        Data: new Date(),
        Descricao: '',
        Valor: 0,
        AnaliseVertical: 0,
        AnaliseHorizontal: 0,
        Cliente: '',
        Usuario: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar DRE:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'Data', headerName: 'Data', flex: 1 },
    { field: 'Descricao', headerName: 'Descrição', flex: 1 },
    { field: 'Valor', headerName: 'Valor', flex: 1 },
    { field: 'AnaliseVertical', headerName: 'Análise Vertical', flex: 1 },
    { field: 'AnaliseHorizontal', headerName: 'Análise Horizontal', flex: 1 },
    { field: 'Cliente', headerName: 'Cliente', flex: 1 },
    { field: 'Usuario', headerName: 'Usuário', flex: 1 },
  ];
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors
  return (
    <div>
      <h1>DRE</h1>
      <Button variant="contained" color="primary" onClick={handleAddDre}>
        Cadastrar DRE
      </Button>
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Cadastro de DRE</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Data"
            type="date"
            fullWidth
            value={newDre.Data.toISOString().split('T')[0]}
            onChange={(e) => setNewDre({ ...newDre, Data: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            value={newDre.Descricao}
            onChange={(e) => setNewDre({ ...newDre, Descricao: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Valor"
            type="number"
            fullWidth
            value={newDre.Valor}
            onChange={(e) => setNewDre({ ...newDre, Valor: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Análise Vertical"
            type="number"
            fullWidth
            value={newDre.AnaliseVertical}
            onChange={(e) => setNewDre({ ...newDre, AnaliseVertical: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Análise Horizontal"
            type="number"
            fullWidth
            value={newDre.AnaliseHorizontal}
            onChange={(e) => setNewDre({ ...newDre, AnaliseHorizontal: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Cliente"
            type="text"
            fullWidth
            value={newDre.Cliente}
            onChange={(e) => setNewDre({ ...newDre, Cliente: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Usuário"
            type="text"
            fullWidth
            value={newDre.Usuario}
            onChange={(e) => setNewDre({ ...newDre, Usuario: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmitDre} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: 400, width: '80%' }}>
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
    </div>
  );
};

export default Dre;