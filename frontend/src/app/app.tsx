import { Container, Flex, MantineProvider } from "@mantine/core";
import { Header, Sidebar, TrainCameras } from "../widgets";
import '@mantine/core/styles.css';

import styles from "./styles.module.scss";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Container pt="sm" pb="sm" fluid className={styles.container}>
        <Header />
        <Flex gap="md" className={styles.layout}>
          <Sidebar />
          <TrainCameras />
        </Flex>
      </Container>
    </MantineProvider>
  )
}

export default App;