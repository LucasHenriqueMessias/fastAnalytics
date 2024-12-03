import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../LocalStorage/LocalStorage';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';

const RegimeTributario = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    };

    axios.get('http://localhost:3002/tab-regime-tributario', config)
      .then((response) => {
        const data = response.data.map((item: any, index: number) => ({
          id: item.id,
          DAS: item.DAS,
          Pis: item.Pis,
          Cofins: item.Cofins,
          IRPJ: item.IRPJ,
          IPI: item.IPI,
          ICMS: item.ICMS,
          ISS: item.ISS,
          previdencia: item.previdencia,
          Data_Regime: new Date(item.Data_Regime).toLocaleDateString(),
          Descricao: item.Descricao,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'DAS', headerName: 'DAS', flex: 1 },
    { field: 'Pis', headerName: 'Pis', flex: 1 },
    { field: 'Cofins', headerName: 'Cofins', flex: 1 },
    { field: 'IRPJ', headerName: 'IRPJ', flex: 1 },
    { field: 'IPI', headerName: 'IPI', flex: 1 },
    { field: 'ICMS', headerName: 'ICMS', flex: 1 },
    { field: 'ISS', headerName: 'ISS', flex: 1 },
    { field: 'previdencia', headerName: 'Previdência', flex: 1 },
    { field: 'Data_Regime', headerName: 'Data Regime', flex: 1 },
    { field: 'Descricao', headerName: 'Descrição', flex: 2 },
  ];
  const theme = useTheme(); //define o tema que será utilizado
  const colors = tokens(theme.palette.mode); // inclui o padrão de cores adotado em theme.palette.mode para colors

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Regime Tributário</h1>
      <button style={{ marginBottom: '16px' }}>Novo Regime</button> {/* Add button with margin */}
      <DataGrid rows={rows} columns={columns} autoPageSize={true} 
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
  );
};

export default RegimeTributario;