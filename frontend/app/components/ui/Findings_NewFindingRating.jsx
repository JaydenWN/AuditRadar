import {
    Box,
    Text,
    Rating,
    useMantineTheme
} from '@mantine/core'

import { IoThumbsDown, IoThumbsDownOutline } from 'react-icons/io5/index.js'

export default function NewFindingRating(){
    const theme = useMantineTheme()
    return(
        <Box>
            <Text size='sm' fw={500}>Give the issue a rating</Text>
            <Text size='xs' c='dimmed'>1 being a low rated problem, 5 being a high rated problem.</Text>
            <Rating 
                mt='lg' 
                emptySymbol={<IoThumbsDownOutline style={{color: theme.colors.gray[7], }}/>}
                fullSymbol={<IoThumbsDown style={{color: theme.colors.red[6],}}/>} />
        </Box>
    )

}