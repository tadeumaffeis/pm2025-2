import React, { useState } from 'react';
import './AddCursoModal.css';

const AddCursoModal = ({ visible, onClose, onSave }) => {
  const [sigla, setSigla] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    if (!sigla.trim() || !nome.trim() || !email.trim()) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    onSave({ sigla: sigla.trim(), nome: nome.trim(), email: email.trim() });
    setSigla('');
    setNome('');
    setEmail('');
  };

  const handleClose = () => {
    setSigla('');
    setNome('');
    setEmail('');
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Adicionar Curso</h2>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>
        
        <div className="form">
          <label className="label">Sigla:</label>
          <input
            type="text"
            className="input"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
            placeholder="Ex: ADS"
            maxLength={10}
          />
          
          <label className="label">Nome:</label>
          <input
            type="text"
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Análise e Desenvolvimento de Sistemas"
            maxLength={100}
          />
          
          <label className="label">Email:</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: ads@exemplo.com"
            maxLength={50}
          />
          
          <button className="save-button" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCursoModal;