import { 
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Fieldset
 } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSubmit } from "@remix-run/react";



export default function LoginCard(){
    
    const form = useForm({
        initialValues: {
            email : '',
            password : ''
        }
    })
    const handleSubmit = useSubmit()
    
    function handleFormSubmit(values){
        const valueAndType = {...values, cardType : 'sign-in'}
            handleSubmit(valueAndType, {method : 'post'})
       }

    return(
            <Stack>
                <form 
                    action='/login' 
                    method='post'
                    onSubmit={form.onSubmit((values)=>{
                        handleFormSubmit(values)
                        })}>

                <Fieldset legend="Login">

                    <TextInput
                    label="Your Email"
                    placeholder="myaddress@email.com"
                    {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        mt="md"
                        label="Your Password"
                        placeholder="input your password"
                        {...form.getInputProps('password')}
                    />
                    <Group justify="flex-end">
                        <Button mt='lg' variant="default" type="submit">Log in</Button>
                    </Group>
                </Fieldset>
                </form>
            </Stack>
    )
}