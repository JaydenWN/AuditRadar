import { useEffect, useState } from 'react'
import LoginCard from '../components/ui/Login_Card'
import { useActionData } from '@remix-run/react'
import { redirect } from '@remix-run/node'

import{
    Group,
    Text,
    Button,
    Stack,
    Paper
}from '@mantine/core'

import {prisma} from '../utils/db.server'
import SignupCardMantine from '../components/ui/Signup_Card_Mantine'
import { notifications } from '@mantine/notifications'
import { Prisma } from '@prisma/client'
import bcrypt from "bcryptjs";
import { getSession, commitSession, requireUserId } from '../utils/session.server'

export async function action({request}){

    const data = await request.formData()

    const cardType = data.get('cardType')
//Handles sign-up request
    if(cardType === 'sign-up'){
        const hashedPassword = await bcrypt.hash(data.get('password'), 10)

        const userInput = {
            email : data.get('email'),
            username : data.get('username'),
            password : hashedPassword
        }
    
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
    //Handles Login request
    if(cardType === 'sign-in'){
        
        const userInput = {
            email : data.get('email'),
            password : data.get('password')
        }

        try{
           const user = await prisma.user.findUnique({
                where : {
                    email : userInput.email
                }
            })
            

            if(user){
                const dcryptPass = await bcrypt.compare(userInput.password, user.password)
                if(dcryptPass){
                    //log in successful
                    const session = await getSession(request.headers.get('Cookie'))

                    session.set('UserId', user.id)

                    return redirect('/',{
                        headers: {
                            'Set-Cookie' : await commitSession(session, {
                                maxAge: 60 * 60 * 24 * 7 // 7 days,
                            })
                        }
                    })

                }else{
                    //Wrong password
                    const returnedResponseObj={
                        cardState: false,
                        title : 'Wrong Email or Password.',
                        message: 'Please try again'
                    }
                    return returnedResponseObj
                }
            }else{
                //wrong email
                const returnedResponseObj={
                    cardState: false,
                    title : 'Wrong Email or Password',
                    message: 'Please try again'
                }
                return returnedResponseObj
            }
        }catch(e){
            console.log(e)
        }   
    }
    return null
}

export async function loader({request}){
  
   return null
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
            <Stack ml={{'sm': -250}} align='center' gap='xl' py='md'>
            <Paper>
            <Text size='xl' fw='600'>
                Looks like you are not signed in.
            </Text>
            <Text size='lg' fw='400'>
                 Please Log in or sign up to continue.
            </Text>
            </Paper>
            
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
                </Stack>
            </>
        )
    }

    if(cardChanged){
        return(
            <>
            <Stack ml={{'sm': -250}} align='center' gap='xl' py='md'>
            <Paper>
            <Text size='xl' fw='600'>
                Looks like you are not signed in.
            </Text>
            <Text size='lg' fw='400'>
                 Please Log in or sign up to continue.
            </Text>
            </Paper>
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
                </Stack>
            </>
        )
    }
    
}