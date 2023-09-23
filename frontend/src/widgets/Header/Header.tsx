import { Badge, Flex, Text } from "@mantine/core";
import { IconRoute } from '@tabler/icons-react';
import { UserAvatar } from "@/ui";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Flex justify="space-between" align="center" className={styles.header}>
      <Flex align="center" gap='md'>
        <IconRoute />
        <Text size="xl" className={styles.logo}>
          Безопасный путь
      </Text>
        <Badge className={styles.status} variant="dot" color="green">
          Online
          </Badge>
      </Flex>
      <Flex align="center" gap="md">
        <Text size="sm">Аркадий Паровозов</Text>
        <UserAvatar />
      </Flex>
    </Flex>
  )
}

export default Header;