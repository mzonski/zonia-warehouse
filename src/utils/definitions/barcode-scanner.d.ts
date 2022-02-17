import { Frame } from 'react-native-vision-camera';

declare global {
  const __scanBarcode: (frame: Frame) => string[] | null;
}
