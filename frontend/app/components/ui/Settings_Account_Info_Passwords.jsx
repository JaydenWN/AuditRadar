import {
    Button,
    Stack,
    PasswordInput,

} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useForm } from '@mantine/form'
import { useSubmit } from "@remix-run/react"
import { useEffect } from "react"

export default function Settings_Account_Info({data}){
    const submit = useSubmit()
    const form = useForm({
        initialValues: {
            password: '',
        },

        validate: {
            password:(value) => (/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value) ? null : 'Password must be 12 characters long, contain at least 1 uppercase letter, 1 digit and 1 special character.'),
            passwordValidate: (value) => form.values.password === value ? null : 'Passwords must match'
        }
    })

    useEffect(()=>{
        if(data && data.errorCode === 'P2002'){
            form.setErrors({
                user: 'Username already in use.'
            })
        } 
    },[data])
    const [visible, { toggle }] = useDisclosure(false);

    function handleFormSubmit(values){
            submit(values, {method : 'PATCH', action : '/settings'})
       }

    return(
        <form
            onSubmit={form.onSubmit((values)=>{
               handleFormSubmit(values)
            })}>

            <Stack>
                <PasswordInput
                    label="Password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    {...form.getInputProps('password')}
                    />
                <PasswordInput
                    label="Repeat Password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    {...form.getInputProps('passwordValidate')}
                    />
            <Button
                type='submit'
                variant='default'>
                Change Password
            </Button>
            </Stack>
        </form>
    )
}