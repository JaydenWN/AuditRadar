import { Button, FileInput, Modal,  Stack, TextInput, } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSubmit } from "@remix-run/react";
import { useState } from "react";

import { IoCloudUploadOutline } from "react-icons/io5/index.js";

export default function NewSpaceModal({opened, close, open}){
    const [value, setValue] = useState()

    const form = useForm({
        initialValues: {
            title : '',
            image : ''
        },

        validate: {
            title: (value) => (value.length < 1 ? 'Space must have a title' : null)
        }
    })

    const handleSubmit = useSubmit()

    return(
        <Modal opened={opened} onClose={close} title='Create A New Space'>
            <form
                action='/newspace' 
                method='post'
                onSubmit={form.onSubmit((values)=>{
                    handleSubmit(values, {method : 'post', action : '/newspace', navigate: false})
                })}>
                <Stack>
                    <TextInput
                    label='Space Name'
                    description='Give a name for this space'
                    placeholder='Example : Kitchen'
                    {...form.getInputProps('title')}
                    />
                    <FileInput
                    leftSection={<IoCloudUploadOutline/>}
                    label='Upload an image'
                    placeholder='Image of New Space'
                    value={value}
                    onChange={setValue}
                    {...form.getInputProps('image')}
                    />
                    <Button type="submit" variant="default">Submit</Button>
                </Stack>
            </form>
        </Modal>
    )
}

