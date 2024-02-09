import {
    Card,
    Image,
    Text,
    Rating,
    useMantineTheme
}from '@mantine/core'
import { IoThumbsDown, IoThumbsDownOutline } from 'react-icons/io5/index.js'

export default function Index_LatestFindings_Card({img, alt, title, description, rating}){
  const theme = useMantineTheme()
    return(
        <Card
            shadow="sm"
            padding='sm'
          >
            <Card.Section>
              <Image 
                h={160}
                src={img}
                alt={alt}
                >
              </Image>
            </Card.Section>
            <Text mt='sm' fw={500}>{title}</Text>
            <Text c='dimmed'>{description}</Text>
            <Rating
                readOnly
                value={rating}
                mt='lg' 
                emptySymbol={<IoThumbsDownOutline style={{color: theme.colors.gray[7], }}/>}
                fullSymbol={<IoThumbsDown style={{color: theme.colors.red[6],}}/>} />
          </Card>
    )
}