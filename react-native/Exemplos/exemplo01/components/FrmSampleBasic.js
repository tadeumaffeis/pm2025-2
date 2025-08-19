import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function FrmSampleBasic({ onSave = () => { console.warn("Noting")} }) {
  const [identificacao, setIdentificacao] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const onChangeData = (_event, selectedDate) => {
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  const handleSubmit = () => {
        const data = {id: `${identificacao}`,
            nome: `${nome}`,
            email : `${email}`};
    Alert.alert(
      "Dados do Formulário",
      `Identificação: ${identificacao}\nNome: ${nome}\nE-mail: ${email}`
    );
    onSave(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>Formulário</Text>

          <Text style={styles.label}>Identificação</Text>
          <TextInput
            style={styles.input}
            value={identificacao}
            onChangeText={setIdentificacao}
            placeholder="Digite a identificação"
          />

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seunome@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.button}>
            <Button title="Ok" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    paddingTop: 10,
  },
  button: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
});
