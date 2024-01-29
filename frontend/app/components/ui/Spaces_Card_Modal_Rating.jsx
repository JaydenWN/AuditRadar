import { 
    Modal, 
    Stack, 
    Rating,
    useMantineTheme, 
    Text,
    Group,
    Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSubmit } from "@remix-run/react";
import { IoThumbsDown, IoThumbsDownOutline } from 'react-icons/io5/index.js'
export default function Spaces_Card_Modal_Rating({opened, close, id}){
    const theme = useMantineTheme()
    const submit = useSubmit()
    const form = useForm()

    function handleSubmit(rating){
        submit({rating, id},{
            action : '/findings/edit',
            method: 'PATCH',
            navigate: false
        })
        rating ? close() : null
    }
    
    return(
        <Modal
            opened={opened}
            onClose={close}
            title='Edit Rating'>
                <form
                    onSubmit={
                        form.onSubmit((values)=>{
                            handleSubmit(values.rating)
                        })
                    }>
                    <Stack>
                    <Text size='sm'>Give the issue a rating</Text>
                    <Text size='xs' c='dimmed'>1 being a low rated problem, 5 being a high rated problem.</Text>
                    <Rating 
                        size='xl'
                        emptySymbol={<IoThumbsDownOutline style={{color: theme.colors.gray[7], }}/>}
                        fullSymbol={<IoThumbsDown style={{color: theme.colors.red[6],}}/>}
                        {...form.getInputProps('rating')} />
                    <Group justify='space-between'>
                        <Button
                            variant='outline'
                            color='red'
                            onClick={close}>
                                Cancel
                        </Button>
                        <Button
                            variant='default'
                            type='submit'>
                                Submit
                        </Button>
                    </Group>
                    </Stack>
                    </form>
        </Modal>
    )
}