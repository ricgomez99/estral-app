import { Control, Path, FieldValues } from "react-hook-form";
import { Switch, View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

interface IControlllerProps<T extends FieldValues> {
  control: Control<T>;
  controllerName: Path<T>;
  labelText: string | undefined;
}
export default function FormSwitchController<
  T extends FieldValues = FieldValues,
>({ control, controllerName, labelText }: IControlllerProps<T>) {
  return (
    <View style={styles.switchWrapper}>
      <Text style={styles.labelText}>{labelText}</Text>
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => (
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={onChange}
            value={value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 3,
  },

  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
