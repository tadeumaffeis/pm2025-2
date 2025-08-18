import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import FrmSample from "./components/FrmSample";           // formulário completo
import FrmSampleBasic from "./components/FrmSampleBasic"; // formulário básico

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedForm, setSelectedForm] = useState("basic"); // mostra algo por padrão

  const addData = (d) => {
    console.warn('--->', d);
    setData((prev) => [...prev, d]);
    console.warn("data", data);
  };

  const chooseForm = (key) => {
    setSelectedForm(key);
    setMenuOpen(false);
  };

  const formSave = (formData, formKey) => {
    // opcional: guarde qual form salvou
    addData({ form: formKey ?? selectedForm, ...formData });
  };

  return (
    <View style={styles.app}>
      {/* Cabeçalho fixo com o ícone do menu */}
      <View style={styles.header}>
        <Pressable
          onPress={() => setMenuOpen((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
          style={({ pressed }) => [styles.hamburgerBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Exemplos</Text>
      </View>

      {/* Menu flutuante (abre abaixo do header, à esquerda) */}
      {menuOpen && (
        <View style={styles.menuPopover}>
          <Pressable
            onPress={() => chooseForm("basic")}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Text style={styles.menuText}>Formulário Básico</Text>
          </Pressable>

          <Pressable
            onPress={() => chooseForm("full")}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          >
            <Text style={styles.menuText}>Formulário Completo</Text>
          </Pressable>
        </View>
      )}

      {/* Área de conteúdo (abaixo do header) */}
      <View style={styles.content}>
        {selectedForm === "basic" && <FrmSampleBasic onSave={formSave} />}
        {selectedForm === "full" && <FrmSample onSave={formSave} />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  app: {
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
    marginRight: 8,
    borderRadius: 8,
  },
  hamburgerIcon: {
    fontSize: 22,
    lineHeight: 22,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  // menu popover
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
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItemPressed: {
    backgroundColor: "#f2f2f2",
  },
  menuText: {
    fontSize: 15,
  },

  content: {
    flex: 1,
  },
});
