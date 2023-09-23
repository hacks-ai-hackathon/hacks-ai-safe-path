import { Container, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

import styles from "./styles.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@widgets/Header/Header";
import UploadVideoPage from "@pages/UploadVideoPage/UploadVideoPage";
import MonitoringPage from "@pages/Monitoring/MonitoringPage";

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