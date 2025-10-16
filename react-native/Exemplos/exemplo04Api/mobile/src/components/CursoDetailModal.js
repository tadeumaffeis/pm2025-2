import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CursoDetailModal = ({ visible, onClose, curso }) => {
  if (!curso) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Detalhes do Curso</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.label}>Sigla:</Text>
              <Text style={styles.value}>{curso.sigla}</Text>
            </View>
            
            <View style={styles.field}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{curso.nome}</Text>
            </View>
            
            <View style={styles.field}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{curso.email}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    gap: 15,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
});

export default CursoDetailModal;