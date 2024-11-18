/*
Autor: Lucas Henrique Messias Gonçalves
Data de Criação: 21/10/2024
Última Modificação: 21/10/2024
Descrição: Quando selecionado a opção "Sair", o usuário é desconectado e redirecionado para a página de login. 

*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '../LocalStorage/LocalStorage';

const LogOut: React.FC = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        removeAccessToken();
        alert('Você foi desconectado.');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="logout-container">
            <h2>Logout</h2>
            <button onClick={handleLogOut}>Sair</button>
        </div>
    );
};

export default LogOut;