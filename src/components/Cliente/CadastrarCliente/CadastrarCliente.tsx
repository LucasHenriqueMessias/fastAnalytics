import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface Cnae {
  code: string;
  description: string;
  cnpj?: string;
}

interface Qsa {
  ID_Socio: number;
  cnpj_empresa: string;
  pais: null;
  nome_socio: string;
  codigo_pais: null;
  faixa_etaria: string;
  cnpj_cpf_do_socio: string;
  qualificacao_socio: string;
  codigo_faixa_etaria: number;
  data_entrada_sociedade: Date;
  identificador_de_socio: number;
  cpf_representante_legal: string;
  nome_representante_legal: string;
  codigo_qualificacao_socio: number;
  qualificacao_representante_legal: string;
  codigo_qualificacao_representante_legal: number;
  disc: string;
  serdip: string;
  eneagrama: string;
  hobbies: string;
  relatorio_prospeccao: string;
  opcao_pelo_mei: boolean;
}

const CadastrarCliente = () => {
  const [data, setData] = useState<any>(null);
  const [cnaesSecundarios, setCnaesSecundarios] = useState<Cnae[]>([]);
  const [qsa, setQsa] = useState<Qsa[]>([]);
  const [cnpj, setCnpj] = useState<string>('');
  // const [newSocio, setNewSocio] = useState<Qsa>({
  //   ID_Socio: 0,
  //   cnpj_empresa: '',
  //   pais: null,
  //   nome_socio: '',
  //   codigo_pais: null,
  //   faixa_etaria: '',
  //   cnpj_cpf_do_socio: '',
  //   qualificacao_socio: '',
  //   codigo_faixa_etaria: 0,
  //   data_entrada_sociedade: new Date(),
  //   identificador_de_socio: 0,
  //   cpf_representante_legal: '',
  //   nome_representante_legal: '',
  //   codigo_qualificacao_socio: 0,
  //   qualificacao_representante_legal: '',
  //   codigo_qualificacao_representante_legal: 0,
  //   disc: '',
  //   serdip: '',
  //   eneagrama: '',
  //   hobbies: '',
  //   relatorio_prospeccao: '',
  //   opcao_pelo_mei: false,
  // });
  const [editSocio, setEditSocio] = useState<Qsa | null>(null);
  // const [newCnae, setNewCnae] = useState<Cnae>({ code: '', description: '' });

  const handleFetchData = () => {
    axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .then((response) => {
        const { cnaes_secundarios, qsa, ...rest } = response.data;
        const cnaesSecundariosComCnpj = cnaes_secundarios.map((cnae: Cnae) => ({
          ...cnae,
          cnpj
        }));
        const qsaComCnpjEmpresa = qsa.map((socio: Qsa) => ({
          ...socio,
          cnpj_empresa: cnpj,
          data_entrada_sociedade: new Date(socio.data_entrada_sociedade),
        }));
        setData(rest);
        setCnaesSecundarios(cnaesSecundariosComCnpj);
        setQsa(qsaComCnpjEmpresa);
      })
      .catch((error) => {
        console.error(error);
        alert('CNPJ não encontrado. Por favor, verifique o número e tente novamente.');
      });
  };

  const handleSubmitData = () => {
    const token = getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Enviar dados gerais
    axios.post('http://localhost:3002/loja', data, config)
      .then(() => console.log('Dados gerais enviados com sucesso'))
      .catch((error) => console.error('Erro ao enviar dados gerais:', error));

    // Enviar CNAEs Secundários
    axios.post('http://localhost:3002/tab-cnae-secundario', cnaesSecundarios, config)
      .then(() => console.log('CNAEs Secundários enviados com sucesso'))
      .catch((error) => console.error('Erro ao enviar CNAEs Secundários:', error));

    // Enviar QSA
    axios.post('http://localhost:3002/tab-socios', qsa, config)
      .then(() => console.log('QSA enviado com sucesso'))
      .catch((error) => console.error('Erro ao enviar QSA:', error));
  };

  // const handleAddSocio = () => {
  //   setQsa([...qsa, newSocio]);
  //   setNewSocio({
  //     ID_Socio: 0,
  //     cnpj_empresa: '',
  //     pais: null,
  //     nome_socio: '',
  //     codigo_pais: null,
  //     faixa_etaria: '',
  //     cnpj_cpf_do_socio: '',
  //     qualificacao_socio: '',
  //     codigo_faixa_etaria: 0,
  //     data_entrada_sociedade: new Date(),
  //     identificador_de_socio: 0,
  //     cpf_representante_legal: '',
  //     nome_representante_legal: '',
  //     codigo_qualificacao_socio: 0,
  //     qualificacao_representante_legal: '',
  //     codigo_qualificacao_representante_legal: 0,
  //     disc: '',
  //     serdip: '',
  //     eneagrama: '',
  //     hobbies: '',
  //     relatorio_prospeccao: '',
  //     opcao_pelo_mei: false,
  //   });
  // };

  // const handleAddCnae = () => {
  //   setCnaesSecundarios([...cnaesSecundarios, newCnae]);
  //   setNewCnae({ code: '', description: '' });
  // };

  const handleEditSocio = (index: number) => {
    const socio = qsa[index];
    setEditSocio({
      ...socio,
      data_entrada_sociedade: new Date(socio.data_entrada_sociedade),
    });
  };

  const handleSaveEditSocio = () => {
    if (editSocio) {
      const updatedQsa = qsa.map((socio) => (socio.ID_Socio === editSocio.ID_Socio ? editSocio : socio));
      setQsa(updatedQsa);
      setEditSocio(null);
    }
  };

  const handleChangeEditSocio = (field: string, value: string | number | boolean | null | Date) => {
    if (editSocio) {
      setEditSocio({ ...editSocio, [field]: value });
    }
  };

  const handleCloseEditSocio = () => {
    setEditSocio(null);
  };

  return (
    <div>
      <h1>Cadastrar Cliente</h1>
      <div>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
        />
        <button onClick={handleFetchData}>Buscar Cliente</button>
      </div>
      {data ? (
        <div>
          <h2>Dados Gerais</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleSubmitData}>Enviar Dados Gerais</button>
          <h2>CNAEs Secundários</h2>
          <pre>{JSON.stringify(cnaesSecundarios, null, 2)}</pre>
          <button onClick={handleSubmitData}>Enviar CNAEs Secundários</button>
          <h2>QSA</h2>
          <pre>{JSON.stringify(qsa, null, 2)}</pre>
          <button onClick={handleSubmitData}>Enviar QSA</button>
          {qsa.map((socio, index) => (
            <div key={index}>
              <button onClick={() => handleEditSocio(index)}>Editar Sócio</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Dialog open={!!editSocio} onClose={handleCloseEditSocio}>
        <DialogTitle>Editar Sócio</DialogTitle>
        <DialogContent>
          {editSocio && (
            <>
              <TextField
                margin="dense"
                label="Nome do Sócio"
                type="text"
                fullWidth
                value={editSocio.nome_socio}
                onChange={(e) => handleChangeEditSocio('nome_socio', e.target.value)}
              />
              <TextField
                margin="dense"
                label="CNPJ/CPF do Sócio"
                type="text"
                fullWidth
                value={editSocio.cnpj_cpf_do_socio}
                onChange={(e) => handleChangeEditSocio('cnpj_cpf_do_socio', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Qualificação do Sócio"
                type="text"
                fullWidth
                value={editSocio.qualificacao_socio}
                onChange={(e) => handleChangeEditSocio('qualificacao_socio', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Faixa Etária"
                type="text"
                fullWidth
                value={editSocio.faixa_etaria}
                onChange={(e) => handleChangeEditSocio('faixa_etaria', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Código Faixa Etária"
                type="number"
                fullWidth
                value={editSocio.codigo_faixa_etaria}
                onChange={(e) => handleChangeEditSocio('codigo_faixa_etaria', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Data Entrada Sociedade"
                type="date"
                fullWidth
                value={editSocio.data_entrada_sociedade.toISOString().split('T')[0]}
                onChange={(e) => handleChangeEditSocio('data_entrada_sociedade', new Date(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Identificador de Sócio"
                type="number"
                fullWidth
                value={editSocio.identificador_de_socio}
                onChange={(e) => handleChangeEditSocio('identificador_de_socio', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="CPF Representante Legal"
                type="text"
                fullWidth
                value={editSocio.cpf_representante_legal}
                onChange={(e) => handleChangeEditSocio('cpf_representante_legal', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Nome Representante Legal"
                type="text"
                fullWidth
                value={editSocio.nome_representante_legal}
                onChange={(e) => handleChangeEditSocio('nome_representante_legal', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Código Qualificação Sócio"
                type="number"
                fullWidth
                value={editSocio.codigo_qualificacao_socio}
                onChange={(e) => handleChangeEditSocio('codigo_qualificacao_socio', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Qualificação Representante Legal"
                type="text"
                fullWidth
                value={editSocio.qualificacao_representante_legal}
                onChange={(e) => handleChangeEditSocio('qualificacao_representante_legal', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Código Qualificação Representante Legal"
                type="number"
                fullWidth
                value={editSocio.codigo_qualificacao_representante_legal}
                onChange={(e) => handleChangeEditSocio('codigo_qualificacao_representante_legal', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="DISC"
                type="text"
                fullWidth
                value={editSocio.disc}
                onChange={(e) => handleChangeEditSocio('disc', e.target.value)}
              />
              <TextField
                margin="dense"
                label="SERDIP"
                type="text"
                fullWidth
                value={editSocio.serdip}
                onChange={(e) => handleChangeEditSocio('serdip', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Eneagrama"
                type="text"
                fullWidth
                value={editSocio.eneagrama}
                onChange={(e) => handleChangeEditSocio('eneagrama', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Hobbies"
                type="text"
                fullWidth
                value={editSocio.hobbies}
                onChange={(e) => handleChangeEditSocio('hobbies', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Relatório Prospecção"
                type="text"
                fullWidth
                value={editSocio.relatorio_prospeccao}
                onChange={(e) => handleChangeEditSocio('relatorio_prospeccao', e.target.value)}
              />
              <label>Opção pelo MEI</label>
              <input
                type="checkbox"
                checked={editSocio.opcao_pelo_mei}
                onChange={(e) => handleChangeEditSocio('opcao_pelo_mei', e.target.checked)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditSocio} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEditSocio} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CadastrarCliente;