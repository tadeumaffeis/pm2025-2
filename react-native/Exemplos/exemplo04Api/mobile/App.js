import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import Menu from './src/components/Menu';
import CursosModal from './src/components/CursosModal';
import AddCursoModal from './src/components/AddCursoModal';
import EditCursoModal from './src/components/EditCursoModal';
import CursoDetailModal from './src/components/CursoDetailModal';
import { cursosService } from './src/services/api';

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
      Alert.alert('Erro', 'Não foi possível carregar os cursos');
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

  const handleSaveCurso = async (novoCurso) => {
    try {
      await cursosService.create(novoCurso);
      setAddCursoModalVisible(false);
      // Recarregar lista de cursos
      const cursosData = await cursosService.getAll();
      setCursos(cursosData);
      Alert.alert('Sucesso', 'Curso adicionado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o curso');
    }
  };

  const handleDeleteCurso = async (sigla) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o curso ${sigla}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await cursosService.delete(sigla);
              // Recarregar lista de cursos
              const cursosData = await cursosService.getAll();
              setCursos(cursosData);
              Alert.alert('Sucesso', 'Curso excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o curso');
            }
          }
        }
      ]
    );
  };

  const handleRowPress = (curso) => {
    setSelectedCurso(curso);
    setDetailModalVisible(true);
  };

  const handleUpdateCurso = async (sigla, dadosAtualizados) => {
    try {
      await cursosService.update(sigla, dadosAtualizados);
      setEditCursoModalVisible(false);
      // Recarregar lista de cursos
      const cursosData = await cursosService.getAll();
      setCursos(cursosData);
      Alert.alert('Sucesso', 'Curso atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o curso');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Menu onCursosPress={handleCursosPress} />
        <Text style={styles.title}>App Cursos</Text>
      </View>
      <View style={styles.content}>
        <Text>Bem-vindo ao App de Cursos!</Text>
      </View>
      
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
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});