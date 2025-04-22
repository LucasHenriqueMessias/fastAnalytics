import React, { useEffect, useState } from 'react';
import { getAccessToken, getUsername } from '../LocalStorage/LocalStorage';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

type HelpDeskItem = {
  id: number;
  Solicitante: string;
  Responsavel: string;
  Setor: string;
  Titulo: string;
  Descricao: string;
  Anotacao: string;
  Kanban: string;
  Data_Conclusao: string | null;
  Expectativa_Conclusao: string | null;
  Data: string;
};

const HelpDesk = () => {
  const [data, setData] = useState<HelpDeskItem[]>([]);
  const [selectedRow, setSelectedRow] = useState<HelpDeskItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAccessToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-helpdesk/responsavel/${getUsername()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'Solicitante', headerName: 'Solicitante', width: 150 },
    { field: 'Responsavel', headerName: 'Responsável', width: 150 },
    { field: 'Setor', headerName: 'Setor', width: 150 },
    { field: 'Titulo', headerName: 'Título', width: 200 },
    { field: 'Kanban', headerName: 'Kanban', width: 120 },
  ];

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row as HelpDeskItem);
  };

  return (
    <div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          autoPageSize={true}
          onRowClick={handleRowClick}
        />
      </Box>
      {selectedRow && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Detalhes</Typography>
          <Typography variant="body1">{selectedRow.Descricao}</Typography>
        </Box>
      )}
    </div>
  );
}

export default HelpDesk;