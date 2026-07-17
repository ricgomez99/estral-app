import { ISegmentedButtonsProps } from "@/types/shared-types/segmented-buttons-types";
import { Picker, Text } from "@expo/ui/swift-ui";
import { pickerStyle, tag } from "@expo/ui/swift-ui/modifiers";

export default function SegmentedButtons({
  onPress,
  options,
  selectedOption,
}: ISegmentedButtonsProps) {
  return (
    <Picker
      selection={selectedOption}
      modifiers={[pickerStyle("segmented")]}
      onSelectionChange={(selection) => onPress(options.indexOf(selection))}>
      {options &&
        options.map((option) => (
          <Text key={option} modifiers={[tag(option)]}>
            {option}
          </Text>
        ))}
    </Picker>
  );
}
