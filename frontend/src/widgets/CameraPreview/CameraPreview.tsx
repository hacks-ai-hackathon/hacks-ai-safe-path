import { Badge, Card, Flex } from '@mantine/core';
import styles from "./CameraPreview.module.scss";

import cx from "classnames";

type Props = {
  cameraName: string;
  className?: string;
  link?: string;
  isLive?: boolean;
}

const CameraPreview = ({ cameraName, className, link, isLive = false }: Props) => {
  return (
      <Card className={cx(styles.preview, className)} padding="0" radius="md">
          <Flex direction="column" gap="sm" className={styles.layout}>
            <Badge className={styles.cameraName} size="lg" variant="dot">
                  <Flex align="center">
                    {cameraName}
                </Flex>
            </Badge>
            {isLive && link ? <iframe
                className={styles.stream}
                src={link + '&autohide=1&showinfo=0&controls=0&mute=1&autoplay=1&hd=1'}
                frameBorder="0"
                allow="autoplay"
            /> : <img className={styles.noSignalImg} src="https://placehold.co/600x400?text=No Signal" />}
          </Flex>
    </Card>
  )
}

export default CameraPreview;