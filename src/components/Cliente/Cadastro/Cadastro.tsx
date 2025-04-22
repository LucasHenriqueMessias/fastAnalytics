//incluir checkbox para prospecção

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
import WarningIcon from '@mui/icons-material/Warning'; // Import the WarningIcon
import SearchIcon from '@mui/icons-material/Search'; // Import the SearchIcon
import './Cadastro.css'; // Import the CSS file for styling
import { getAccessToken } from '../../LocalStorage/LocalStorage';

// Define the type for the objects in allData
type ClienteData = {
  id_icone?: string;
  razao_social: string;
  [key: string]: any; // Allow additional properties
};

const Cadastro = () => {
  const [formData, setFormData] = useState({
    uf: '',
    cep: '',
    cnpj: '',
    pais: '',
    email: '',
    porte: '',
    bairro: '',
    numero: '',
    municipio: '',
    logradouro: '',
    cnae_fiscal: '',
    complemento: '',
    razao_social: '',
    nome_fantasia: '',
    capital_social: '',
    ddd_telefone_1: '',
    ddd_telefone_2: '',
    natureza_juridica: '',
    opcao_pelo_simples: false,
    cnae_fiscal_descricao: '',
    data_situacao_cadastral: '',
    descricao_situacao_cadastral: '',
    descricao_identificador_matriz_filial: '',
    renda_bruta_inicial: '',
    renda_bruta_atual: '',
    renda_liquida_inicial: '',
    renda_liquida_atual: '',
    cnae_secundario: '',
    numero_funcionarios: '',
    valor_faturamento: '',
    valor_faturamento_inicial: '',
    ponto_apoio: '',
    perfil: '',
    area_atuacao: '',
    segmento: '',
    numero_reunioes: '',
    status: '',
    data_contratacao_fast: '',
    data_saida_fast: '',
    nome_ponte: '',
    consultor_comercial: '',
    consultor_financeiro: '',
    analista: '',
    sinal: '',
    motivo_sinal: '',
    analista_responsável_sinal: '',
    parceiro: false,
    indicacao_cliente: false,
    justificativa_parceria: '',
    status_parceria: '',
    resultados_parceria: '',
    quem_indicou: '',
    status_indicacao: '',
    id_icone: '',
  });

  const [allData, setAllData] = useState<ClienteData[]>([]); // Use the defined type for allData
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [showWarningForm, setShowWarningForm] = useState(false); // State to toggle the warning form
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/loja`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`, // Add bearer token
          },
        });
        setAllData(response.data); // Store all objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term); // Update the search term
    const foundItem = allData.find((item) => item.razao_social.toLowerCase().includes(term.toLowerCase()));
    if (foundItem) {
      const validKeys = Object.keys(formData); // Get valid keys from formData
      const filteredItem = Object.keys(foundItem)
        .filter((key) => validKeys.includes(key)) // Only include keys that exist in formData
        .reduce((obj, key) => {
          obj[key] = foundItem[key];
          return obj;
        }, {} as any);
      setFormData({ ...formData, ...filteredItem }); // Update form values

      // Fetch and display the image using id_icone
      if (foundItem.id_icone) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/tab-upload/file/${foundItem.id_icone}`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`, // Add bearer token
            },
            responseType: 'blob', // Expect a binary response
          });
          const imageUrl = URL.createObjectURL(response.data); // Create a URL for the image
          setUploadedImage(imageUrl); // Display the image in the upload square
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    } else {
      setFormData({ ...formData }); // Reset formData if no match
      setUploadedImage(null); // Clear the image if no match
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value || '', // Default to empty string
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSquareClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNew = () => {
    setFormData({
      uf: '',
      cep: '',
      cnpj: '',
      pais: '',
      email: '',
      porte: '',
      bairro: '',
      numero: '',
      municipio: '',
      logradouro: '',
      cnae_fiscal: '',
      complemento: '',
      razao_social: '',
      nome_fantasia: '',
      capital_social: '',
      ddd_telefone_1: '',
      ddd_telefone_2: '',
      natureza_juridica: '',
      opcao_pelo_simples: false,
      cnae_fiscal_descricao: '',
      data_situacao_cadastral: '',
      descricao_situacao_cadastral: '',
      descricao_identificador_matriz_filial: '',
      renda_bruta_inicial: '',
      renda_bruta_atual: '',
      renda_liquida_inicial: '',
      renda_liquida_atual: '',
      cnae_secundario: '',
      numero_funcionarios: '',
      valor_faturamento: '',
      valor_faturamento_inicial: '',
      ponto_apoio: '',
      perfil: '',
      area_atuacao: '',
      segmento: '',
      numero_reunioes: '',
      status: '',
      data_contratacao_fast: '',
      data_saida_fast: '',
      nome_ponte: '',
      consultor_comercial: '',
      consultor_financeiro: '',
      analista: '',
      sinal: '',
      motivo_sinal: '',
      analista_responsável_sinal: '',
      parceiro: false,
      indicacao_cliente: false,
      justificativa_parceria: '',
      status_parceria: '',
      resultados_parceria: '',
      quem_indicou: '',
      status_indicacao: '',
      id_icone: '',
    });
    setUploadedImage(null); // Clear the uploaded image
  };

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <div className="form-header">
        <button type="button" className="new-button" onClick={handleNew}>
          Novo
        </button>
      </div>
      <div className="search-bar">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar por Razão Social..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)} // Trigger search on every input change
        />
      </div>
      <h1 className="form-title">Cadastro de Cliente</h1>
      <div className="form-group warning-icon-container">
        <WarningIcon
          className="warning-icon"
          onClick={() => setShowWarningForm(!showWarningForm)} // Toggle the warning form
        />
      </div>
      {showWarningForm && (
        <div className="warning-form">
          <div className="form-group">
            <select
              name="sinal"
              value={formData.sinal}
              onChange={handleChange}
              className="select-input"
            >
              <option value="Sinal Verde">Sinal Verde</option>
              <option value="Sinal Amarelo">Sinal Amarelo</option>
              <option value="Sinal Vermelho">Sinal Vermelho</option>
            </select>
          </div>
          <div className="form-group">
            <input
              name="motivo_sinal"
              value={formData.motivo_sinal}
              onChange={handleChange}
              placeholder="Motivo Sinal"
            />
          </div>
          <div className="form-group">
            <input
              name="analista_responsável_sinal"
              value={formData.analista_responsável_sinal}
              onChange={handleChange}
              placeholder="Analista Responsável Sinal"
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="alert-button"
              onClick={() => alert('Alerta emitido!')}
            >
              Emitir Alerta
            </button>
          </div>
        </div>
      )}    
      <div
        className="upload-square"
        onClick={handleSquareClick}
        style={{
          width: '150px',
          height: '150px',
          border: '2px dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!uploadedImage && 'Clique para fazer upload'}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    
      <br/>
      <div className="form-row">
        <h2 className="form-row-title">Informações Básicas</h2>
        <div className="form-group">
        </div>
        <div className="form-group">
          <input name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="CNPJ" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="ponto_apoio" value={formData.ponto_apoio} onChange={handleChange} placeholder="Ponto de Apoio" />
          <input name="perfil" value={formData.perfil} onChange={handleChange} placeholder="Perfil" />
        </div>
        <div className="form-group">
          <input name="segmento" value={formData.segmento} onChange={handleChange} placeholder="Segmento" />
          <input name="area_atuacao" value={formData.area_atuacao} onChange={handleChange} placeholder="Área de Atuação" />
          <input name="porte" value={formData.porte} onChange={handleChange} placeholder="Porte" />
        </div>
        <div className="form-group">
          <input name="consultor_comercial" value={formData.consultor_comercial} onChange={handleChange} placeholder="Consultor Comercial" />
          <input name="consultor_financeiro" value={formData.consultor_financeiro} onChange={handleChange} placeholder="Consultor Financeiro" />
          <input name="analista" value={formData.analista} onChange={handleChange} placeholder="Analista" />
        </div>
      </div>

      <div className="form-row">
        <h2 className="form-row-title">Endereço</h2>
        <div className="form-group">
          <input name="pais" value={formData.pais || ''} onChange={handleChange} placeholder="País" />
          <input name="cep" value={formData.cep} onChange={handleChange} placeholder="CEP" />
          <input name="uf" value={formData.uf} onChange={handleChange} placeholder="UF" />
          <input name="municipio" value={formData.municipio} onChange={handleChange} placeholder="Município" />
        
        </div>
        <div className="form-group">
          <input name="logradouro" value={formData.logradouro} onChange={handleChange} placeholder="Logradouro" />
          <input name="numero" value={formData.numero} onChange={handleChange} placeholder="Número" />
          <input name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Bairro" />
          <input name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Complemento" />
        </div>
      </div>

      <div className="form-row">
        <h2 className="form-row-title">Dados Empresariais</h2>
        <div className="form-group">
          <input name="razao_social" value={formData.razao_social} onChange={handleChange} placeholder="Razão Social" />
          <input name="nome_fantasia" value={formData.nome_fantasia} onChange={handleChange} placeholder="Nome Fantasia" />
          <input name="natureza_juridica" value={formData.natureza_juridica} onChange={handleChange} placeholder="Natureza Jurídica" />
        </div>
        <div className="form-group">
          <input name="cnae_fiscal" value={formData.cnae_fiscal} onChange={handleChange} placeholder="CNAE Fiscal" />
          <input name="cnae_fiscal_descricao" value={formData.cnae_fiscal_descricao} onChange={handleChange} placeholder="Descrição CNAE Fiscal" />
          <input name="cnae_secundario" value={formData.cnae_secundario} onChange={handleChange} placeholder="CNAE Secundário" />
        </div>
      </div>

      <div className="form-row">
        <h2 className="form-row-title">Dados Financeiros</h2>
        <div className="form-group">
          <input name="capital_social" value={formData.capital_social} onChange={handleChange} placeholder="Capital Social" />
        </div>
        <div className="form-group">
          <input name="renda_bruta_inicial" value={formData.renda_bruta_inicial} onChange={handleChange} placeholder="Renda Bruta Inicial" />
          <input name="renda_bruta_atual" value={formData.renda_bruta_atual || ''} onChange={handleChange} placeholder="Renda Bruta Atual" />
        </div>
        <div className="form-group">
          <input name="renda_liquida_inicial" value={formData.renda_liquida_inicial} onChange={handleChange} placeholder="Renda Líquida Inicial" />
          <input name="renda_liquida_atual" value={formData.renda_liquida_atual || ''} onChange={handleChange} placeholder="Renda Líquida Atual" />
        </div>
        <div className="form-group">
          <input name="valor_faturamento" value={formData.valor_faturamento} onChange={handleChange} placeholder="Valor Faturamento" />
          <input name="valor_faturamento_inicial" value={formData.valor_faturamento_inicial} onChange={handleChange} placeholder="Valor Faturamento Inicial" />
        </div>
      </div>

      <div className="form-row">
        <h2 className="form-row-title">Contato</h2>
        <div className="form-group">
          <input name="ddd_telefone_1" value={formData.ddd_telefone_1} onChange={handleChange} placeholder="DDD Telefone 1" />
          <input name="ddd_telefone_2" value={formData.ddd_telefone_2} onChange={handleChange} placeholder="DDD Telefone 2" />
        </div>
        <div className="form-group">
        </div>
      </div>

      <div className="form-row">
        <h2 className="form-row-title">Informações Extras</h2>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="parceiro"
              checked={formData.parceiro}
              onChange={handleChange}
            />
            Parceiro
          </label>
        </div>
        {formData.parceiro && (
          <>
            <div className="form-group">
              <input
                name="justificativa_parceria"
                value={formData.justificativa_parceria}
                onChange={handleChange}
                placeholder="Justificativa Parceria"
              />
            </div>
            <div className="form-group">
              <input
                name="status_parceria"
                value={formData.status_parceria}
                onChange={handleChange}
                placeholder="Status Parceria"
              />
            </div>
            <div className="form-group informacoes-extras-buttons">
              <input
                name="resultados_parceria"
                value={formData.resultados_parceria}
                onChange={handleChange}
                placeholder="Resultados Parceria"
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="indicacao_cliente"
              checked={formData.indicacao_cliente}
              onChange={handleChange}
            />
            Indicação Cliente
          </label>
        </div>
        {formData.indicacao_cliente && (
          <>
            <div className="form-group">
              <input
                name="quem_indicou"
                value={formData.quem_indicou}
                onChange={handleChange}
                placeholder="Quem Indicou"
              />
            </div>
            <div className="form-group">
              <input
                name="status_indicacao"
                value={formData.status_indicacao}
                onChange={handleChange}
                placeholder="Status Indicação"
              />
            </div>
          </>
        )}

        
      </div>
      <div className="form-row">
        <h2 className="form-row-title">Outros</h2>
        <div className="form-group">
          <input name="numero_reunioes" value={formData.numero_reunioes} onChange={handleChange} placeholder="Número de Reuniões" />
        </div>
        <div className="form-group">
          <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
        </div>
        <div className="form-group">
          <input name="data_contratacao_fast" value={formData.data_contratacao_fast} onChange={handleChange} placeholder="Data Contratação Fast" />
        </div>
        <div className="form-group">
          <input name="data_saida_fast" value={formData.data_saida_fast} onChange={handleChange} placeholder="Data Saída Fast" />
        </div>
      </div>

     

      <div className="form-row">
        <h2 className="form-row-title">Contrato</h2>
        <div className="form-group">
          
        </div>
      </div>

      <button type="submit" className="submit-button">Cadastrar</button>
    </form>
  );
};

export default Cadastro;