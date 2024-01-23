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
import {useActionData, useLoaderData, useSubmit} from '@remix-run/react'
import {useForm} from '@mantine/form'
import { useEffect, useState } from 'react';
import { IoThumbsDown, IoThumbsDownOutline } from 'react-icons/io5/index.js'
import {prisma}from '../utils/db.server'
import {notifications} from '@mantine/notifications'
import { Prisma } from '@prisma/client';

export async function loader({request}){
    try{
        const user = await getUser(request)
        return {
          spaces : user?.spaces
        }
       
      }catch{
        return await requireUserId(request)
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
            image: '',
            description: data.get('description'),
            rating: Number(data.get('rating')),
            resolved: false,
            userId: user.id,
            spaceId: space.id
        }
    }).catch((e) => {
        //to do handle if title is not unique err handling
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            const returnedResponseObj = {
                errorTarget: e.meta?.target?.[0],
                errorCode: e.code,
            }
            console.log(returnedResponseObj)
            return returnedResponseObj;
        } else {
            console.error('Unhandled error during user creation:', e);
            return null
        }
    });

    console.log({...createdFindidng, spaceName : space.title})

    return {...createdFindidng, spaceName : space.title}
   
}

export default function NewFinding(){
    const theme = useMantineTheme()
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const handleSubmit = useSubmit()
    
    const [rating, setRating] = useState(0)

    useEffect(()=>{
        actionData?
        notifications.show({
            title : 'Created Finding',
            message: `Added Finding: ${actionData.title}, to the space ${actionData.spaceName}, with the rating of ${actionData.rating}.`,
            autoClose : 10000,
            color : "lime"
        }): null
    },[actionData])
        

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
            onSubmit={form.onSubmit((values)=>{
                const formValues = {...values, rating : rating}
                handleSubmit(formValues, {method : 'post', action : '/findings/new_finding'})
                form.reset()
            })}>

            <Paper shadow='sm' withBorder p='lg'>
                <Stack gap='lg'>

                <FindingDropZone
                 {...form.getInputProps('image')}/>

                <TextInput
                label='Finding Title'
                description='Give the finding a title'
                placeholder='Example, Grime On Tiled Wall'
                {...form.getInputProps('title')}/>

                <Select
                    label="Select Space"
                    placeholder="Select the space where the issue was found"
                    data={
                        loaderData?.spaces.map((space)=>(space.title))
                    }
                    {...form.getInputProps('space')}
                    // onChange={(value)=>{setSelectedSpace(value)}}
                    />
                
                <Textarea
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

                </Stack>

                
            </Paper>
        </form>
        </Stack>
    )
}