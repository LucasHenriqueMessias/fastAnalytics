import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../LocalStorage/LocalStorage';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'DAS', headerName: 'DAS', width: 150 },
    { field: 'Pis', headerName: 'Pis', width: 150 },
    { field: 'Cofins', headerName: 'Cofins', width: 150 },
    { field: 'IRPJ', headerName: 'IRPJ', width: 150 },
    { field: 'IPI', headerName: 'IPI', width: 150 },
    { field: 'ICMS', headerName: 'ICMS', width: 150 },
    { field: 'ISS', headerName: 'ISS', width: 150 },
    { field: 'previdencia', headerName: 'Previdência', width: 150 },
    { field: 'Data_Regime', headerName: 'Data Regime', width: 150 },
    { field: 'Descricao', headerName: 'Descrição', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Regime Tributário</h1>
      <DataGrid rows={rows} columns={columns} autoPageSize={true} />
    </div>
  );
};

export default RegimeTributario;