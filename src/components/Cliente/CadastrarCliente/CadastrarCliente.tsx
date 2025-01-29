import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../LocalStorage/LocalStorage';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Container, Typography } from '@mui/material';
import './CadastrarCliente.css'; // Import the CSS file for styling

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
  const [cnpj, setCnpj] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const apiUrl = process.env.REACT_APP_API_URL;

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
        handleSubmitCnaes(cnaesSecundariosComCnpj);
        handleSubmitQsa(qsaComCnpjEmpresa);
      })
      .catch((error) => {
        console.error(error);
        alert('CNPJ não encontrado. Por favor, verifique o número e tente novamente.');
      });
  };

  const handleEditData = () => {
    setEditData(data);
    setIsEditClicked(true);
  };

  const handleSaveEditData = () => {
    if (editData) {
      setData(editData);
      setEditData(null);
      setIsEditClicked(false);
    }
  };

  const handleChangeEditData = (field: string, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleCloseEditData = () => {
    setEditData(null);
    setIsEditClicked(false);
  };

  const handleSubmitData = () => {
    const token = getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Enviar dados gerais
    axios.post(`${apiUrl}/loja`, data, config)
      .then(() => console.log('Dados gerais enviados com sucesso'))
      .catch((error) => console.error('Erro ao enviar dados gerais:', error));
  };

  const handleSubmitCnaes = (cnaes: Cnae[]) => {
    const token = getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Enviar CNAEs Secundários
    axios.post(`${apiUrl}/tab-cnae-secundario`, cnaes, config)
      .then(() => console.log('CNAEs Secundários enviados com sucesso'))
      .catch((error) => console.error('Erro ao enviar CNAEs Secundários:', error));
  };

  const handleSubmitQsa = (qsa: Qsa[]) => {
    const token = getAccessToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Enviar QSA
    axios.post(`${apiUrl}/tab-socios`, qsa, config)
      .then(() => console.log('QSA enviado com sucesso'))
      .catch((error) => console.error('Erro ao enviar QSA:', error));
  };

  return (
    <Container className="cadastrar-cliente">
      <Typography variant="h4" gutterBottom>
        Cadastrar Cliente
      </Typography>
      <div className="input-group">
        <TextField
          label="Digite o CNPJ"
          variant="outlined"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleFetchData}>
          Buscar Cliente
        </Button>
      </div>
      {data ? (
        <div className="data-section">
          <Typography variant="h6">Dados Gerais</Typography>
          <pre className="data-display">{JSON.stringify(data, null, 2)}</pre>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleEditData} style={{ marginRight: '10px' }}>
              Editar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSubmitData} disabled={!isEditClicked}>
              Enviar
            </Button>
          </div>
        </div>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Dialog open={!!editData} onClose={handleCloseEditData}>
        <DialogTitle>Editar Dados Gerais</DialogTitle>
        <DialogContent>
          {editData && (
            <>
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={editData.email}
                onChange={(e) => handleChangeEditData('email', e.target.value)}
              />
              <TextField
                margin="dense"
                label="UF"
                type="text"
                fullWidth
                value={editData.uf}
                onChange={(e) => handleChangeEditData('uf', e.target.value)}
              />
              <TextField
                margin="dense"
                label="CEP"
                type="number"
                fullWidth
                value={editData.cep}
                onChange={(e) => handleChangeEditData('cep', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="CNPJ"
                type="text"
                fullWidth
                value={editData.cnpj}
                onChange={(e) => handleChangeEditData('cnpj', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Porte"
                type="text"
                fullWidth
                value={editData.porte}
                onChange={(e) => handleChangeEditData('porte', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Bairro"
                type="text"
                fullWidth
                value={editData.bairro}
                onChange={(e) => handleChangeEditData('bairro', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Número"
                type="text"
                fullWidth
                value={editData.numero}
                onChange={(e) => handleChangeEditData('numero', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Município"
                type="text"
                fullWidth
                value={editData.municipio}
                onChange={(e) => handleChangeEditData('municipio', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Logradouro"
                type="text"
                fullWidth
                value={editData.logradouro}
                onChange={(e) => handleChangeEditData('logradouro', e.target.value)}
              />
              <TextField
                margin="dense"
                label="CNAE Fiscal"
                type="number"
                fullWidth
                value={editData.cnae_fiscal}
                onChange={(e) => handleChangeEditData('cnae_fiscal', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Complemento"
                type="text"
                fullWidth
                value={editData.complemento}
                onChange={(e) => handleChangeEditData('complemento', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Razão Social"
                type="text"
                fullWidth
                value={editData.razao_social}
                onChange={(e) => handleChangeEditData('razao_social', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Nome Fantasia"
                type="text"
                fullWidth
                value={editData.nome_fantasia}
                onChange={(e) => handleChangeEditData('nome_fantasia', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Capital Social"
                type="number"
                fullWidth
                value={editData.capital_social}
                onChange={(e) => handleChangeEditData('capital_social', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="DDD Telefone 1"
                type="text"
                fullWidth
                value={editData.ddd_telefone_1}
                onChange={(e) => handleChangeEditData('ddd_telefone_1', e.target.value)}
              />
              <TextField
                margin="dense"
                label="DDD Telefone 2"
                type="text"
                fullWidth
                value={editData.ddd_telefone_2}
                onChange={(e) => handleChangeEditData('ddd_telefone_2', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Natureza Jurídica"
                type="text"
                fullWidth
                value={editData.natureza_juridica}
                onChange={(e) => handleChangeEditData('natureza_juridica', e.target.value)}
              />
              <label>Opção pelo Simples</label>
              <input
                type="checkbox"
                checked={editData.opcao_pelo_simples}
                onChange={(e) => handleChangeEditData('opcao_pelo_simples', e.target.checked)}
              />
              <TextField
                margin="dense"
                label="CNAE Fiscal Descrição"
                type="text"
                fullWidth
                value={editData.cnae_fiscal_descricao}
                onChange={(e) => handleChangeEditData('cnae_fiscal_descricao', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Data Situação Cadastral"
                type="date"
                fullWidth
                value={editData.data_situacao_cadastral}
                onChange={(e) => handleChangeEditData('data_situacao_cadastral', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Descrição Situação Cadastral"
                type="text"
                fullWidth
                value={editData.descricao_situacao_cadastral}
                onChange={(e) => handleChangeEditData('descricao_situacao_cadastral', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Descrição Identificador Matriz/Filial"
                type="text"
                fullWidth
                value={editData.descricao_identificador_matriz_filial}
                onChange={(e) => handleChangeEditData('descricao_identificador_matriz_filial', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Renda Bruta Inicial"
                type="number"
                fullWidth
                value={editData.renda_bruta_inicial}
                onChange={(e) => handleChangeEditData('renda_bruta_inicial', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Renda Bruta Atual"
                type="number"
                fullWidth
                value={editData.renda_bruta_atual}
                onChange={(e) => handleChangeEditData('renda_bruta_atual', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Renda Líquida Inicial"
                type="number"
                fullWidth
                value={editData.renda_liquida_inicial}
                onChange={(e) => handleChangeEditData('renda_liquida_inicial', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Renda Líquida Atual"
                type="number"
                fullWidth
                value={editData.renda_liquida_atual}
                onChange={(e) => handleChangeEditData('renda_liquida_atual', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Número de Funcionários"
                type="number"
                fullWidth
                value={editData.numero_funcionarios}
                onChange={(e) => handleChangeEditData('numero_funcionarios', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Valor Faturamento"
                type="number"
                fullWidth
                value={editData.valor_faturamento}
                onChange={(e) => handleChangeEditData('valor_faturamento', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Valor Faturamento Inicial"
                type="number"
                fullWidth
                value={editData.valor_faturamento_inicial}
                onChange={(e) => handleChangeEditData('valor_faturamento_inicial', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Ponto de Apoio"
                type="text"
                fullWidth
                value={editData.ponto_apoio}
                onChange={(e) => handleChangeEditData('ponto_apoio', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Perfil"
                type="text"
                fullWidth
                value={editData.perfil}
                onChange={(e) => handleChangeEditData('perfil', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Área de Atuação"
                type="text"
                fullWidth
                value={editData.area_atuacao}
                onChange={(e) => handleChangeEditData('area_atuacao', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Segmento"
                type="text"
                fullWidth
                value={editData.segmento}
                onChange={(e) => handleChangeEditData('segmento', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Número de Reuniões"
                type="number"
                fullWidth
                value={editData.numero_reunioes}
                onChange={(e) => handleChangeEditData('numero_reunioes', Number(e.target.value))}
              />
              <TextField
                margin="dense"
                label="Status"
                type="text"
                fullWidth
                value={editData.status}
                onChange={(e) => handleChangeEditData('status', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Data Contratação Fast"
                type="date"
                fullWidth
                value={editData.data_contratacao_fast}
                onChange={(e) => handleChangeEditData('data_contratacao_fast', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Data Saída Fast"
                type="date"
                fullWidth
                value={editData.data_saida_fast}
                onChange={(e) => handleChangeEditData('data_saida_fast', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Nome Ponte"
                type="text"
                fullWidth
                value={editData.nome_ponte}
                onChange={(e) => handleChangeEditData('nome_ponte', e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditData} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEditData} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CadastrarCliente;