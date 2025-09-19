import React, { useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import CursosModal from './components/CursosModal';
import AddCursoModal from './components/AddCursoModal';
import EditCursoModal from './components/EditCursoModal';
import CursoDetailModal from './components/CursoDetailModal';
import { cursosService } from './services/api';

export default function App() {
  const [cursosModalVisible, setCursosModalVisible] = useState(false);
  const [addCursoModalVisible, setAddCursoModalVisible] = useState(false);
  const [editCursoModalVisible, setEditCursoModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCursosPress = async () => {
    setLoading(true);
    try {
      const cursosData = await cursosService.getAll();
      setCursos(cursosData);
      setCursosModalVisible(true);
    } catch (error) {
      alert('Não foi possível carregar os cursos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCurso = () => {
    setAddCursoModalVisible(true);
  };

  const handleEditCurso = (curso) => {
    setSelectedCurso(curso);
    setEditCursoModalVisible(true);
  };

  const handleDeleteCurso = async (sigla) => {
    if (window.confirm(`Deseja realmente excluir o curso ${sigla}?`)) {
      try {
        await cursosService.delete(sigla);
        const cursosData = await cursosService.getAll();
        setCursos(cursosData);
        alert('Curso excluído com sucesso!');
      } catch (error) {
        alert('Não foi possível excluir o curso');
      }
    }
  };

  const handleRowPress = (curso) => {
    setSelectedCurso(curso);
    setDetailModalVisible(true);
  };

  const handleSaveCurso = async (novoCurso) => {
    try {
      await cursosService.create(novoCurso);
      setAddCursoModalVisible(false);
      const cursosData = await cursosService.getAll();
      setCursos(cursosData);
      alert('Curso adicionado com sucesso!');
    } catch (error) {
      alert('Não foi possível adicionar o curso');
    }
  };

  const handleUpdateCurso = async (sigla, dadosAtualizados) => {
    try {
      await cursosService.update(sigla, dadosAtualizados);
      setEditCursoModalVisible(false);
      const cursosData = await cursosService.getAll();
      setCursos(cursosData);
      alert('Curso atualizado com sucesso!');
    } catch (error) {
      alert('Não foi possível atualizar o curso');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <Menu onCursosPress={handleCursosPress} />
        <h1>App Cursos</h1>
      </header>
      
      <main className="app-content">
        <h2>Bem-vindo ao App de Cursos!</h2>
        <p>Use o menu para navegar pelas opções disponíveis.</p>
      </main>

      <CursosModal 
        visible={cursosModalVisible}
        onClose={() => setCursosModalVisible(false)}
        onAddPress={handleAddCurso}
        onEditPress={handleEditCurso}
        onDeletePress={handleDeleteCurso}
        onRowPress={handleRowPress}
        cursos={cursos}
        loading={loading}
      />
      
      <AddCursoModal
        visible={addCursoModalVisible}
        onClose={() => setAddCursoModalVisible(false)}
        onSave={handleSaveCurso}
      />
      
      <EditCursoModal
        visible={editCursoModalVisible}
        onClose={() => setEditCursoModalVisible(false)}
        onSave={handleUpdateCurso}
        curso={selectedCurso}
      />
      
      <CursoDetailModal
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        curso={selectedCurso}
      />
    </div>
  );
}