import { Flex, LoadingOverlay } from '@mantine/core';
import { useAppStore } from '@store/store';
import Sidebar from '@widgets/Sidebar/Sidebar';
import TrainCameras from '@widgets/TrainCameras/TrainCameras';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./MonitoringPage.module.scss";

const MonitoringPage = () => {
  const { link } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!link) {
      navigate('/');
    }
  }, []);

  if (!link) {
    return <LoadingOverlay />
  }
  
  return (
    <Flex gap="md" className={styles.layout}>
          <Sidebar />
          <TrainCameras />
    </Flex>
  )
}

export default MonitoringPage;