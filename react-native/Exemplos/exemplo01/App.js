import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import FrmSample from "./components/FrmSample";

export default function App() {
  return (
    <View style={styles.container}>
      <FrmSample />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // espaço pro conteúdo respirar
  },
});
