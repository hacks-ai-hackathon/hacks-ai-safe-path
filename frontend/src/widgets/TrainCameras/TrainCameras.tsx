import { Flex } from '@mantine/core';
import { useAppStore } from '@store/store';
import CameraPreview from '../CameraPreview/CameraPreview';

import styles from "./TrainCameras.module.scss";

const TrainCameras = () => {
  const link = useAppStore(store => store.link);
  
  return (
    <Flex direction="column" gap="sm" className={styles.cameras}>
        <CameraPreview className={styles.main} link={link} isLive cameraName="Передняя камера" />
        <Flex gap="sm" className={styles.row}>
            <CameraPreview cameraName="Боковая камера (левая)" />
            <CameraPreview cameraName="Задняя камера" />
            <CameraPreview  cameraName="Боковая камера (правая)" />
        </Flex>
    </Flex>
  )
}

export default TrainCameras;