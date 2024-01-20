import { useDisclosure } from "@mantine/hooks";
import {Group, Text, Box} from '@mantine/core'
import NewSpaceModal from './New_Space_Modal'
import {IoAddCircleSharp}from "react-icons/io5/index.js"
import style from './styles/newSpaceButton.module.css'
import { getSession } from "~/utils/session.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({request}){
    const session = await getSession(request.headers.get('Cookie'))
    const userId = await session.get('UserId')

    if(!userId){
        return false
    }else{
        return true
    }
}

export default function NewSpaceButton(){
    const [opened, { open, close }] = useDisclosure(false);
    const loaderData = useLoaderData()
    return(
        <Box className={style.newSpaceButton}>
        <Group gap='sm' p='sm' onClick={open}>
        <IoAddCircleSharp/>
        <Text
        size="sm"
        >Create New Space</Text>
        </Group>
        {loaderData? <NewSpaceModal opened={opened} close={close}/> : ''}
        </Box>
    )
}