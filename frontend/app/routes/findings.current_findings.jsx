import {
    Paper,
    Title,
    Stack,
    SimpleGrid
} from '@mantine/core'

import Findings_Card from '../components/ui/Findings_Card';

import { requireUserId } from '../utils/session.server';
import getUser from '../utils/getUser';
import { prisma } from '../utils/db.server'
import { useLoaderData } from '@remix-run/react';



export async function loader({request}){
  
    const userauth = await requireUserId(request)
    
    if(userauth){
        const user = getUser(request)
        const finding = await prisma.finding.findMany({
            where: {
                userId : user.id
            },
            include : {
                space : true
            }
        })
        
        return finding
    }
    
    return await requireUserId(request)

}

export default function CurrentFindings(){
const loaderData = useLoaderData()
console.log(loaderData)
    return(
        <Paper shadow='sm' p='lg' withBorder>
            <Stack align='center'>
                <Title>Current Findings</Title>
                <SimpleGrid cols={{base: 1, sm : 2, md: 3}}>
                    {loaderData.map((finding)=>(
                        finding.resolved === false ?
                        <Findings_Card
                            key={finding.title}
                            title={finding.title}
                            space={finding.space.title}
                            description={finding.description}
                            rating={finding.rating} />
                        :
                        null
                    ))}
                    
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}