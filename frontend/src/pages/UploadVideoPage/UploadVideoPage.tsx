import { Button, Flex, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';

import styles from "./UploadVideoPage.module.scss";

const UploadVideoPage = () => {
    const [link, setLink] = useState("");

  return (
      <Flex align="center" gap="lg" direction="column" justify="center" className={styles.layout}>
          <TextInput
              onChange={(e) => setLink(e.target.value)}
              variant="filled"
              value={link}
              classNames={{ input: styles.input, root: styles.rootInput,section: styles.section }}
              w="100%"
              placeholder='Вставьте ссылку на видео'
              rightSection={<Button
                  disabled={link.length === 0}
                  className={styles.uploadBtn}
                leftSection={<IconUpload size="18" className={styles.icon} />}
              >
                  Загрузить
              </Button>
                  
              }
          />
    </Flex>
  )
}

export default UploadVideoPage;