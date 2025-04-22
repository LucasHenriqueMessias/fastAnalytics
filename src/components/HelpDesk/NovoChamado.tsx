import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { getAccessToken, getUsername } from '../LocalStorage/LocalStorage';

const NovoChamado = () => {
  const [formData, setFormData] = useState({
    Solicitante: '',
    Responsavel: '',
    Setor: '',
    Titulo: '',
    Descricao: '',
    Anotacao: '',
    Kanban: 'Backlog',
    Data: new Date().toISOString().split('T')[0]
  });

  const [responsaveis, setResponsaveis] = useState<string[]>([]);
  const [setores] = useState<string[]>(['developer', 'Analista', 'Financeiro', 'Comercial']);
  const [isResponsavelDisabled, setIsResponsavelDisabled] = useState(true);

  useEffect(() => {
    const usuario = getUsername() || '';
    setFormData((prevData) => ({ ...prevData, Solicitante: usuario }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'Setor') {
      setIsResponsavelDisabled(true);
      setResponsaveis([]);
      fetchResponsaveis(value);
    }
  };

  const fetchResponsaveis = async (setor: string) => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/department/${setor}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const users = response.data.map((user: { user: string }) => user.user);
      setResponsaveis(users);
      setIsResponsavelDisabled(false);
    } catch (error) {
      console.error('Erro ao buscar responsáveis:', error);
      alert('Erro ao buscar responsáveis.');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = getAccessToken();
      await axios.post(`${process.env.REACT_APP_API_URL}/tab-helpdesk`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Chamado cadastrado com sucesso!');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Erro ao cadastrar chamado:', error);
      alert('Erro ao cadastrar chamado.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Criar novo Chamado
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          margin="dense"
          name="Setor"
          label="Setor"
          select
          fullWidth
          value={formData.Setor}
          onChange={handleChange}
        >
          {setores.map((setor) => (
            <MenuItem key={setor} value={setor}>
              {setor}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="Responsavel"
          label="Responsável"
          select
          fullWidth
          value={formData.Responsavel}
          onChange={handleChange}
          disabled={isResponsavelDisabled}
        >
          {responsaveis.map((responsavel) => (
            <MenuItem key={responsavel} value={responsavel}>
              {responsavel}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="Titulo"
          label="Título do Chamado"
          type="text"
          fullWidth
          value={formData.Titulo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="Descricao"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={15} // Increase the number of rows to increase the height
          value={formData.Descricao}
          onChange={handleChange}
        />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default NovoChamado;

