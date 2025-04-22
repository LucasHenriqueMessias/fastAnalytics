import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, Box } from '@mui/material';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import axios from 'axios';
import { useTheme } from '@mui/material/styles'; // Ensure useTheme is imported
import { tokens } from '../../../theme';

interface Ferramenta {
  id: number;
  name: string;
  description: string;
  usuario: string;
}

const Ferramentas = () => {
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors
  const [ferramentasData, setFerramentasData] = useState<Ferramenta[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-upload/file/tipo/xlsx`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFerramentasData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleDownload = async (id: number) => {
    const ferramenta = ferramentasData.find((f: any) => f.id === id);
    if (ferramenta) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tab-upload/file/download/${ferramenta.id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ferramenta.name}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome da Ferramenta', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    { field: 'usuario', headerName: 'Analista Responsável', flex: 1 },
    {
      field: 'download',
      headerName: '',
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleDownload(params.row.id)}>
          Baixar
        </Button>
      ),
      width: 110
    }
  ];
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ferramentas e Serviços desenvolvidos pelos analistas aos clientes Fast
      </Typography>
      <Box display="flex" justifyContent="center" sx={{background: `${colors.white[600]}`}}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            rows={ferramentasData} 
            columns={columns} 
            autoPageSize
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
              
            }}
          />
        </div>
      </Box>
    </Container>
  );
};

export default Ferramentas;