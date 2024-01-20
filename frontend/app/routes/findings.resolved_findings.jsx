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
import { requireUserId } from '../utils/session.server';

export async function loader({request}){
  return await requireUserId(request)
}
export default function ResolvedFindings(){

    return(
        <Paper shadow='sm' p='lg'>
            <Stack>
                <Title>Resolved Findings</Title>
                <SimpleGrid cols={{base: 1, sm : 2, md: 3}}>
                    <Findings_Card/>
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}