import { Button, Flex, TextInput } from '@mantine/core';
import { useAppStore } from '@store/store';
import { IconHistory, IconUpload } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

import styles from "./UploadVideoPage.module.scss";

const SAVED_LINK = "https://www.youtube.com/embed/VtYChS_8nII?si=dLxhXtywou7NAiWy"

const UploadVideoPage = () => {
    const { link, setLink } = useAppStore();
    const navigate = useNavigate();

    const onSubmit = () => { 
        // api call
        navigate('/monitoring');
    }

  return (
      <Flex align="center" gap="lg" direction="column" justify="center" className={styles.layout}>
          <TextInput
              onChange={(e) => setLink(e.target.value)}
              variant="filled"
              value={link}
              classNames={{ input: styles.input, root: styles.rootInput,section: styles.section }}
              w="100%"
              placeholder='Вставьте ссылку на видео'
              rightSection={
                  <Button
                  disabled={link.length === 0}
                  className={styles.uploadBtn}
                      leftSection={<IconUpload size="18" className={styles.icon} />}
                      onClick={onSubmit}
              >
                  Загрузить
              </Button>
                  
              }
          />
          <Flex align="flex-start">
              <Button variant="transparent" leftSection={<IconHistory />} onClick={() => setLink(SAVED_LINK)}>Загрузить последнюю ссылку</Button>
          </Flex>
    </Flex>
  )
}

export default UploadVideoPage;