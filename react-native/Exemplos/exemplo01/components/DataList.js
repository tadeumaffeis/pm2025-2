import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function DataList({ data = [] }) {
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        {index + 1}. {item.id || "(sem nome)"} {item.nome || ''}
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
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  item: {
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
  empty: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
  },
});
