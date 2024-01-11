import {Paper,
        Text, 
        Stack, 
        TextInput, 
        Select, 
        Textarea,
        Rating,
        useMantineTheme,
        Box,
        Button
    } from '@mantine/core'

import NewFindingRating from '../components/ui/Findings_NewFindingRating'
import FindingDropZone from '../components/ui/Findings_FindingDropzone'

export default function NewFinding(){
    const theme = useMantineTheme()
    return (
        <Stack gap='lg'>

        <Paper shadow='sm' withBorder p='lg'>
            <Text size='xl' fw={600}>
                Create A New Finding
            </Text>
            <Text c='dimmed' size='xs'>
                Found an issue that needs to be resolved? Add it here.
            </Text>
        </Paper>

        <Paper shadow='sm' withBorder p='lg'>
            <Stack gap='lg'>
            
            <FindingDropZone/>

            <Select
                label="Select Space"
                placeholder="Select the space where the issue was found"
                data={['React', 'Angular', 'Vue', 'Svelte']}
                />
            
            <Textarea
                label="Describe The Issue"
                description="What did you find?"
                placeholder="Example, Spoon was not in correct spot on shadow-board . . ."
                />

            <NewFindingRating/>

            <Button variant='default' maw='fit-content' style={{alignSelf: 'flex-end'}}>
                Submit Finding
            </Button>

            </Stack>

            
        </Paper>
        </Stack>
    )
}