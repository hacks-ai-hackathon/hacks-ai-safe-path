import { Container, MantineProvider } from "@mantine/core";
import { Header } from "@/widgets";
import '@mantine/core/styles.css';

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Container fluid pt="sm">
        <Header />
      </Container>
    </MantineProvider>
  )
}

export default App;