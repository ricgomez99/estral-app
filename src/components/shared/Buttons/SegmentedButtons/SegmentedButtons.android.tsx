import { ISegmentedButtonsProps } from "@/types/shared-types/segmented-buttons-types";
import {
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text,
} from "@expo/ui/jetpack-compose";

export default function SegmentedButtons({
  options,
  selectedOption,
  onPress,
}: ISegmentedButtonsProps) {
  const optionIndex = options.indexOf(selectedOption);

  return (
    <SingleChoiceSegmentedButtonRow>
      {options &&
        options.map((option, index) => (
          <SegmentedButton
            key={option}
            selected={index === optionIndex}
            onClick={() => onPress(index)}>
            <SegmentedButton.Label>
              <Text>{option}</Text>
            </SegmentedButton.Label>
          </SegmentedButton>
        ))}
    </SingleChoiceSegmentedButtonRow>
  );
}
