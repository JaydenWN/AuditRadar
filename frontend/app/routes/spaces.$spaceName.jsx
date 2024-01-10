import {Paper, SimpleGrid, Text, Title} from '@mantine/core'

import Spaces_Card from '../components/ui/Spaces_Card'
export default function Room(){
    return(
        <Paper withBorder p='lg'>
            <Title fw={600} order={2}>Space Name</Title>
            <SimpleGrid cols={4}>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>
                <Spaces_Card/>

            </SimpleGrid>
        </Paper>
    )
}