import { Alert, Badge, Card, Flex } from '@mantine/core';
import styles from "./CameraPreview.module.scss";

import cx from "classnames";
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useAppStore } from '@store/store';

type Props = {
  cameraName: string;
  className?: string;
  link?: string;
  isLive?: boolean;
}

const CameraPreview = ({ cameraName, className, link, isLive = false }: Props) => {
  const { isAlert } = useAppStore();
  return (
      <Card className={cx(styles.preview, className)} padding="0" radius="md">
          <Flex direction="column" gap="sm" className={styles.layout}>
            <Badge className={styles.cameraName} size="lg" variant="dot">
                  <Flex align="center">
                    {cameraName}
                </Flex>
            </Badge>
        <div className={styles.video}>
          {isLive && isAlert && <div  className={styles.alert}>
            <Alert icon={<IconAlertTriangleFilled />} variant="filled" className={styles.alertMessage} color="red">Человек на путях!</Alert>
          </div>}
          {
            isLive && link ? <iframe
                className={styles.stream}
                src={link + '&autohide=1&showinfo=0&controls=0&mute=1&autoplay=1&hd=1'}
                frameBorder="0"
                allow="autoplay"
        /> : <img className={styles.noSignalImg} src="https://placehold.co/600x400?text=No Signal" />
            }
            </div>
          </Flex>
    </Card>
  )
}

export default CameraPreview;