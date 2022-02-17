import { useCallback, useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { Frame, useFrameProcessor } from 'react-native-vision-camera';

import { isEmpty } from 'lodash';

const scanBarcodes = (frame: Frame): string[] | null => {
  'worklet';

  return __scanBarcode(frame);
};

export const useBarcodeScanner = (callback?: (barcodes: string[]) => void) => {
  const [barcodes, setBarcodes] = useState<string[]>([]);

  const handleCallback = useCallback(
    (codes: string[] | null) => {
      if (!codes || isEmpty(codes)) return;
      setBarcodes(codes);
      callback?.(codes);
    },
    [setBarcodes, callback]
  );

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    const detectedBarcodes = scanBarcodes(frame);
    runOnJS(handleCallback)(detectedBarcodes);
  }, []);

  return { frameProcessor, barcodes };
};
