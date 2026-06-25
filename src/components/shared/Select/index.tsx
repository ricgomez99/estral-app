import { OptionType } from "@/types/picker-types";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ISelectProps {
  options: OptionType[] | undefined;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
}: ISelectProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectOption = options?.find((option) => option.value === value);
  const handleSelect = (itemValue: string | number) => {
    onChange(itemValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}>
        <Text style={selectOption ? styles.textValue : styles.textPlaceholder}>
          {selectOption ? selectOption.label : placeholder || "Select..."}
        </Text>
        <MaterialIcons name="unfold-more" size={24} color="#999" />
      </Pressable>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{placeholder || "Options"}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.optionItem,
                    item.value === value && styles.optionItemSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}>
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textValue: { color: "#000", fontSize: 16 },
  textPlaceholder: { color: "#999", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    opacity: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    marginBottom: 25,
    maxHeight: "50%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 3,
    flexDirection: "column",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionItemSelected: { backgroundColor: "#f0f0f0" },
  optionText: { fontSize: 16, color: "#333" },
  optionTextSelected: { fontWeight: "bold", color: "#007AFF" },
});
