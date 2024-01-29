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
            user: (value) => (/^[^0-9 ][A-Za-z][A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(value) ? null :  'Username must be 2 alphabetical characters long, not start with a number, space, end with a space.' ) 
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
                size="md"
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