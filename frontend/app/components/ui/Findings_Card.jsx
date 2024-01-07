import {
    Flex,
    Card,
    Image,
    Text,
    Rating,
} from '@mantine/core'

import { useMantineTheme } from '@mantine/core';
import {IoThumbsDown} from "react-icons/io5/index.js";

export default function Findings_Card({title, space, description, rating}){
    const theme = useMantineTheme()
    const thumbIconFull = (<IoThumbsDown style={{color: theme.colors.red[6]}}/>)
    const thumbIconEmpty = (<></>)

    return(
            <Flex>
                <Card
                    shadow="sm"
                    padding="md"
                >
                    <Card.Section>
                        <Image
                        src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        h={160}
                        alt="No way!"
                        />
                    </Card.Section>   

                    <Text fw={500} size="lg" mt="md">
                        Finding Title
                    </Text>
                    
                    <Text c='dimmed' size='xs'>
                        Space Name
                    </Text>

                    <Text mt="md" c="dimmed" size="sm">
                        Finding Description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde accusantium perspiciatis aliquid molestias recusandae nobis laboriosam atque sit veniam accusamus!
                    </Text>

                    <Flex align='center' gap='md' direction='column'>
                    <Text mt='lg' fw={400}>Rating Level</Text>
                     <Rating
                      defaultValue={2}
                      readOnly
                      emptySymbol={thumbIconEmpty}
                      fullSymbol={thumbIconFull}></Rating>
                    </Flex>
                    
                </Card>
            </Flex>
    )
}