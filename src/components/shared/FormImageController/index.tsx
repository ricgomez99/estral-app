import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

interface IControllerProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  labelText: string;
}

export default function FormImageController<T extends FieldValues>({
  control,
  controllerName,
}: IControllerProps<T>) {
  const pickImage = async (formOnChange: (uri: string) => void) => {
    const permissionsResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionsResult.granted === false) {
      Toast.show({
        type: "info",
        text1: "Permissions are required to access gallery",
        position: "top",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      formOnChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}></Text>
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerWrapper}>
            {value ? (
              <Image
                source={{ uri: value }}
                style={styles.previewImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.previewImage, styles.placeholder]}>
                <Text style={styles.placeholderText}>No Photo</Text>
              </View>
            )}
            <Pressable
              onPress={() => pickImage(onChange)}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {value ? "Change Photo" : "Select Photo"}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  labelText: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  pickerWrapper: { flexDirection: "row", alignItems: "center", gap: 15 },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholder: {
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "#7c7c7c", fontSize: 12 },
  button: {
    backgroundColor: "#81b0ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
