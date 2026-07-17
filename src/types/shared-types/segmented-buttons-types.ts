interface ISegmentedButtonsProps {
  options: string[];
  selectedOption: string;
  onPress: (idx: number) => void;
}

export type { ISegmentedButtonsProps };
