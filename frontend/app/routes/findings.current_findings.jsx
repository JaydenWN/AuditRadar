import {
    Paper,
    Title,
    Stack,
    Flex,
    Card,
    Image,
    Text,
    Rating,
    Group,
    SimpleGrid
} from '@mantine/core'

import Findings_Card from '../components/ui/Findings_Card';

export default function CurrentFindings(){

    return(
        <Paper shadow='sm' p='lg'>
            <Stack>
                <Title>Current Findings</Title>
                <SimpleGrid cols={{base: 1, sm : 2, md: 3}}>
                    <Findings_Card/>
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}