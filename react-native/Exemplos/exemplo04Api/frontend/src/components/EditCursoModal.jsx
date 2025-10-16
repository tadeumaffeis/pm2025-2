import React, { useState, useEffect } from 'react';
import './EditCursoModal.css';

const EditCursoModal = ({ visible, onClose, onSave, curso }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (curso) {
      setNome(curso.nome || '');
      setEmail(curso.email || '');
    }
  }, [curso]);

  const handleSave = () => {
    if (!nome.trim() || !email.trim()) {
      alert('Nome e email são obrigatórios');
      return;
    }

    onSave(curso.sigla, { nome: nome.trim(), email: email.trim() });
  };

  const handleClose = () => {
    setNome('');
    setEmail('');
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Curso</h2>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>
        
        <div className="form">
          <label className="label">Sigla:</label>
          <div className="sigla-text">{curso?.sigla}</div>
          
          <label className="label">Nome:</label>
          <input
            type="text"
            className="input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do curso"
            maxLength={100}
          />
          
          <label className="label">Email:</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email do curso"
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

export default EditCursoModal;