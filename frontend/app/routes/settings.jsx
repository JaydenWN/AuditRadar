import {
    Stack, 
    Title, 
    Box, 
    Text, 
    Paper, 
    TextInput, 
    PasswordInput, 
    Avatar, 
    Group, 
    FileInput, 
    Switch,
    useMantineTheme,
    rem,
    useMantineColorScheme,
    useComputedColorScheme,
    Skeleton,
} from '@mantine/core'

import styles from '../components/ui/styles/colorScheme.module.css'
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5/index.js";
import cx from 'clsx'

export default function Settings(){
    const [visible, { toggle }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { setColorScheme, } = useMantineColorScheme();
    
    const computedColorScheme = useComputedColorScheme('light',  { getInitialValueInEffect: true });

    const sunIcon = (<IoSunnySharp
        style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
      className={cx(styles.light)}
      />)

    const moonIcon = (<IoMoonSharp
        style={{ width: rem(16), height: rem(16) }}
        stroke={2.5}
        color={theme.colors.blue[6]}
        className={cx(styles.dark)}
        />)
    
    const [color, setColor] = useState()

    function handleActive(){
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
        setColor(computedColorScheme === 'light' ? false : true)
    }

    useEffect(()=>{
        
        setColor(computedColorScheme === 'light' ? false : true)
        console.log(color)
        
    },[color])

    return (
        <Box component={Stack} m='md' >

            <Paper shadow="sm" p="xl" withBorder>
                
                    <Group >
                    <Avatar variant="light" radius="xl" size="lg" src="" />
                        <Stack gap='xs'>
                            <Title order={2}>User Settings for User</Title>
                            <Text size="sm">You can change your preferences here.</Text>
                        </Stack>
                    </Group>
                
            </Paper>

            <Paper shadow="sm" p="xl" withBorder>
                <Stack gap='xs'>
                    <Title order={2}>Account Information</Title>
                    <TextInput
                        label='Username'
                        description= 'Change your username'
                        placeholder='John Doe'
                    />
                    <PasswordInput
                        label="Password"
                        defaultValue="secret"
                        visible={visible}
                        onVisibilityChange={toggle}
                    />
                    
                </Stack>
            </Paper>

            <Paper shadow="sm" p="xl" withBorder>
                <Stack gap='lg'>
                        <Title order={2}>
                            Change Your Avatar
                        </Title>
                    <Group>
                        <Avatar variant="light" radius="xl" size="lg" src="" />
                        <FileInput
                            label="Upload Image"
                            description="Upload an image to use as your new avatar"
                            placeholder="..."
                            />
                    </Group>
                </Stack>
            </Paper>

            {/*Needed to wait for computedColorScheme to return
            something other than undefined, otherwise run into
            hydration issues*/}
            
            {color === undefined ? 
            <Skeleton height={101.09}/> 
            :
            <Paper shadow="sm" p="xl" withBorder>
                <Group justify='space-between'>
                <Title order={2}>Toggle Theme Mode</Title>
                <Switch
                size='lg'
                onLabel={sunIcon}
                offLabel={moonIcon}
                onClick={()=>handleActive()}
                defaultChecked={color}
                />
                </Group>
            </Paper>}
        
        </Box>
    )
}