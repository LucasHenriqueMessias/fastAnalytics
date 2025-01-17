import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { getAccessToken, getUsername } from '../LocalStorage/LocalStorage';

const CadastrarLivro = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tipoArquivo: 'Livro',
    usuario: '',
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const usuario = getUsername() || '';
    setFormData((prevData) => ({ ...prevData, usuario }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = getAccessToken();
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tipoArquivo', formData.tipoArquivo);
      formDataToSend.append('usuario', formData.usuario);
      if (file) {
        formDataToSend.append('file', file);
      }

      await axios.post('http://localhost:3002/tab-upload/file', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Livro cadastrado com sucesso!');
      onClose();
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro.');
    }
  };

  return (
    <Container>
      
      <form noValidate autoComplete="off">
        <label htmlFor="upload-file">
          <Button variant="contained" color="primary" component="span" style={{ marginTop: 20 }}>
            Selecionar o livro (Somente PDF)
          </Button>
        </label>
        <TextField
          margin="dense"
          name="name"
          label="Nome do Livro"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Descrição"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <input
          accept=".pdf"
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
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

export default CadastrarLivro;