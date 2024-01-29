import { Button, Group, Stack, TextInput } from "@mantine/core";
import {useForm} from '@mantine/form'
import { useSubmit } from "@remix-run/react";
import { useEffect } from 'react';
export default function Spaces_Edit_Modal({title, close, spaceId, errors}){
    const form = useForm({
        initialValues : {
            title : title
        },
        validate : {
            title : (value) => value.length > 0 ? null : 'Space Must have a name.'
        }
    })

    const submit = useSubmit()
    useEffect(()=>{
       console.log(errors)
       if(errors){
        
            if(errors.errorTarget === 'title' && errors.errorCode ==='P2002'){
                form.setErrors({title: 'Space Name must be unique.'})
            }
       } 

    },[errors])
    
    return(
        <form
            action={`/spaces/${title}`}
            method="POST"
            onSubmit={
                form.onSubmit((values)=>{
                    submit({...values, spaceId}, {method: 'PATCH', action: `/spaces/${title}`})
                    form.reset()
                })
            }
            
           >
            <Stack p='sm'>
                <TextInput
                size="md"
                label="Edit Space Name"
                placeholder={title}
                description="Input a new name for this Space."
                {...form.getInputProps('title')}
                />
                <Group justify="space-between">
                    <Button
                        variant="light"
                        color="red"
                        onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        type="submit"
                        >
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}