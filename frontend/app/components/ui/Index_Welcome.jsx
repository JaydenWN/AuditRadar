import { 
    Title,
    Text,
    Paper,
    Stack,
    Group,
    Avatar,
  } from "@mantine/core";
  import DateDisplay from '../DateDisplay'

export default function Index_Welcome(){
    return (
        <Paper shadow="sm" withBorder p="xl">
          <Group >
            <Avatar size='xl'/>
          <Stack>
            <Group>
              <Title order={2}>Hello again Username!</Title>
              
            </Group>
            <Text size="sm">
              Ready to start auditing?
            </Text>
            <DateDisplay/>
          </Stack>
          </Group>
        </Paper>
      );
}