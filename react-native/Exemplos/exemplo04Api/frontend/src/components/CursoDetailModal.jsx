import React from 'react';
import './CursoDetailModal.css';

const CursoDetailModal = ({ visible, onClose, curso }) => {
  if (!visible || !curso) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Curso</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="content">
          <div className="field">
            <label className="label">Sigla:</label>
            <div className="value">{curso.sigla}</div>
          </div>
          
          <div className="field">
            <label className="label">Nome:</label>
            <div className="value">{curso.nome}</div>
          </div>
          
          <div className="field">
            <label className="label">Email:</label>
            <div className="value">{curso.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoDetailModal;