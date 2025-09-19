import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const CursosModal = ({ visible, onClose, onAddPress, onEditPress, onDeletePress, onRowPress, cursos = [], loading = false }) => {
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
            <Text style={styles.title}>Cursos</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Sigla</Text>
            <Text style={styles.columnHeader}>Nome</Text>
            <Text style={styles.columnHeader}>Email</Text>
            <Text style={styles.columnHeader}>Ação</Text>
          </View>
          
          <ScrollView style={styles.tableBody}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando cursos...</Text>
              </View>
            ) : cursos.length > 0 ? (
              cursos.map((curso, index) => (
                <TouchableOpacity key={index} style={styles.tableRow} onPress={() => onRowPress(curso)}>
                  <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{curso.sigla}</Text>
                  <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{curso.nome}</Text>
                  <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{curso.email}</Text>
                  <View style={styles.actionCell}>
                    <TouchableOpacity 
                      style={styles.editButton} 
                      onPress={(e) => {
                        e.stopPropagation();
                        onEditPress(curso);
                      }}
                    >
                      <Text style={styles.editText}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={(e) => {
                        e.stopPropagation();
                        onDeletePress(curso.sigla);
                      }}
                    >
                      <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text>Nenhum curso encontrado</Text>
              </View>
            )}
          </ScrollView>
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
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 5,
    marginRight: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 18,
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    padding: 5,
  },
  editText: {
    fontSize: 16,
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableBody: {
    maxHeight: 300,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 16,
  },
});

export default CursosModal;