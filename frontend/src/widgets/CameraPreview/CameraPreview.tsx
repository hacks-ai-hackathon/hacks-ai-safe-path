import { Badge, Card, Flex } from '@mantine/core';
import styles from "./CameraPreview.module.scss";

const CameraPreview = () => {
  return (
      <Card className={styles.preview} padding="0" radius="md">
          <Flex direction="column" gap="sm" className={styles.layout}>
            <Badge className={styles.cameraName} size="lg" variant="dot">
                  <Flex align="center">
                    Передняя камера
                </Flex>
            </Badge>
            <iframe
                className={styles.stream}
                src="https://www.youtube.com/embed/g7CJ3pm-e7s?si=NAJzGUFhbCKVGMJP&autohide=1&showinfo=0&controls=0&mute=1&autoplay=1"
                frameBorder="0"
                allow="autoplay"
            />
          </Flex>
    </Card>
  )
}

export default CameraPreview;