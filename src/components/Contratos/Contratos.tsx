import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Button, useTheme } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../LocalStorage/LocalStorage';
import { tokens } from '../../theme';

 

interface Contratos {
  id: number;
  name: string;
  description: string;
  usuario: string;
}

const Contrato = () => {
  const [ContratoData, setContratoData] = useState<Contratos[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-upload/file/tipo/Contrato`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setContratoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleDownload = async (id: number) => {
    const Contratos = ContratoData.find((f: any) => f.id === id);
    if (Contratos) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tab-upload/file/download/${Contratos.id}`, {
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
      a.download = `${Contratos.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome da Empresa', flex: 1 },
    { field: 'description', headerName: 'Descrição do Contrato', flex: 1 },
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
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contrato De Serviços Prestados à Clientes Fast Assessoria
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={ContratoData} columns={columns} autoPageSize 
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
    </Container>
  );
};

export default Contrato;