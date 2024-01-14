import { 
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Fieldset
 } from "@mantine/core";



export default function LoginCard(){
    return(
            <Stack>
                <Fieldset legend="Login">
                    <TextInput
                    label="Your email"
                    placeholder="myaddress@email.com"
                    />
                    <PasswordInput
                        mt="md"
                        label="Your Password"
                        placeholder="input your password"
                    />
                    <Group justify="flex-end">
                        <Button mt='lg' variant="default">Log in</Button>
                    </Group>
                </Fieldset>
            </Stack>
    )
}