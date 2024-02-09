import {
    Paper,
    Title,
    SimpleGrid,
    Stack
} from '@mantine/core'

import Index_LatestFindings_Card from "./Index_LatestFindings_Card"

export default function Index_LatestFindings({data}){
    return(
        <Paper shadow="sm" withBorder p="xl">
            <Stack>
                <Title>Latest Findings</Title>
                <SimpleGrid cols={{base: 1, sm : 2}} spacing="sm">
                {data.findings.sort((a,b)=> b.id - a.id).slice(0,4).map((finding)=>(
                    <Index_LatestFindings_Card 
                        key={finding.title}
                        title={finding.title}
                        description={finding.description}
                        alt={finding.title}
                        img={finding.image}
                        rating={finding.rating}/>
                ))}
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}