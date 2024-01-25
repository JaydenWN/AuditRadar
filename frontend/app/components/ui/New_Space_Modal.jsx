import { Button, FileInput, Modal,  Stack, TextInput, } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSubmit, useRouteActionData, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

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
    const fetcher = useFetcher()
    function getSpaceTitles(formdata){
        fetcher.submit(formdata, {method : 'POST', action: '/newspace'})
    }
    //Todo : Users can create space using uppercase or lowercase, example;
    // Can have both 'Kitchen' and 'kitchen'.
    useEffect(()=>{
        console.log(fetcher.data)
        const { errorCode, errorTarget, title } = fetcher.data.createdSpace
        if(errorTarget === 'title' && errorCode === 'P2002'){
            form.setErrors({title : 'That space name is already in use.'})
        }

        if(title){
            notifications.show({
                title: `Created the space ${title}.`,
                message : 'You can now add findings to this space.'
            })
        }
    },
    [fetcher.data])

    const handleSubmit = useSubmit()

    return(
        <Modal opened={opened} onClose={close} title='Create A New Space'>
            <form
                action='/newspace' 
                method='post'
                onSubmit={form.onSubmit((values)=>{
                    getSpaceTitles(values)
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

