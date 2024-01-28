import {
    Paper,
    Stack,
    Text,
    Title,
    TextInput,
    PasswordInput
} from "@mantine/core"

import Settings_Account_Info_Username from "./Settings_Account_Info_Username";
import Settings_Account_Info_Passwords from "./Settings_Account_Info_Passwords";

export default function Settings_Account_Info({data}){
    
    return(
        <Paper shadow="sm" p="xl" withBorder>
                        <Stack gap='xs'>
                            <Title order={2}>Account Information</Title>
                            <Settings_Account_Info_Username data={data}/>
                            <Settings_Account_Info_Passwords/>
                            
                        </Stack>
        </Paper>
    )
}