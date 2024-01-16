import { useEffect, useState } from 'react'
import LoginCard from '../components/ui/Login_Card'
import { json, redirect, useActionData } from '@remix-run/react'

import{
    Group,
    Text,
    Button
}from '@mantine/core'
import SignupCard from '../components/ui/Signup_Card'

import {prisma} from '../utils/db.server'
import SignupCardMantine from '../components/ui/Signup_Card_Mantine'
import { notifications } from '@mantine/notifications'
import { Prisma } from '@prisma/client'

export async function action({request}){
    const data = await request.formData()

    const userInput = {
        email : data.get('email'),
        username : data.get('username'),
        password : data.get('password')
    }

    console.log(userInput)
   
    return prisma.user
        .create({
            data: {
                email: userInput.email,
                username: userInput.username,
                password: userInput.password
            },
        })
        .then((user) => {
            console.log(`Added ${userInput.username} to the user table.`);

            const returnedResponseObj = {
                cardState: false,
                title: `Welcome ${user.username}`,
                message: 'Your Account was successfully created. Please now sign-in with your credentials. Happy Auditing! 😊'
            };

            return returnedResponseObj;
        })
        .catch((e) => {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
               
                const returnedResponseObj = {
                    cardState: true,
                    errorTarget: e.meta?.target?.[0],
                    errorCode: e.code,
                }
                return returnedResponseObj;
            } else {
                console.error('Unhandled error during user creation:', e);
                return null
            }
        });
}

export default function LoginPage(){

    const actionData = useActionData()
    const [cardChanged, setCardChanged] = useState(false)

    useEffect(()=>{
        if(actionData !== undefined){
        setCardChanged(actionData.cardState)
        
        if(actionData?.title){
            notifications.show({
                title :  actionData.title,
                message : actionData.message
             })
        }
        

        }
    },[actionData])
   
    
    function handleCardChange(){
        setCardChanged(!cardChanged)
    }

    if(!cardChanged){
        return(
            <>
                <LoginCard/>
                <Group pt='md' justify="flex-end">
                        <Text c='dimmed'>
                            Don't have an account?
                        </Text>
                        <Button
                            onClick={()=>handleCardChange()}
                            variant="default"
                            size="xs">
                                Sign up
                        </Button>
                </Group>
            </>
        )
    }

    if(cardChanged){
        return(
            <>
                <SignupCardMantine 
                    actionData={actionData}/>
                <Group pt='md' justify="flex-end">
                        <Text c='dimmed'>
                            Already have an account?
                        </Text>
                        <Button
                            onClick={()=>handleCardChange()}
                            variant="default"
                            size="xs">
                                Sign in
                        </Button>
                </Group>
            </>
        )
    }
    
}