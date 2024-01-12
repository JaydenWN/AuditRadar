import { 
    Paper,
    Text,
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Card,
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
        
                
                <Group pt='md' justify="flex-end">
                    <Text c='dimmed'>
                        Don't have an account?
                    </Text>
                    <Button
                        variant="default"
                        size="xs">
                            Sign up
                    </Button>
                </Group>
               
            
            
            </Stack>
      
    )
}