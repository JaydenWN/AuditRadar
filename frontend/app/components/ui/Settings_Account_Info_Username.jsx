import {
    Button,
    Stack,
    TextInput,

} from "@mantine/core"
import { useForm } from '@mantine/form'
import { useSubmit } from "@remix-run/react"
import { useEffect } from "react"

export default function Settings_Account_Info_Username({data}){
    const submit = useSubmit()
    const form = useForm({
        initialValues: {
            user: '',
        },

        validate: {
            user: (value) => /^(?!.*\s{2,})[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]$/.test(value) ? null : 'Username must be 2 alphabetical characters long, not start with a space, end with a space, or contain more than two spaces.' 
        }
    })
    useEffect(()=>{
        if(data && data.errorCode === 'P2002'){
            form.setErrors({
                user: 'Username already in use.'
            })
        } 
    },[data])

    function handleFormSubmit(values){
            submit(values, {method : 'Patch', action : '/settings'})
       }

    return(
        <form
            onSubmit={form.onSubmit((values)=>{
               handleFormSubmit(values)
            })}>

            <Stack>
            <TextInput
                label='Username'
                description= 'Change your username'
                placeholder='John Doe'
                {...form.getInputProps('user')}
            />
            <Button
                type='submit'
                variant='default'>
                Update Username
            </Button>
            </Stack>
        </form>
    )
}