import axios from 'axios';
import React from 'react';
import { getAccessToken } from '../LocalStorage/LocalStorage';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

type IndicacaoConsultorCount = {
  indicacao_nome: string;
  count: string;
};

const ChartDashBoard = () => {

  const [data, setData] = React.useState<{ consultor_comercial: string, count: number }[]>([]);
  const [indicacaoData, setIndicacaoData] = React.useState<{ usuario: string, count: number }[]>([]);
  const [parceriaData, setParceriaData] = React.useState<{ usuario: string, count: number }[]>([]);
  const [bniData, setBniData] = React.useState<{ consultor_comercial: string, count: number }[]>([]);
  const [indicacaoConsultorData, setIndicacaoConsultorData] = React.useState<{ consultor_comercial: string, count: number }[]>([]);
  const [bniCountsData, setBniCountsData] = React.useState<{ label: string, count: number }[]>([]);
  const [indicacaoCountsData, setIndicacaoCountsData] = React.useState<{ label: string, count: number }[]>([]);
  const [indicacaoConsultorCountsData, setIndicacaoConsultorCountsData] = React.useState<{ label: string, count: number }[]>([]);
  const [sinalAmareloData, setSinalAmareloData] = React.useState<{ label: string, count: number }[]>([]);
  const [fileCountData, setFileCountData] = React.useState<{ label: string, count: number }[]>([]);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/count-empresas-consultor`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-indicacao-cliente/count-indicacao-usuario`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setIndicacaoData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-parceria-fast/count-parceria-usuario`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setParceriaData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/consultor-bni-true`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setBniData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/consultor-indicacao-true`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      setIndicacaoConsultorData(response.data);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/bni-counts`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      const data = response.data;
      setBniCountsData([
        { label: 'Clientes Indicados por BNI', count: data.bniTrueCount },
        { label: 'Clientes Não Indicados por BNI', count: data.bniFalseCount }
      ]);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/indicacao-counts`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      const data = response.data;
      setIndicacaoCountsData([
        {
          label: 'Consultores com Indicação', count: data.indicacaoTrueCount
        },
        {
          label: 'Consultores sem Indicação', count: data.indicacaoFalseCount
        }
      ]);
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-prospeccao/indicacao-consultor`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      const data: IndicacaoConsultorCount[] = response.data;
      setIndicacaoConsultorCountsData(data
        .filter(item => item.indicacao_nome) // Exclude items with 'Não Informado'
        .map((item: IndicacaoConsultorCount) => ({
          label: item.indicacao_nome,
          count: parseInt(item.count, 10)
        }))
      );
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-sinal-amarelo/sinal-amarelo-pendente`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      const data = response.data;
      setSinalAmareloData(data.map((item: { user: string, count: string }) => ({
        label: item.user,
        count: parseInt(item.count, 10)
      })));
    }).catch(error => {
      console.error(error);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/tab-upload/count-files`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }).then(response => {
      const data = response.data;
      setFileCountData(data.map((item: { usuario: string, count: string }) => ({
        label: item.usuario,
        count: parseInt(item.count, 10)
      })));
    }).catch(error => {
      console.error(error);
    });

  }, []);

  // console.log(data);
  // console.log(indicacaoData);
  // console.log(parceriaData);
  // console.log(bniData);
  // console.log(indicacaoCountsData)

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
      label: 'Indicação de Grupos Parceiros',
      data: parceriaData.map(item => item.count),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  const bniChartData = {
    labels: bniData.map(item => item.consultor_comercial),
    datasets: [{
      label: 'Clientes BNI Prospectados por Consultor',
      data: bniData.map(item => item.count),
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };

  const indicacaoConsultorChartData = {
    labels: indicacaoConsultorData.map(item => item.consultor_comercial),
    datasets: [{
      label: 'Clientes Indicados Prospectados por Consultor',
      data: indicacaoConsultorData.map(item => item.count),
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  };

  const bniCountsChartData = {
    labels: bniCountsData.map(item => item.label),
    datasets: [{
      label: 'BNI Counts',
      data: bniCountsData.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };

  const indicacaoCountsChartData = {
    labels: indicacaoCountsData.map(item => item.label),
    datasets: [{
      label: 'Clientes Indicados',
      data: indicacaoCountsData.map(item => item.count),
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        // ...additional colors if needed...
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        // ...additional colors if needed...
      ],
      borderWidth: 1
    }]
  };

  const indicacaoConsultorCountsChartData = {
    labels: indicacaoConsultorCountsData.map(item => item.label),
    datasets: [{
      label: 'Número de Indicações por Consultor',
      data: indicacaoConsultorCountsData.map(item => item.count),
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        // ...additional colors if needed...
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        // ...additional colors if needed...
      ],
      borderWidth: 1
    }]

  };

  const sinalAmareloChartData = {
    labels: sinalAmareloData.map(item => item.label),
    datasets: [{
      label: 'Sinal Amarelo Pendente',
      data: sinalAmareloData.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // ...additional colors if needed...
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // ...additional colors if needed...
      ],
      borderWidth: 1
    }]
  };

  const fileCountChartData = {
    labels: fileCountData.map(item => item.label),
    datasets: [{
      label: 'File Counts',
      data: fileCountData.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // ...additional colors if needed...
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // ...additional colors if needed...
      ],
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: ''
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', marginLeft: '10%' }}>
        {data.length > 0 ? <Bar data={chartData} options={options} /> : 'Loading...'}
        {indicacaoData.length > 0 ? <Bar data={indicacaoChartData} options={options} /> : 'Loading...'}
        {parceriaData.length > 0 ? <Bar data={parceriaChartData} options={options} /> : 'Loading...'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', marginLeft: '10%' }}>
        {indicacaoConsultorData.length > 0 ? <Bar data={indicacaoConsultorChartData} options={options} /> : 'Loading...'}
        {indicacaoConsultorCountsData.length > 0 ? <Bar data={indicacaoConsultorCountsChartData} options={options} /> : 'Loading...'}
        {bniData.length > 0 ? <Bar data={bniChartData} options={options} /> : 'Loading...'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '15%', marginLeft: '18%'}}>
        {bniCountsData.length > 0 ? <Pie data={bniCountsChartData} options={{ ...options, plugins: { title: { display: true, text: 'Clientes BNI' } } }} /> : 'Loading...'}
        {indicacaoCountsData.length > 0 ? <Pie data={indicacaoCountsChartData} options={{ ...options, plugins: { title: { display: true, text: 'Indicações' } } }} /> : 'Loading...'}
        {sinalAmareloData.length > 0 ? <Pie data={sinalAmareloChartData} options={{ ...options, plugins: { title: { display: true, text: 'Sinal Amarelo' } } }} /> : 'Loading...'}
        {fileCountData.length > 0 ? <Pie data={fileCountChartData} options={{ ...options, plugins: { title: { display: true, text: 'Arquivos Desenvolvidos' } } }} /> : 'Loading...'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%' }}>
      </div>
    </div>
  )
}

export default ChartDashBoard