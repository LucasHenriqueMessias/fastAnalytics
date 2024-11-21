import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

interface RoiData {
  id: number;
  cnpj: string;
  usuario: string;
  data_criacao: string;
  maquina_cartao: number;
  emprestimos_financiamentos: number;
  telefonia: number;
  contabilidade: number;
  taxas_bancarias: number;
  taxas_administrativas: number;
  investimentos: number;
  juridico: number;
  mensalidade_roi: number;
  ferias: number;
  aumento_equipe: number;
}

const Roi = () => {
  const [roiData, setRoiData] = useState<RoiData[]>([]);
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
  const [filteredData, setFilteredData] = useState<RoiData[]>([]);

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

  useEffect(() => {
    setFilteredData(roiData);
  }, [roiData]);

  const fetchData = async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get('http://localhost:3002/tab-roi', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRoiData(response.data);
      console.log(response)
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

  const handleFilterModelChange = (model: GridFilterModel) => {
    const filteredRows = roiData.filter((row) => {
      return model.items.every((item) => {
        if (!item.value) return true;
        const columnField = item.field as keyof RoiData;
        return row[columnField]?.toString().includes(item.value.toString());
      });
    });
    setFilteredData(filteredRows);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const createBarChartData = (label: string, dataKey: keyof RoiData) => {
    const colorMap: { [key: string]: string } = {
      'Máquina de Cartão': 'rgba(75, 192, 192, 0.6)',
      'Empréstimos/Financiamentos': 'rgba(54, 162, 235, 0.6)',
      'Telefonia': 'rgba(255, 206, 86, 0.6)',
      'Contabilidade': 'rgba(153, 102, 255, 0.6)',
      'Taxas Bancárias': 'rgba(255, 159, 64, 0.6)',
      'Taxas Administrativas': 'rgba(255, 99, 132, 0.6)',
      'Investimentos': 'rgba(75, 192, 192, 0.6)',
      'Jurídico': 'rgba(54, 162, 235, 0.6)',
      'Mensalidade ROI': 'rgba(255, 206, 86, 0.6)',
      'Férias': 'rgba(153, 102, 255, 0.6)',
      'Aumento de Equipe': 'rgba(255, 159, 64, 0.6)',
    };
  
    const borderColorMap: { [key: string]: string } = {
      'Máquina de Cartão': 'rgba(75, 192, 192, 1)',
      'Empréstimos/Financiamentos': 'rgba(54, 162, 235, 1)',
      'Telefonia': 'rgba(255, 206, 86, 1)',
      'Contabilidade': 'rgba(153, 102, 255, 1)',
      'Taxas Bancárias': 'rgba(255, 159, 64, 1)',
      'Taxas Administrativas': 'rgba(255, 99, 132, 1)',
      'Investimentos': 'rgba(75, 192, 192, 1)',
      'Jurídico': 'rgba(54, 162, 235, 1)',
      'Mensalidade ROI': 'rgba(255, 206, 86, 1)',
      'Férias': 'rgba(153, 102, 255, 1)',
      'Aumento de Equipe': 'rgba(255, 159, 64, 1)',
    };
  
    return {
      labels: filteredData.map((data) => formatDate(data.data_criacao)),
      datasets: [
        {
          label,
          data: filteredData.map((data) => data[dataKey]),
          backgroundColor: colorMap[label],
          borderColor: borderColorMap[label],
          borderWidth: 1,
        },
      ],
    };
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: '' },
    },
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
        <DataGrid
          rows={roiData}
          columns={columns}
          autoPageSize
          onFilterModelChange={handleFilterModelChange}
        />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Bar data={createBarChartData('Máquina de Cartão', 'maquina_cartao')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Máquina de Cartão por Data de Criação' } } }} />
        <Bar data={createBarChartData('Empréstimos/Financiamentos', 'emprestimos_financiamentos')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Empréstimos/Financiamentos por Data de Criação' } } }} />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Bar data={createBarChartData('Telefonia', 'telefonia')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Telefonia por Data de Criação' } } }} />
        <Bar data={createBarChartData('Contabilidade', 'contabilidade')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Contabilidade por Data de Criação' } } }} />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Bar data={createBarChartData('Taxas Bancárias', 'taxas_bancarias')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Taxas Bancárias por Data de Criação' } } }} />
        <Bar data={createBarChartData('Taxas Administrativas', 'taxas_administrativas')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Taxas Administrativas por Data de Criação' } } }} />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Bar data={createBarChartData('Aumento de Equipe', 'aumento_equipe')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Aumento de Equipe por Data de Criação' } } }} />
        <Bar data={createBarChartData('Férias', 'ferias')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Férias por Data de Criação' } } }} />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Bar data={createBarChartData('Investimentos', 'investimentos')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Investimentos por Data de Criação' } } }} />
        <Bar data={createBarChartData('Jurídico', 'juridico')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Jurídico por Data de Criação' } } }} />
      </div>
      <div style={{ height: 400, width: '50%', marginTop: 20 }}>
        <Bar data={createBarChartData('Mensalidade ROI', 'mensalidade_roi')} options={{ ...options, plugins: { ...options.plugins, title: { display: true, text: 'Mensalidade ROI por Data de Criação' } } }} />
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