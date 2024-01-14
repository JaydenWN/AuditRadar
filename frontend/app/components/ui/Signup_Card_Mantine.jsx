import { useForm } from '@mantine/form';
import {Stack, Fieldset, TextInput, PasswordInput, Group, Button} from '@mantine/core';
import { useSubmit } from '@remix-run/react';

export default function SignupCardMantine({changeCard}){
    
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (/^ [A-Za-z]{2} .* [A-Za-z]{2} $/.test(value) ? 'Username must be 2 alphabetical characters long, not start with a space, end with a space, or contain more than two spaces.' : null),
           email : (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
           password : (value) => (/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value) ? null : 'Password must be 12 characters long, contain at least 1 uppercase letter, 1 digit and 1 special character.')
        }
    })

   const handleSubmit = useSubmit()

    return(
            <Stack>
                <Fieldset legend="Signup">

                    <form 
                        action='/login' 
                        method='post'
                        onSubmit={form.onSubmit((values)=>{
                            changeCard(false)
                            handleSubmit(values, {method: 'post'})
                        })}>
                
                        <TextInput
                        label="Your Email"
                        placeholder="myaddress@email.com"
                        {...form.getInputProps('email')}
                        />

                        <TextInput
                            mt="md"
                            label="Username"
                            placeholder="What should we call you?"
                            {...form.getInputProps('username')}
                        />

                        <PasswordInput
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