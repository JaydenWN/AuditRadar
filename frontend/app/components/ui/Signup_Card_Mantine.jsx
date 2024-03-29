import { useForm,  isEmail } from '@mantine/form';
import {Stack, Fieldset, TextInput, PasswordInput, Group, Button} from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { useEffect } from 'react';

export default function SignupCardMantine({actionData}){

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (/^[^0-9 ][A-Za-z][A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(value) ? null :  'Username must be 2 alphabetical characters long, not start with a number, space, end with a space.' ),
           email : isEmail('Invalid Email'),
           password : (value) => (/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value) ? null : 'Password must be 12 characters long, contain at least 1 uppercase letter, 1 digit and 1 special character.')
        }
    })

    //When actionData is gathered from '/login' it is passed to this component via props, then we can setErrors on our signup form.
    useEffect(()=>{
        console.log(actionData)
        if(actionData?.errorTarget === 'email' && actionData?.errorCode === 'P2002'){
            form.setErrors({email: 'Email must be unique. Someone has already signed up with that email.'})
        }
        
        if(actionData?.errorTarget === 'username' && actionData?.errorCode === 'P2002'){
            form.setErrors({username: 'Someone has already claimed that Username. Please choose a new one.'})
        }
    },[actionData])

   const handleSubmit = useSubmit()

   function handleFormSubmit(values){
    const valueAndType = {...values, cardType : 'sign-up'}
        handleSubmit(valueAndType, {method : 'post'})
   }

    return(
            <Stack w={{base: '100%', sm: '50%', lg: '30%'}}>
                <Fieldset legend="Signup">
                    <form 
                        action='/login' 
                        method='post'
                        onSubmit={form.onSubmit((values)=>{
                            
                            handleFormSubmit(values)
                            
                        })}>
                
                        <TextInput
                        size="md"
                        label="Your Email"
                        placeholder="myaddress@email.com"
                        {...form.getInputProps('email')}
                        />

                        <TextInput
                            size="md"
                            mt="md"
                            label="Username"
                            placeholder="What should we call you?"
                            {...form.getInputProps('username')}
                        />

                        <PasswordInput
                            size="md"
                            mt="md"
                            label="Your Password"
                            placeholder="Input your password"
                            {...form.getInputProps('password')}
                        />
                        <Group justify="flex-end">
                            <Button mt='lg' variant="default" type="submit">Submit</Button>
                        </Group>
                   
                    </form>
                </Fieldset>
            </Stack>
    )
}