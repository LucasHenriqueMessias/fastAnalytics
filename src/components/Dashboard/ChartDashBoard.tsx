import axios from 'axios';
import React from 'react';
import { getAccessToken } from '../LocalStorage/LocalStorage';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartDashBoard = () => {

  const [data, setData] = React.useState<{ consultor_comercial: string, count: number }[]>([]);
  const [indicacaoData, setIndicacaoData] = React.useState<{ usuario: string, count: number }[]>([]);
  const [parceriaData, setParceriaData] = React.useState<{ usuario: string, count: number }[]>([]);

  React.useEffect(() => {
    axios.get('http://localhost:3002/tab-prospeccao/count-empresas-consultor', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get('http://localhost:3002/tab-indicacao-cliente/count-indicacao-usuario', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setIndicacaoData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get('http://localhost:3002/tab-parceria-fast/count-parceria-usuario', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setParceriaData(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  console.log(data);
  console.log(indicacaoData);
  console.log(parceriaData);

  const chartData = {
    labels: data.map(item => item.consultor_comercial),
    datasets: [{
      label: 'Empresas Prospectadas',
      data: data.map(item => item.count),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const indicacaoChartData = {
    labels: indicacaoData.map(item => item.usuario),
    datasets: [{
      label: 'Indicações de Clientes',
      data: indicacaoData.map(item => item.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const parceriaChartData = {
    labels: parceriaData.map(item => item.usuario),
    datasets: [{
      label: 'Parcerias Fast',
      data: parceriaData.map(item => item.count),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%' }}>
          {data.length > 0 ? <Bar data={chartData} options={options} /> : 'Loading...'}
          {indicacaoData.length > 0 ? <Bar data={indicacaoChartData} options={options} /> : 'Loading...'}
          {parceriaData.length > 0 ? <Bar data={parceriaChartData} options={options} /> : 'Loading...'}
      </div>
    </div>
  )
}

export default ChartDashBoard