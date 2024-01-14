import { useState } from 'react'
import LoginCard from '../components/ui/Login_Card'
import { json, useActionData } from '@remix-run/react'

import{
    Group,
    Text,
    Button
}from '@mantine/core'
import SignupCard from '../components/ui/Signup_Card'

import {prisma} from '../utils/db.server'
import SignupCardMantine from '../components/ui/Signup_Card_Mantine'

export async function action({request}){
    const data = await request.formData()

    const userInput = {
        email : data.get('email'),
        username : data.get('username'),
        password : data.get('password')
    }

    const user = await prisma.user.create({
        data: {
          email: userInput.email,
          username: userInput.username,
          password : userInput.password
        },
      })
    
    console.log(`Added ${user} to the user table.`)
    return null
}

export default function LoginPage(){

    const [cardChanged, setCardChanged] = useState(false)
    
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
                <SignupCardMantine changeCard={setCardChanged} />
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