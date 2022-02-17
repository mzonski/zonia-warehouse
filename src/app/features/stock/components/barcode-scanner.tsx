import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import Col from 'react-native-col';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import { useBarcodeScanner } from '@hook/useBarcodeScanner';
import useAsyncEffect from 'use-async-effect';

type BarcodeCameraReaderProps = {
  onRead: (barcode: string[]) => void;
};

export const BarcodeScanner: FunctionComponent<BarcodeCameraReaderProps> = ({ onRead }) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const { back } = useCameraDevices();
  const { frameProcessor } = useBarcodeScanner(onRead);

  const requestPermission = useCallback(async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  }, [setHasPermission]);

  useAsyncEffect(requestPermission, [requestPermission]);

  if (!back)
    return (
      <Col.C>
        <ActivityIndicator size="large" />
      </Col.C>
    );

  if (!hasPermission)
    return (
      <Col.C>
        <Text>No permission granted</Text>
      </Col.C>
    );

  return (
    <Col.C>
      <Camera style={{ width: '100%', aspectRatio: 1 }} device={back} isActive frameProcessor={frameProcessor} frameProcessorFps={5} />
    </Col.C>
  );
};
