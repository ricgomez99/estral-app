import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

/** Resize + convert to JPEG so extension and content type are always known */
export const normalizeToJpeg = async (
  localUri: string,
  avatarWidth: number,
): Promise<string> => {
  const context = ImageManipulator.manipulate(localUri);
  context.resize({ width: avatarWidth });
  const rendered = await context.renderAsync();
  const result = await rendered.saveAsync({
    format: SaveFormat.JPEG,
    compress: 0.8,
  });

  return result.uri;
};
