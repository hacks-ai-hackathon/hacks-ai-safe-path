import { Flex } from '@mantine/core';
import { Sidebar, TrainCameras } from '@widgets/index';

import styles from "./MonitoringPage.module.scss";

const MonitoringPage = () => {
  return (
    <Flex gap="md" className={styles.layout}>
          <Sidebar />
          <TrainCameras />
    </Flex>
  )
}

export default MonitoringPage;