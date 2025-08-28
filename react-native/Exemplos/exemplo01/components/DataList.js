import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons"; // expo install @expo/vector-icons

export default function DataList({ data = [], onRemove }) {
  const [list, setList] = useState(Array.isArray(data) ? data : []);
  const [selected, setSelected] = useState(null); // guarda o id do selecionado
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    setList(Array.isArray(data) ? data : []);
  }, [data]);

  const handleRemoveSelected = () => {
    if (selected == null) {
      Alert.alert("Nenhum item selecionado", "Selecione um item para excluir.");
      return;
    }
    const updated = list.filter((it) => it.id !== selected);
    setList(updated);
    setSelected(null);
    if (typeof onRemove === "function") onRemove(selected, updated);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <RadioButton
        value={String(item.id)}
        status={selected === item.id ? "checked" : "unchecked"}
        onPress={() => setSelected(item.id)}
      />
      <Text style={styles.text} onPress={() => setModalOn(true)}>
        {item.nome || "___"}
      </Text>
    </View>
  );

  const keyExtractor = (item, idx) =>
    (item?.id != null ? String(item.id) : String(idx));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Envios</Text>
        <Pressable
          onPress={handleRemoveSelected}
          hitSlop={8}
          android_ripple={{ borderless: true }}
        >
          <MaterialIcons name="remove-circle-outline" size={28} color="red" />
        </Pressable>
      </View>

      <FlatList
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum dado salvo.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "600" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: { fontSize: 16 },
  empty: { fontSize: 14, fontStyle: "italic", color: "#666" },
});


/*
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default function DataList({ data = [] }) {
  const [selected, setSelected] = React.useState(null); // guarda o id do selecionado
  const [modalOn, setModalOn] = useState(false);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <RadioButton
        value={item.id}
        status={selected === item.id ? "checked" : "unchecked"}
        onPress={() => setSelected(item.id)}
      />
      <Text style={styles.text} 
        onPress={() => setModalOn(true)}
      >
        {item.nome || "___"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Envios</Text>
      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum dado salvo.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: { fontSize: 16 },
  empty: { fontSize: 14, fontStyle: "italic", color: "#666" },
  result: { marginTop: 12, fontWeight: "bold", color: "#333" },
});
*/
