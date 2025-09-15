// App.tsx / App.js
import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import Screen from './src/components/Screen';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* No Android, evitar conteúdo por baixo da status bar */}
      <StatusBar translucent={false} />
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Agora não sobrepõe a câmera do Pixel 9a 👌
      </Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600" },
});

