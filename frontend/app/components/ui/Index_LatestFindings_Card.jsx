import {
    Card,
    Image,
    Text 
}from '@mantine/core'
export default function Index_LatestFindings_Card({img, alt, title, description}){
    return(
        <Card
            shadow="sm"
            padding='sm'
          >
            <Card.Section>
              <Image 
                h={160}
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="No way!"
                
                >
              </Image>
            </Card.Section>
            <Text mt='sm' fw={500}>Finding Title</Text>
            <Text c='dimmed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, sequi...</Text>
          </Card>
    )
}