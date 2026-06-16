import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface IControllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  placeHolderText: string | undefined;
}

export default function FormDateController<
  T extends FieldValues = FieldValues,
>({ control, controllerName, placeHolderText }: IControllerProps<T>) {
  const [showDate, setShowDate] = useState(false);
  const handleShowDate = () => {
    setShowDate(true);
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        const defaultDate =
          (value as unknown) instanceof Date ? (value as Date) : new Date();

        const defaultDisplay = Platform.OS === "ios" ? "spinner" : "calendar";

        const handleDateChange = (
          event: DateTimePickerEvent,
          selectedDate?: Date,
        ) => {
          if (Platform.OS === "android") setShowDate(false);
          if (selectedDate) onChange(selectedDate);
        };

        return (
          <View style={styles.container}>
            <Pressable style={styles.fakeInput} onPress={handleShowDate}>
              // Crear metodo para formatear fechas con DateService
              <Text style={styles.inputText}>Seleccione la fecha</Text>
            </Pressable>
            {showDate && (
              <DateTimePicker
                value={defaultDate}
                mode="date"
                display={defaultDisplay}
                onChange={handleDateChange}
                placeholderText={placeHolderText}
              />
            )}
          </View>
        );
      }}
      name={controllerName}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  fakeInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
});
