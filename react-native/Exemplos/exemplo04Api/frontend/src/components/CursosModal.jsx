import React from 'react';
import './CursosModal.css';

const CursosModal = ({ visible, onClose, onAddPress, onEditPress, onDeletePress, onRowPress, cursos = [], loading = false }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cursos</h2>
          <div className="header-buttons">
            <button className="add-button" onClick={onAddPress}>
              +
            </button>
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="cursos-table">
            <thead>
              <tr>
                <th>Sigla</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="loading-cell">
                    <div className="loading-spinner" />
                    Carregando cursos...
                  </td>
                </tr>
              ) : cursos.length > 0 ? (
                cursos.map((curso, index) => (
                  <tr key={index} className="clickable-row" onClick={() => onRowPress(curso)}>
                    <td className="ellipsis">{curso.sigla}</td>
                    <td className="ellipsis">{curso.nome}</td>
                    <td className="ellipsis">{curso.email}</td>
                    <td className="action-cell">
                      <button 
                        className="edit-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditPress(curso);
                        }}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePress(curso.sigla);
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-cell">
                    Nenhum curso encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CursosModal;