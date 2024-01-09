import { useDisclosure } from "@mantine/hooks";
import {Group, Text, Box} from '@mantine/core'
import NewSpaceModal from './New_Space_Modal'
import {IoAddCircleSharp}from "react-icons/io5/index.js"
import style from './styles/newSpaceButton.module.css'

export default function NewSpaceButton(){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <Box className={style.newSpaceButton}>
        <Group gap='sm' p='sm' onClick={open}>
        <IoAddCircleSharp/>
        <Text
        size="sm"
        >Create New Space</Text>
        </Group>
        <NewSpaceModal opened={opened} close={close}/>
        </Box>
    )
}