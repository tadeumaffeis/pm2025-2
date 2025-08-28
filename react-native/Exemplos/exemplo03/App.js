import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMainMenu = () => {
    setMenuOpen(!menuOpen);
    console.warn(menuOpen);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => openMainMenu()}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
      </View>
      {menuOpen && (
        <View style={styles.menuPopover}>
          <Pressable
            onPress={() => true}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Text style={styles.menuText}>Cadastros</Text>
          </Pressable>

          <Pressable
            onPress={() => true}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Text style={styles.menuText}>Gerenciamento</Text>
          </Pressable>
          <Pressable
            onPress={() => true}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Text style={styles.menuText}>Usuários</Text>
        </View>
      )}
    </View>
  );
}

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 24 : 0, // espaço do status bar no Android
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    backgroundColor: "#fafafa",
    zIndex: 10,
  },
  hamburgerBtn: {
    padding: 8,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 8,
    borderRadius: 8,
  },
  hamburgerIcon: {
    fontSize: 22,
    lineHeight: 22,
  },
    menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemPressed: {
    backgroundColor: "#f2f2f2",
  },
    menuPopover: {
    position: "absolute",
    top: (Platform.OS === "android" ? 24 : 0) + HEADER_HEIGHT, // abaixo do header
    left: 8,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 20,
    minWidth: 200,
  },
});
