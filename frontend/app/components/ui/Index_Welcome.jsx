import { 
    Title,
    Text,
    Paper,
    Stack,
    Group,
    Avatar,
    Flex,
    Button
  } from "@mantine/core";
import { NavLink } from "@remix-run/react";

export default function Index_Welcome({username, avatar}){
    return (
        <Paper shadow="sm" withBorder p={{base: 'lg', md : 'lg'}}>
          <Flex 
            justify={{base : 'space-between', sm : 'center'}}
            align={{base : 'center'}}
            gap='lg'
            direction={{base: 'column', sm: 'row'}}
          >
            <Avatar src={avatar} size='xl'/>
          <Stack>
            <Group>
              <Title order={2}>Hello again {username}!</Title>
            </Group>
            <Text size="sm">
              Ready to start auditing?
            </Text>
            <Button 
              maw='fit-content'
              variant="default"
              rightSection='+'
              component={NavLink}
              to='/findings/new_finding'>Create New Finding</Button>
          </Stack>
            
          </Flex>
          
        </Paper>
      );
}