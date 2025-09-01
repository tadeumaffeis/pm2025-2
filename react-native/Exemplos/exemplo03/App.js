import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

const HEADER_HEIGHT = 56;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev;
      console.warn("menuOpen ->", next);
      return next;
    });
  };

  const handleSelect = (label) => {
    console.log("Selecionado:", label);
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Pressable
          onPress={toggleMenu}
          accessibilityRole="button"
          accessibilityLabel={menuOpen ? "Fechar menu" : "Abrir menu"}
          style={({ pressed }) => [styles.hamburgerBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Meu App</Text>
      </View>

      {/* Backdrop para fechar ao tocar fora */}
      {menuOpen && (
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          {/* Usamos pointerEvents para permitir clique no popover */}
          <View style={styles.popoverWrapper} pointerEvents="box-none">
            <View style={styles.menuPopover}>
              <Pressable
                onPress={() => handleSelect("Cadastros")}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                accessibilityRole="button"
              >
                <Text style={styles.menuText}>Cadastros</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSelect("Gerenciamento")}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                accessibilityRole="button"
              >
                <Text style={styles.menuText}>Gerenciamento</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSelect("Usuários")}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                accessibilityRole="button"
              >
                <Text style={styles.menuText}>Usuários</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

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
  headerTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  hamburgerBtn: {
    padding: 8,
    borderRadius: 8,
  },
  hamburgerIcon: {
    fontSize: 22,
    lineHeight: 22,
  },

  /* Backdrop que cobre a tela para capturar toques fora do menu */
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    top: (Platform.OS === "android" ? 24 : 0) + HEADER_HEIGHT,
  },
  popoverWrapper: {
    flex: 1,
  },
  menuPopover: {
    position: "absolute",
    top: 8,
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
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemPressed: {
    backgroundColor: "#f2f2f2",
  },
  menuText: {
    fontSize: 16,
  },
});
