import React, { useState, useEffect } from "react";
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

function parseDateLoose(value) {
  if (!value) return new Date();
  // aceita Date, ISO, ou dd/mm/aaaa
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    // dd/mm/aaaa
    const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) {
      const [_, dd, mm, yyyy] = m;
      return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
    // tenta ISO ou algo que o Date reconheça
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
  }
  return new Date();
}

function formatDateDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function toISODate(date) {
  // YYYY-MM-DD (sem horário)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function FrmSample({ onSave = () => {}, data = {} }) {
  const [identificacao, setIdentificacao] = useState(data.identificacao || "");
  const [nome, setNome] = useState(data.nome || "");
  const [email, setEmail] = useState(data.email || "");
  const [dataNascimento, setDataNascimento] = useState(
    data.dataNascimento ? parseDateLoose(data.dataNascimento) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Se quiser refletir mudanças de `data` vindas do pai:
  useEffect(() => {
    setIdentificacao(data.identificacao || "");
    setNome(data.nome || "");
    setEmail(data.email || "");
    setDataNascimento(data.dataNascimento ? parseDateLoose(data.dataNascimento) : new Date());
  }, [data]);

  const onChangeData = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDataNascimento(selectedDate);
  };

  const handleSubmit = () => {
    const formData = {
      id: identificacao,
      nome,
      dtnasc: formatDateDDMMYYYY(dataNascimento), // para exibir/humanizado
      email,
      // envie também um padrão estável para persistir:
      dataNascimentoISO: toISODate(dataNascimento),
    };

    Alert.alert(
      "Dados do Formulário",
      `Identificação: ${identificacao}\nNome: ${nome}\nData Nasc.: ${formatDateDDMMYYYY(
        dataNascimento
      )}\nE-mail: ${email}`
    );
    onSave(formData);
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

          <Text style={styles.label}>Data de Nascimento</Text>
          <View style={{ marginBottom: 12 }}>
            <Button
              title={formatDateDDMMYYYY(dataNascimento)}
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
