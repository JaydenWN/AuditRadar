import {
    Paper,
    Title,
    SimpleGrid,
    Stack
} from '@mantine/core'

import Index_LatestFindings_Card from "./Index_LatestFindings_Card"

export default function Index_LatestFindings(){
    return(
        <Paper shadow="sm" withBorder p="xl">
            <Stack>
                <Title>Latest Findings</Title>
                <SimpleGrid cols={{base: 1, sm : 2, lg : 3}} spacing="sm">
                
                <Index_LatestFindings_Card/>
                <Index_LatestFindings_Card/>
                <Index_LatestFindings_Card/>
                <Index_LatestFindings_Card/>

                </SimpleGrid>
            </Stack>
        </Paper>
    )
}