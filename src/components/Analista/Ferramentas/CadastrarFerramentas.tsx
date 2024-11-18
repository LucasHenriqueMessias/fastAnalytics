import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';

const CadastrarFerramentas = () => {
  const [formData, setFormData] = useState({
    id: '',
    nome_ferramenta: '',
    data_criacao: '',
    data_atualizacao: '',
    usuario_criacao: '',
    diretorio: '',
    descricao: '',
    tipo: '',
    url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = getAccessToken();
      await axios.post('http://localhost:3002/ferramentas', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Ferramenta cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar ferramenta:', error);
      alert('Erro ao cadastrar ferramenta.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cadastrar Ferramenta
      </Typography>
      <form noValidate autoComplete="off">
    
        <TextField
          margin="dense"
          name="nome_ferramenta"
          label="Nome da Ferramenta"
          type="text"
          fullWidth
          value={formData.nome_ferramenta}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="usuario_criacao"
          label="Usuário de Criação"
          type="text"
          fullWidth
          value={formData.usuario_criacao}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="diretorio"
          label="Diretório"
          type="text"
          fullWidth
          value={formData.diretorio}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="descricao"
          label="Descrição"
          type="text"
          fullWidth
          value={formData.descricao}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="tipo"
          label="Tipo"
          type="text"
          fullWidth
          value={formData.tipo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="url"
          label="URL"
          type="text"
          fullWidth
          value={formData.url}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
          Cadastrar
        </Button>
      </form>
    </Container>
  );
};

export default CadastrarFerramentas;