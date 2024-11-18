import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Button, Container,  Typography } from '@mui/material';

const ClientesFast = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.get('http://localhost:3002/loja', config);
        const data = response.data.map((item: any, index: number) => ({
          id: index + 1,
          id_loja: item.id_loja,
          uf: item.uf,
          cep: item.cep,
          cnpj: item.cnpj,
          bairro: item.bairro,
          numero: item.numero,
          municipio: item.municipio,
          logradouro: item.logradouro,
          cnae_fiscal: item.cnae_fiscal,
          razao_social: item.razao_social,
          nome_fantasia: item.nome_fantasia,
          capital_social: item.capital_social,
          ddd_telefone_1: item.ddd_telefone_1,
          natureza_juridica: item.natureza_juridica,
          situacao_cadastral: item.situacao_cadastral,
          data_inicio_atividade: item.data_inicio_atividade,
          descricao_situacao_cadastral: item.descricao_situacao_cadastral,
        }));
        setRows(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    
    { field: 'razao_social', headerName: 'Razão Social', width: 300 },
    { field: 'uf', headerName: 'UF', flex: 1 },
    { field: 'municipio', headerName: 'Município', width: 100 },
    { field: 'cnae_fiscal', headerName: 'CNAE Fiscal', width: 100 },
    { field: 'cnpj', headerName: 'CNPJ', width: 140 },
    { field: 'cep', headerName: 'CEP', flex: 1 },
    { field: 'bairro', headerName: 'Bairro', flex: 1 },
    { field: 'numero', headerName: 'Número', flex: 1 },
    { field: 'logradouro', headerName: 'Logradouro', flex: 1 },
    { field: 'nome_fantasia', headerName: 'Nome Fantasia', flex: 1 },
    { field: 'capital_social', headerName: 'Capital Social', flex: 1 },
    { field: 'ddd_telefone_1', headerName: 'Telefone', flex: 1 },
    { field: 'natureza_juridica', headerName: 'Natureza Jurídica', flex: 1 },
    { field: 'situacao_cadastral', headerName: 'Situação Cadastral', flex: 1 },
    { field: 'data_inicio_atividade', headerName: 'Data Início Atividade', flex: 1 },
    { field: 'descricao_situacao_cadastral', headerName: 'Descrição Situação Cadastral', flex: 1 },
  ];


  return (
    <Container>
    <Typography variant="h4" gutterBottom>
      Clientes Fast Assessoria
    </Typography>
    <Button variant="contained" color="primary">
      Adicionar Novo Cliente
    </Button>
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </div>
    </Container> 
  );
};

export default ClientesFast;