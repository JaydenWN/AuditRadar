import {Group, Paper, SimpleGrid, Text, Title} from '@mantine/core'

import Spaces_Card from '../components/ui/Spaces_Card'
export default function Room(){
    return(
        <Paper withBorder p='lg'>
            <Title fw={600} order={2}>Space Name</Title>
            <Group justify='center'>
            <SimpleGrid cols={{base: 1, sm: 2, md : 3, lg: 4}} mt='lg'>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>

            </SimpleGrid>
            </Group>
        </Paper>
    )
}