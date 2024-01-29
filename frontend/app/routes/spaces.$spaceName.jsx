import {ActionIcon,
    Group, 
    Menu, 
    Paper, 
    SimpleGrid, 
    Text, 
    Title, 
    useMantineTheme,
    Modal,
    Button,
    Stack} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useActionData, useLoaderData, useLocation, useSubmit, NavLink} from '@remix-run/react'
import { redirect } from '@remix-run/node';

import Spaces_Card from '../components/ui/Spaces_Card'
import  getUser from '../utils/getUser';
import {prisma} from '../utils/db.server'
import { Prisma } from '@prisma/client';
import {IoEllipsisVertical, IoTrashOutline, IoDocumentTextOutline} from "react-icons/io5/index.js";
import Spaces_Edit_Modal from '../components/ui/Spaces_Edit_Modal';
import { useEffect, useState } from 'react';
import { requireUserId } from '../utils/session.server';

export async function action({request, params}){
    const res = await request.formData()


    if(request.method === 'PATCH'){
        return await prisma.space.update({
            where : {
                id : Number(res.get('spaceId')),
                title : params.spaceName
            },
            data : {
                title : res.get('title')
            }
        }).then(()=>redirect(`/spaces/${res.get('title')}`))
        .catch((e)=>{
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
        })
    }

    if(request.method === 'DELETE'){
        return await prisma.space.delete({
            where: {
                id : Number(res.get('id')),
                title : params.spaceName
            }
        }).then(()=>redirect('/'))
    }
    
}

export async function loader({request, params}){
    await requireUserId(request)
    const user = getUser(request)
    

    const foundSpace = await prisma.space.findFirst({
        where : {
            userId : user.id,
            title : params.spaceName
        },
        include : {
            Finding : true
        }
    })

    return foundSpace

}
export default function Room(){
    const currentSpace = useLoaderData()
    const actionData = useActionData()      
    const theme = useMantineTheme()
    const [opened, { open, close }] = useDisclosure();
    const [errors, setErrors] = useState()
    const submit = useSubmit()
    const location = useLocation()

    
    useEffect(()=>{
        if(actionData === undefined){
            close()
        }
        setErrors(actionData)
    },[location])


    return(
        <>
        <Modal opened={opened} onClose={close} title={`Change Name for ${currentSpace.title}`}>
            <Spaces_Edit_Modal 
                title={currentSpace.title} 
                close={close} 
                spaceId={currentSpace.id}
                errors={errors}
                />
        </Modal>

        <Group justify='space-between' p="md">
                <Title fw={600} order={2}>{currentSpace.title}</Title>
                <Menu position="left-start">
                    <Menu.Target>
                        <ActionIcon variant='default'>
                            <IoEllipsisVertical/>
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                    <Menu.Item 
                    leftSection={<IoDocumentTextOutline/>}
                    onClick={open}>
                            Edit Space Name
                        </Menu.Item>
                        <Menu.Item 
                            leftSection={<IoTrashOutline />} 
                            style={{color: theme.colors.red[9]}}
                            onClick={()=>{
                                submit({id : currentSpace.id},{
                                    method : "DELETE",
                                })
                            }}>
                            Delete Space
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                </Group>
                
        <Paper withBorder p='lg'>
            <Group justify='center'>
            <SimpleGrid cols={{base: 1, sm: 2, md : 3, lg: 4}}>
                {currentSpace.Finding.length > 0 ? currentSpace.Finding.map((finding)=>(

                    <Spaces_Card
                        title={finding.title}
                        rating={finding.rating}
                        description={finding.description}
                        key={finding.title}
                        id={finding.id}
                        resolved={finding.resolved}
                    />
                )) 
                : 
                <Stack>
                    <Text>No Findings for this Space!</Text>
                    <Button 
                        maw='fit-content'
                        variant="default"
                        rightSection='+'
                        component={NavLink}
                        to='/findings/new_finding'>Add a new finding
                    </Button>
                </Stack>}
            </SimpleGrid>
            </Group>
        </Paper>
        </>
    )
}