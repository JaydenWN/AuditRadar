import {
    Paper,
    Stack,
    Title,
    Avatar,
    FileInput,
    Group,
    Button,
    Skeleton
} from '@mantine/core'

import { useForm } from '@mantine/form';

import classes from './styles/settings.module.css'
import { useFetcher, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function Settings_Avatar({avatar, imageLoading, setImageLoading}){
    const [currentImg, setCurrentImage] = useState(avatar)

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
            setImageLoading(true)
            fetch(fetcher.data.signedUrl, {
                method : 'PUT',
                body: form.values.avatar,
            }).then(async(res)=>{
                if(res.ok === true){
                    setCurrentImage(res.url.split('?')[0])
                    setImageLoading(false)
                }
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
                    {imageLoading ? <Skeleton height={50} circle mb="xl" /> :
                        <Avatar variant="light" radius="xl" size="lg" src={currentImg}  />}
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