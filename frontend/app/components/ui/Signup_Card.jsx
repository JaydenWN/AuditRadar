import { 
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Fieldset
 } from "@mantine/core";
import { useState } from "react";
import {Form} from '@remix-run/react'

import HiddenInputControl from "../HiddenInputControl";

export default function SignupCard(){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    return(
            <Stack>
                <Fieldset legend="Signup">
                    <Form action='/login' method='post'>
                        <HiddenInputControl name='email' value={email}/>
                        <HiddenInputControl name='username' value={username}/>
                        <HiddenInputControl name='password' value={password}/>
                    <TextInput
                    label="Your Email"
                    placeholder="myaddress@email.com"
                    onChange={(e)=> setEmail(e.currentTarget.value)}
                    />

                    <TextInput
                        mt="md"
                        label="Username"
                        placeholder="What should we call you?"
                        onChange={(e)=> setUsername(e.currentTarget.value)}
                    />

                    <PasswordInput
                        mt="md"
                        label="Your Password"
                        placeholder="Input your password"
                        onChange={(e)=> setPassword(e.currentTarget.value)}
                    />
                    <Group justify="flex-end">
                        <Button mt='lg' variant="default" type="submit">Submit</Button>
                    </Group>
                   
                    </Form>
                </Fieldset>
            </Stack>
    )
}