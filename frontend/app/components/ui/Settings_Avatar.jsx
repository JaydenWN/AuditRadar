import {
    Paper,
    Stack,
    Title,
    Avatar,
    FileInput,
    Group,
    Button
} from '@mantine/core'

import { useForm } from '@mantine/form';

import classes from './styles/settings.module.css'
import { useFetcher, useSubmit } from '@remix-run/react';
import { useEffect } from 'react';

export default function Settings_Avatar({avatar}){

    const form = useForm({
        validate : {
            avatar : (value) => value ? null : 'Must select an image to upload as your avatar.'
        }
    })

    const fetcher = useFetcher()
    const handleSubmit = useSubmit()
    
    //Presigned URLs
    useEffect(()=>{
        if(fetcher.data){

            fetch(fetcher.data.signedUrl, {
                method : 'PUT',
                body: form.values.avatar,
            })

             handleSubmit({imageUrl : fetcher.data.dbUrl}, {method : 'post', action : '/settings'})            
        }
    },[fetcher.data])

    return(
        <form onSubmit={form.onSubmit((values)=>{
            const avatarData = new FormData()
            avatarData.set('key', values.avatar.type)

            fetcher.submit(avatarData, {method : 'POST', action: '/getPresignedUrl'})
        })}>
            <Paper shadow="sm" p="xl" withBorder>
                <Stack gap='lg'  className={classes.smCenter}>
                        <Title order={2}>
                            Change Your Avatar
                        </Title>
                    <Group  className={classes.smCenter}>
                        <Avatar variant="light" radius="xl" size="lg" src={avatar}  />
                        <FileInput
                            label="Upload Image"
                            description="Upload a jpeg/png image to use as your new avatar"
                            placeholder="..."
                            accept="image/png,image/jpeg"
                            {...form.getInputProps('avatar')}
                            />
                    </Group>
                    <Button type='submit' variant='default'>Upload</Button>
                </Stack>
            </Paper>
        </form>
    )
}