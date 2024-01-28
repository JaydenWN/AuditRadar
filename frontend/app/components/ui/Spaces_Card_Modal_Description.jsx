import { useSubmit } from "@remix-run/react"
import {
    Modal,
    Stack,
    Textarea,
    Group,
    Button
 } from "@mantine/core"
 import { useForm } from "@mantine/form"

export default function Spaces_Card_Modal_Description({opened, close, id, description}){
    
    const submit = useSubmit()
    const form = useForm({
        initialValues : {
            description : description
        },

        validate : {
            description : (value) => value < 1 ? 'You must have a description' : null
        }
    })
    

    async function handleSubmit(description){
        submit({description, id},{
            action : '/findings/edit',
            method: 'PATCH',
            navigate: false
        })
        if(description.length > 1){
            close()
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={close}
            title = 'Edit Description'>
                <form
                    onSubmit={
                        form.onSubmit((values)=>{
                            handleSubmit(values.description)
                        })
                    }
                    >
                    <Stack>
                    <Textarea
                        title='Edit Description'
                        description='Please write a new description.'
                        {...form.getInputProps('description')}/>
                        
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