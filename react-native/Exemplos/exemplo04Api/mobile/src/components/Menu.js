import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const Menu = ({ onCursosPress }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleCursosPress = () => {
    setIsVisible(false);
    onCursosPress && onCursosPress();
  };

  return (
    <View>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <View style={styles.hamburger}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleCursosPress}>
              <Text style={styles.menuText}>Cursos</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 15,
  },
  hamburger: {
    width: 25,
    height: 20,
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Menu;