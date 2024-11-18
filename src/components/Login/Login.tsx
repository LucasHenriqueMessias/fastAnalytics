/*
Autor: Lucas Henrique Messias Gonçalves
Data de Criação: 21/10/2024
Última Modificação: 21/10/2024
Descrição: Tela de Login. O usuário deve preencher os campos de usuário e senha para fazer login.
Apó preencher, a informação é enviada para o servidor através do métodos axios.post, que verifica se as credenciais estão corretas.
Caso esteja correto, o servidor devolve um token de acesso, que é salvo no LocalStorage e redireciona o usuário para a página Home.


Melhorias Futuras: inclua um popup de Declaração de ciência a acessibilidade dos dados e segurança de usuário de acordo com a lei geral de proteção de dados do Brasil
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setUsername } from '../LocalStorage/LocalStorage';
import background from '../../assets/login4.jpg';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        // Hide the navbar when the login component is mounted
        const navbar = document.querySelector('.navbar') as HTMLElement;
        if (navbar) {
            navbar.style.display = 'none';
        }
        // Show the navbar when the login component is unmounted
        return () => {
            if (navbar) {
                navbar.style.display = 'block';
            }
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
        } else {
            setUsername(user);
            try {
                const response = await axios.post('http://localhost:3002/auth/login', {
                    user,
                    password
                });
                const { access_token } = response.data;
                
                setAccessToken(access_token);
                alert('Login bem-sucedido!');
                navigate('/home'); // Redirect to home page
            } catch (error) {
                console.error(error);
                if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
                    alert('Erro de conexão. Por favor, tente novamente.');
                } else {
                    alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
                }
            }
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${background})`, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: '150%', backgroundPosition: 'center'}}>
            <div style={{ width: '300px', height: '300px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '15px' }}>
                
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '15px' }}>
                    <img src="https://www.fastassessoria.com.br/img/logo.png" style={{width: '98%'}} alt='logotipo fast assessoria'/>
                    <label htmlFor="user" style={{color: 'black'}}>Nome de Usuário:</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <label htmlFor="password" style={{color: 'black'}}>Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <button type="submit" style={{borderRadius: '15px'}}>Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;