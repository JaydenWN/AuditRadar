import { useSubmit } from "@remix-run/react"
import {
    Modal,
    Stack,
    Textarea,
    Group,
    Button,
    TextInput
 } from "@mantine/core"
 import { useForm } from "@mantine/form"

export default function Spaces_Card_Modal_Title({opened, close, id, title}){
    
    const submit = useSubmit()
    const form = useForm({
        initialValues : {
            title : title
        },

        validate : {
            title : (value) => value < 1 ? 'You must enter a new title' : null
        }
    })
    

    async function handleSubmit(title){
        submit({title, id},{
            action : '/findings/edit',
            method: 'PATCH',
            navigate: false
        })
        if(title.length > 1){
            close()
        }
        form.reset()
    }

    return (
        <Modal
            opened={opened}
            onClose={close}
            title = 'Edit Title'>
                <form
                    onSubmit={
                        form.onSubmit((values)=>{
                            handleSubmit(values.title)
                        })
                    }
                    >
                    <Stack>
                    <TextInput
                        title='Edit title'
                        description='Please write a new Title.'
                        {...form.getInputProps('title')}/>
                        
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