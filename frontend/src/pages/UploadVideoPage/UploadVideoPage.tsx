import { Button, Flex, TextInput } from '@mantine/core';
import { useAppStore } from '@store/store';
import { IconUpload } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

import styles from "./UploadVideoPage.module.scss";

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
    </Flex>
  )
}

export default UploadVideoPage;