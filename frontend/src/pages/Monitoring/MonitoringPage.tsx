import { Flex } from '@mantine/core';
import Sidebar from '@widgets/Sidebar/Sidebar';
import TrainCameras from '@widgets/TrainCameras/TrainCameras';

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