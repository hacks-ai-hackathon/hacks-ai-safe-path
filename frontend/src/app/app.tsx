import { Container, MantineProvider } from "@mantine/core";
import { Header } from "@widgets";
import '@mantine/core/styles.css';

import styles from "./styles.module.scss";
import { MonitoringPage, UploadVideoPage } from "@pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Container pt="sm" pb="sm" fluid className={styles.container}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route index path="/" Component={UploadVideoPage} />
          <Route path="/monitoring" Component={MonitoringPage} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MantineProvider>
  )
}

export default App;