import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { getAccessToken } from '../LocalStorage/LocalStorage'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { tokens } from '../../theme'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const Eventos = () => {
  const [eventos, setEventos] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [newEvento, setNewEvento] = useState({
    nome_evento: '',
    descricao: '',
    local: '',
    data_evento: null,
    usuario: '',
    status: ''
  })

  useEffect(() => {
    const token = getAccessToken()
    axios.get(`${process.env.REACT_APP_API_URL}/tab-evento`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setEventos(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar eventos:', error)
      })
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvento({ ...newEvento, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date: any) => {
    setNewEvento({ ...newEvento, data_evento: date })
  }

  const handleSubmit = () => {
    const token = getAccessToken()
    axios.post(`${process.env.REACT_APP_API_URL}/tab-evento`, newEvento, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setEventos([...eventos, response.data])
        handleClose()
      })
      .catch(error => {
        console.error('Erro ao adicionar evento:', error)
      })
  }

  const columns = [
    { field: 'nome_evento', headerName: 'Nome do Evento', width: 200 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'local', headerName: 'Local', width: 200 },
    { field: 'data_evento', headerName: 'Data do Evento', width: 200 },
    { field: 'usuario', headerName: 'Usuário Responsável', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'data_criacao', headerName: 'Data de Criação', width: 200 },
  ]

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agenda de Eventos
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar Novo Evento
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Evento</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="nome_evento" label="Nome do Evento" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="descricao" label="Descrição" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="local" label="Local" fullWidth onChange={handleChange} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data do Evento"
              value={newEvento.data_evento}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <TextField margin="dense" name="usuario" label="Usuário Responsável" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="status" label="Status" fullWidth onChange={handleChange} />
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
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <div style={{ height: 400, width: '80%', marginTop: 20 }}>
          <DataGrid rows={eventos} columns={columns} autoPageSize
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: colors.lightBlue[900],
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: colors.white[500],
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: colors.lightBlue[900],
              }
            }}
          />
        </div>
      </Box>
    </Container>
  )
}

export default Eventos