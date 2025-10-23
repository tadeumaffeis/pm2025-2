import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  
  console.log('DashboardScreen - user:', user);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout, style: 'destructive' }
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo,</Text>
        <Text style={styles.userName}>{user?.username}</Text>
        <Text style={styles.userRole}>({user?.role})</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Sistema de Horários Lab</Text>
        <Text style={styles.infoText}>
          Este sistema permite o gerenciamento completo de horários de laboratórios.
        </Text>
      </View>

      <View style={styles.menuGrid}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Cursos')}
        >
          <Text style={styles.menuTitle}>Cursos</Text>
          <Text style={styles.menuSubtitle}>Gerenciar cursos disponíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
        >
          <Text style={styles.menuTitle}>Laboratórios</Text>
          <Text style={styles.menuSubtitle}>Gerenciar laboratórios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoutButton: {
    marginRight: 15,
    padding: 5,
  },
  logoutText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginTop: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default DashboardScreen;