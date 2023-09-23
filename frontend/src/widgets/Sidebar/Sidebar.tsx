import { Card, Flex, Text, Timeline, Button, Group, Image } from "@mantine/core";
import { useAppStore } from "@store/store";
import { IconEye, IconBellSchool, IconSquareRoundedX,  IconPhone } from "@tabler/icons-react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { alertStatus } = useAppStore();

  return (
      <Card className={styles.sidebar}>
          <Flex direction="column" className={styles.layout}>
              {alertStatus === -1 && <Text>Мониторинг... </Text>}
            {alertStatus > -1 &&  <Group>
                <Text fw="bold" size="lg">Внештатная ситуация</Text>
                {/* <Alert icon={<IconAlertTriangleFilled />} color="yellow" w="100%" fw="bold" variant="filled">
                    Внимание!
                </Alert> */}
                <Timeline className={styles.timeline} active={alertStatus} bulletSize={24} lineWidth={3}>
                <Timeline.Item color="yellow" bullet={<IconEye size={18} />} fz="sm" fw="bold" title="Замечен человек">
                    <Flex direction="column">
                        <Text c="dimmed" size="xs">Человек движется через пути</Text>
                        <Text size="xs" mt={4}>10 секунд назад</Text>
                        <Image mt="sm" radius="sm" src="https://static.mk.ru/upload/entities/2020/03/04/19/articles/detailPicture/66/ff/09/3e/04d7f13e955d2ad85439a3ea2eb29977.jpg" />
                    </Flex>
                </Timeline.Item>
                <Timeline.Item color="yellow" bullet={<IconBellSchool size={14} />} fz="xs" title="Предупредительный сигнал">
                    <Text c="dimmed" size="xs">Подайте сигнал человеку</Text>
                </Timeline.Item>
                <Timeline.Item color="red"  opacity="0.6" bullet={<IconSquareRoundedX size={14} />} fz="xs" title="Полная остановка">
                        <Text c="dimmed" size="xs">Через 20 секунд остановите поезд</Text>
                </Timeline.Item>
                <Timeline.Item opacity="0.4" bullet={<IconPhone size={14} />} fz="xs" title="Доложите об инциденте">
                        <Text c="dimmed" size="xs">Составьте рапорт</Text>
                </Timeline.Item>
              </Timeline>
            </Group>}
              {alertStatus > -1 && <Button
                  color="yellow"
                  size="md"
                  className={styles.ringBtn}
                  disabled={alertStatus < 1}
                  leftSection={<IconBellSchool size={24} />}
                  >Подать сигнал</Button>}
        </Flex>
    </Card>
  )
}

export default Sidebar;