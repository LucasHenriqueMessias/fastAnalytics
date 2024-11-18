/*
Autor: Lucas Henrique Messias Gonçalves
Data de Criação: 21/10/2024
Última Modificação: 21/10/2024
Descrição: Este arquivo contém o componente PrivateRoute, que é utilizado para proteger as rotas de acesso.
Caso o usuário não esteja autenticado, ele é redirecionado para a página de login.

*/

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../LocalStorage/LocalStorage';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = getAccessToken();
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;