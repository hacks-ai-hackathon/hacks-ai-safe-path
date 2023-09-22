import { Container, Flex, MantineProvider } from "@mantine/core";
import { Header } from "@/widgets";
import '@mantine/core/styles.css';
import { CameraPreview } from "../widgets";

import styles from "./styles.module.scss";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Container pt="sm" pb="sm" fluid className={styles.container}>
        <Flex direction="column" gap="md" className={styles.layout}>
          <Header />
          <CameraPreview />
        </Flex>
      </Container>
    </MantineProvider>
  )
}

export default App;