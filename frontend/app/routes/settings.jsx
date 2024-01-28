import {
    Stack, 
    Title, 
    Box, 
    Text, 
    Paper, 
    Avatar, 
    Group, 
    FileInput, 
    Switch,
    useMantineTheme,
    rem,
    useMantineColorScheme,
    useComputedColorScheme,
    Skeleton,
    Button
} from '@mantine/core'

import styles from '../components/ui/styles/colorScheme.module.css'
import classes from '../components/ui/styles/settings.module.css'
import bcrypt from "bcryptjs";
import { useEffect, useState } from 'react';
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5/index.js";
import cx from 'clsx'
import { requireUserId } from '../utils/session.server';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import Settings_Account_Info from '../components/ui/Settings_Account_Info';
import getUser from '../utils/getUser'
import { Prisma } from '@prisma/client';
import { prisma } from '../utils/db.server';
import { notifications } from '@mantine/notifications';


export async function action({request}){
    const data = await request.formData()
    const user = await getUser(request)

    if(data.get('user')){
    const updatedUsername = await prisma.user.update({
        where : {
            id : user.id
        },
        data : { 
            username : data.get('user')
        }
    }).catch((e) => {
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
    delete updatedUsername.password
    return updatedUsername
    }
    if(data.get('password')){
        const hashedPassword = await bcrypt.hash(data.get('password'), 10)

        const updatedPassword = await prisma.user.update({
            where : {
                id : user.id
            },
            data : { 
                password : hashedPassword
            }
        }).catch((e) => {
           console.log(e)
        })
        delete updatedPassword.username
        return updatedPassword
        }
    
}

export async function loader({request}){
  await requireUserId(request)
  const user = getUser(request)
  return user
}
export default function Settings(){

    const actionData = useActionData()
    const userData = useLoaderData()

    useEffect(()=>{
        if(actionData){
            console.log(actionData)
            if(actionData.username){ 
                notifications.show({
                title: 'Username changed',
                message: `Successfully changed your username to ${actionData.username}! 😎 `,
                color: 'lime'
            })}
            if(actionData.password){ 
                notifications.show({
                title: 'Password Updated',
                message: `Successfully changed your password `,
                color: 'lime'
            })}
        }
    },[actionData])
    
    const theme = useMantineTheme();
    const { setColorScheme, } = useMantineColorScheme();
    
    const computedColorScheme = useComputedColorScheme('light',  { getInitialValueInEffect: true });

    const sunIcon = (<IoSunnySharp
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
      className={cx(styles.light)}
      />)

    const moonIcon = (<IoMoonSharp
        style={{ width: rem(16), height: rem(16) }}
        stroke={2.5}
        color={theme.colors.blue[6]}
        className={cx(styles.dark)}
        />)
    
    const [color, setColor] = useState()

    function handleActive(){
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
        setColor(computedColorScheme === 'light' ? false : true)
    }

    useEffect(()=>{
        setColor(computedColorScheme === 'light' ? false : true)
    },[color])

    return (
        <Box component={Stack} m={{xs: 'xs', sm: 'sm', md: 'md' }} >

            <Paper shadow="sm" p={{base : 'lg', md:'xl'}} withBorder>
                
                    <Group className={classes.smCenter} >
                    <Avatar variant="light" radius="xl" size="lg" src="" className={classes.avatar}/>
                        <Stack  gap='xs' className={classes.smCenter}>
                            <Title order={2} align='center'>User Settings for {userData.username}</Title>
                            <Text size="sm">You can change your preferences here.</Text>
                        </Stack>
                    </Group>
                
            </Paper>

            <Paper shadow="sm" p={{base : 'lg', md:'xl'}} withBorder>
                
                    <Group className={classes.smCenter} align='center' justify='space-between' >
                        
                            <Title order={2}>Logout</Title>
                            <Form action='/logout' method='post'>
                                <Button variant='default' type='submit'>Sign me out</Button>
                            </Form>
                    </Group>
                
            </Paper>

            <Settings_Account_Info data={actionData}/>

            <Paper shadow="sm" p="xl" withBorder>
                <Stack gap='lg'  className={classes.smCenter}>
                        <Title order={2}>
                            Change Your Avatar
                        </Title>
                    <Group  className={classes.smCenter}>
                        <Avatar variant="light" radius="xl" size="lg" src="" />
                        <FileInput
                            label="Upload Image"
                            description="Upload an image to use as your new avatar"
                            placeholder="..."
                            />
                    </Group>
                </Stack>
            </Paper>

            {/*Needed to wait for computedColorScheme to return
            something other than undefined, otherwise run into
            hydration issues*/}

            {color === undefined ? 
            <Skeleton height={101.09}/> 
            :
            <Paper shadow="sm" p="xl" withBorder>
                <Group justify='space-between'  className={classes.smCenter}>
                <Title order={2}>Toggle Theme Mode</Title>
                <Switch 
                size='lg'
                onLabel={sunIcon}
                offLabel={moonIcon}
                onClick={()=>handleActive()}
                defaultChecked={color}
                />
                </Group>
            </Paper>}
        
        </Box>
    )
}