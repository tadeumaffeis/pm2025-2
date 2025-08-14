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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FrmSample() {
  const [identificacao, setIdentificacao] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função para formatar a data no padrão dd/mm/aaaa
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChangeData = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      "Dados do Formulário",
      `Identificação: ${identificacao}\nNome: ${nome}\nData Nasc.: ${formatDate(
        dataNascimento
      )}\nE-mail: ${email}`
    );
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

          <Text style={styles.label}>Data de Inclusão</Text>
          <View style={{ marginBottom: 12 }}>
            <Button
              title={formatDate(dataNascimento)}
              onPress={() => setShowDatePicker(true)}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeData}
            />
          )}

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seunome@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button title="Ok" onPress={handleSubmit} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
});
