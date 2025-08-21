import * as React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default function DataList({ data = [] }) {
  const [selected, setSelected] = React.useState(null); // guarda o id do selecionado

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <RadioButton
        value={item.id}
        status={selected === item.id ? "checked" : "unchecked"}
        onPress={() => setSelected(item.id)}
      />
      <Text style={styles.text}>
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
