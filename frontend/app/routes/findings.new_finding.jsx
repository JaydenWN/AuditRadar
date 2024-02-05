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
import { requireUserId } from '../utils/session.server';
import getUser from '../utils/getUser';
import {useActionData, useFetcher, useLoaderData, useSubmit} from '@remix-run/react'
import {useForm} from '@mantine/form'
import { useEffect, useState } from 'react';
import { IoThumbsDown, IoThumbsDownOutline } from 'react-icons/io5/index.js'
import {prisma}from '../utils/db.server'
import {notifications} from '@mantine/notifications'
import { Prisma } from '@prisma/client';

import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData, writeAsyncIterableToWritable } from '@remix-run/node';

export async function loader({request}){
    await requireUserId(request)

    const user = await getUser(request)

    return {
        spaces : user?.spaces,
    }

}

export async function action({request}){

//ToDo: make sure title is unique. otherwise findFirst wont work
    const data = await request.formData()
    const user = await getUser(request)

    const space = await prisma.space.findFirst({
        where: {
            title: data.get('space'),
            userId: user.id
        }
    })

    const createdFindidng = await prisma.finding.create({
        data: {
            title: data.get('title'),
            image: data.get('imageUrl'),
            description: data.get('description'),
            rating: Number(data.get('rating')),
            resolved: false,
            userId: user.id,
            spaceId: space.id
        }
    }).catch((e) => {
        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            const returnedResponseObj = {
                errorTarget: e.meta?.target?.[0],
                errorCode: e.code,
            }
            return returnedResponseObj;
        } else {
            console.error('Unhandled error during user creation:', e);
            return null
        }
    });

    
    
    return {...createdFindidng, spaceName : space.title}
   
}

export default function NewFinding(){
    const theme = useMantineTheme()
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const handleSubmit = useSubmit()
    const fetcher = useFetcher()
    
    const [rating, setRating] = useState(0)

    const form = useForm({
        initialValues: {
            title : '',
            image : '',
            space : null,
            description: '',
            rating : 0
        },

        validate: {
            title: (value) => (value.length < 1 ? 'You must give this finding a title' : null),
            space: (value) => (value? null : 'You must select a space'),
            description: (value) => (value? null : 'Please give the finding a description'),
        }
    })
//Notifications
    useEffect(()=>{
        if(actionData?.title){
            notifications.show({
                title : 'Created Finding',
                message: `Added Finding: ${actionData.title}, to the space ${actionData.spaceName}, with the rating of ${actionData.rating}.`,
                autoClose : 10000,
                color : "lime"
            })
            //Sends image to s3
            fetch(fetcher.data.signedUrl, {
                method : 'PUT',
                body: form.values.image,
            })
        }
       
        

        actionData?.errorCode ?
        form.setErrors({title : 'Finding Title already in use.'}) : null
        
        actionData ? console.log(actionData) : null
    },[actionData])

//Presigned URLs
    useEffect(()=>{
        if(fetcher.data){
             handleSubmit({...form.values, rating : rating, imageUrl : fetcher.data.dbUrl}, {method : 'post', action : '/findings/new_finding'})            
        }
    },[fetcher.data])
    
    return (
        <Stack gap='lg'>
            
        <Paper shadow='sm' withBorder p='lg'>
            <Text size='xl' fw={600}>
                Submit A New Finding
            </Text>
            <Text c='dimmed' size='xs'>
                Found an issue that needs to be resolved? Add it here.
            </Text>
        </Paper>

        <form
            onSubmit={form.onSubmit(async(values)=>{
                const imageForm = new FormData()
                imageForm.set('type', values.image.type)
                
                    fetcher.submit(imageForm, {method : 'POST', action: '/getPresignedUrl'})
                
            })}>

            <Paper shadow='sm' withBorder p='lg'>
                <Stack gap='lg'>

                <FindingDropZone
                signedURL={loaderData.url}
                 form={form}
                 {...form.getInputProps('image')}/>

                <TextInput
                size="md"
                label='Finding Title'
                description='Give the finding a title'
                placeholder='Example, Grime On Tiled Wall'
                {...form.getInputProps('title')}/>

                <Select
                    size="md"
                    label="Select Space"
                    placeholder="Select the space where the issue was found"
                    data={
                        loaderData?.spaces.map((space)=>(space.title))
                    }
                    {...form.getInputProps('space')}
                    // onChange={(value)=>{setSelectedSpace(value)}}
                    />
                
                <Textarea
                    size="md"
                    label="Describe The Issue"
                    description="What did you find?"
                    placeholder="Example, Spoon was not in correct spot on shadow-board . . ."
                    {...form.getInputProps('description')}
                    />
                 <Box>
                    <Text size='sm' fw={500}>Give the issue a rating</Text>
                    <Text size='xs' c='dimmed'>1 being a low rated problem, 5 being a high rated problem.</Text>

                    {/**BUG WITH MANTINE RATING, SHOULD BE CHANGED LATER */}
                    <Rating
                        value={rating} onChange={(e)=>{setRating(e)}}
                        mt='sm' 
                        emptySymbol={<IoThumbsDownOutline style={{color: theme.colors.gray[7], fontSize: '1.5em'}}/>}
                        fullSymbol={<IoThumbsDown style={{color: theme.colors.red[6], fontSize: '1.5em'}}/>} />
                 </Box>

                <Button 
                    variant='default'
                    maw='fit-content'
                    style={{alignSelf: 'flex-end'}}
                    type='submit'>
                    Submit Finding 
                </Button>
                <Button 
                    variant='default'
                    maw='fit-content'
                    style={{alignSelf: 'flex-end'}}
                    onClick={()=>console.log(form.values)}>
                    x
                </Button>
                </Stack>

                
            </Paper>
        </form>
        </Stack>
    )
}