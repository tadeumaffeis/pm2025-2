import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { cursoService } from '../services/cursoService';

const CursoScreen = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    console.log('CursoScreen - loadCursos called');
    try {
      const response = await cursoService.getCursos();
      console.log('CursoScreen - API response:', response.data);
      setCursos(response.data.data || []);
    } catch (error) {
      console.log('CursoScreen - Error:', error);
      Alert.alert('Erro', 'Não foi possível carregar os cursos');
    } finally {
      setLoading(false);
    }
  };

  const renderCursoItem = ({ item }) => {
    console.log('CursoScreen - Rendering item:', item);
    return (
      <View style={styles.cursoItem}>
        <Text style={styles.cursoNome}>{item.nome}</Text>
        <Text style={styles.cursoDescricao}>{item.descricao}</Text>
        <Text style={styles.cursoDuracao}>Duração: {item.duracao_semestres} semestres</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Carregando cursos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cursos}
        renderItem={renderCursoItem}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum curso encontrado</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  cursoItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  cursoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cursoDescricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cursoDuracao: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default CursoScreen;