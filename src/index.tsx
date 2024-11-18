/*
Autor: Lucas Henrique Messias Gonçalves
Data de Criação: 21/10/2024
Descrição: Este arquivo contém o componente principal da aplicação, que é responsável por renderizar a aplicação no navegador.
e os caminhos que a aplicação pode seguir.


Última Modificação: 23/10/2024
O que foi modificado: Adicionado o componente Navbar, removido o import de App
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dre from './components/Cliente/Dre/Dre';
import Navbar from './components/Navbar/Navbar';
import CadastrarCliente from './components/Cliente/CadastrarCliente/CadastrarCliente';
import ClientesFast from './components/Cliente/ClientesFast/ClientesFast';
import RegimeTributario from './components/RegimeTributario/RegimeTributario';
import FotografiaCliente from './components/Cliente/Fotografia/FotografiaCliente';
import DoresCliente from './components/Cliente/Dores/DoresCliente';
import Socios from './components/Cliente/Socios/Socios';
import SucessoCliente from './components/Cliente/SucessoCliente/SucessoCliente';
import SinalAmarelo from './components/Analista/SinalAmarelo/SinalAmarelo';
import Ferramentas from './components/Analista/Ferramentas/Ferramentas';
import CadastrarFerramentas from './components/Analista/Ferramentas/CadastrarFerramentas';
import Prospeccao from './components/Comercial/Prospeccao/Prospeccao';
import Reuniao from './components/Calendário/Reuniao/Reuniao';
import Roi from './components/Financeiro/ROI/Roi';
import Indicacao from './components/Financeiro/Indicacao/Indicacao';
import Parceria from './components/Financeiro/Parceria/Parceria';
import ChartDashBoard from './components/Dashboard/ChartDashBoard';
import Biblioteca from './components/Biblioteca/Biblioteca';
import Contrato from './components/Contratos/Contratos';

import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {Theme} from '@mui/material/styles'; 

const AppWrapper = () => {
  const [theme, colorMode] = useMode() as [Theme, { toggleColorMode: () => "light" }];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={
                <PrivateRoute>
                  <ChartDashBoard />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/dre" element={
                <PrivateRoute>
                  <Dre />
                </PrivateRoute>
              } />
              <Route path="/cadastro-cliente" element={
                <PrivateRoute>
                  <CadastrarCliente />
                </PrivateRoute>
              } />
              <Route path="/clientes" element={
                <PrivateRoute>
                  <ClientesFast />
                </PrivateRoute>
              } />
              <Route path="regime-tributario" element={
                <PrivateRoute>
                  <RegimeTributario />
                </PrivateRoute>
              } />
              <Route path="fotografia-cliente" element={
                <PrivateRoute>
                  <FotografiaCliente />
                </PrivateRoute>
              } />
              <Route path="/dores-cliente" element={
                <PrivateRoute>
                  <DoresCliente />
                </PrivateRoute>
              } />
              <Route path="/socios" element={
                <PrivateRoute>
                  <Socios />
                </PrivateRoute>
              } />
              <Route path="/sucesso-cliente" element={
                <PrivateRoute>
                  <SucessoCliente />
                </PrivateRoute>
              } />
              <Route path="/sinal-amarelo" element={
                <PrivateRoute>
                  <SinalAmarelo />
                </PrivateRoute>
              } />
              <Route path="/ferramentas" element={
                <PrivateRoute>
                  <Ferramentas />
                </PrivateRoute>
              } />
              <Route path="/cadastrar-ferramentas" element={
                <PrivateRoute>
                  <CadastrarFerramentas />
                </PrivateRoute>
              } />
              <Route path="/Prospeccao" element={
                <PrivateRoute>
                  <Prospeccao />
                </PrivateRoute>
              } />
              <Route path="/reuniao" element={
                <PrivateRoute>
                  <Reuniao />
                </PrivateRoute>
              } />
              <Route path="/roi" element={
                <PrivateRoute>
                  <Roi />
                </PrivateRoute>
              } />
              <Route path="/indicacao" element={
                <PrivateRoute>
                  <Indicacao />
                </PrivateRoute>
              } />
              <Route path="/parceria" element={
                <PrivateRoute>
                  <Parceria />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <ChartDashBoard />
                </PrivateRoute>
              } />
              <Route path="/biblioteca" element={
                <PrivateRoute>
                  <Biblioteca />
                </PrivateRoute>
              } />
              <Route path="/contrato" element={
                <PrivateRoute>
                  <Contrato />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </React.StrictMode>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<AppWrapper />);

reportWebVitals();