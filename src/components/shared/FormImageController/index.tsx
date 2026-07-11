import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { images } from "@/utils/consts";
import { useState, useEffect } from "react";

interface IControllerProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  labelText: string;
}

export default function FormImageController<T extends FieldValues>({
  control,
  controllerName,
}: IControllerProps<T>) {
  const [hasPermissions, setPermissions] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissions(res.granted);
    })();
  }, []);

  const pickImage = async (formOnChange: (uri: string) => void) => {
    if (!hasPermissions) {
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

    if (!result.canceled && result.assets?.length) {
      formOnChange(result.assets[0].uri);
    }
  };

  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Image
            source={value ? { uri: value } : images.defaultHorse}
            style={styles.previewImage}
            contentFit="cover"
          />

          <Pressable
            onPressIn={() => pickImage(onChange)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {value ? "Change Photo" : "Select Photo"}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,

    flexDirection: "row",
    width: "100%",
    height: "auto",
    justifyContent: "flex-start",
    gap: 12,
    alignItems: "center",
  },

  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },

  button: {
    backgroundColor: "#81b0ff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
