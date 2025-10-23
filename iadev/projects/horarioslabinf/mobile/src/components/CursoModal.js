import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CursoModal = ({ visible, curso, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracaoSemestres, setDuracaoSemestres] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('CursoModal - useEffect called with curso:', curso);
    if (curso) {
      console.log('CursoModal - Setting form data from curso');
      setNome(curso.nome || '');
      setDescricao(curso.descricao || '');
      setDuracaoSemestres(String(curso.duracao_semestres || ''));
    } else {
      console.log('CursoModal - Clearing form data');
      setNome('');
      setDescricao('');
      setDuracaoSemestres('');
    }
  }, [curso, visible]);

  const handleSave = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome do curso é obrigatório');
      return;
    }

    if (!duracaoSemestres || isNaN(duracaoSemestres) || parseInt(duracaoSemestres) <= 0) {
      Alert.alert('Erro', 'Duração deve ser um número válido maior que zero');
      return;
    }

    setLoading(true);

    const cursoData = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      duracao_semestres: parseInt(duracaoSemestres)
    };

    try {
      await onSave(cursoData);
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible === true}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {curso ? 'Editar Curso' : 'Novo Curso'}
          </Text>
          <TouchableOpacity 
            onPress={handleSave} 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            disabled={loading === true}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do Curso *</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome do curso"
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite a descrição do curso"
                multiline
                numberOfLines={4}
                maxLength={500}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duração (semestres) *</Text>
              <TextInput
                style={styles.input}
                value={duracaoSemestres}
                onChangeText={setDuracaoSemestres}
                placeholder="Ex: 8"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <Text style={styles.requiredNote}>* Campos obrigatórios</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  requiredNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default CursoModal;