import { Flex } from '@mantine/core';
import CameraPreview from '../CameraPreview/CameraPreview';

import styles from "./TrainCameras.module.scss";

const TrainCameras = () => {
  return (
    <Flex direction="column" gap="sm" className={styles.cameras}>
        <CameraPreview cameraName="Передняя камера" />
        <Flex gap="sm">
            <CameraPreview cameraName="Боковая камера (левая)" />
            <CameraPreview cameraName="Задняя камера" />
            <CameraPreview  cameraName="Боковая камера (правая)" />
        </Flex>
    </Flex>
  )
}

export default TrainCameras;