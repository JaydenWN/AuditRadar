import {
    Flex,
    Card,
    Image,
    Text,
    Menu,
    ActionIcon,
    Group,
    useMantineTheme,
    Rating,
    Stack,
    Modal,
    Badge,
    Skeleton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { IoEllipsisVertical, IoImagesOutline, IoDocumentTextOutline, IoTrashOutline, IoCheckmarkDoneOutline, IoThumbsDown, IoThumbsDownOutline, IoTextSharp } from "react-icons/io5/index.js";
import Spaces_Card_Modal_Description from './Spaces_Card_Modal_Description';
import Spaces_Card_Modal_Rating from './Spaces_Card_Modal_Rating';
import Spaces_Card_Modal_Title from './Spaces_Card_Modal_Title';
import Spaces_Card_Modal_ChangeImage from './Spaces_Card_Modal_EditImage';

export default function Spaces_Card({title, id, resolved, description, rating, image}){
    const theme = useMantineTheme()
    const thumbIconFull = (<IoThumbsDown style={{color: theme.colors.red[6]}}/>)
    const thumbIconEmpty = (<></>)

    const submit = useSubmit()
    
    const [opened, {open, close}] = useDisclosure()
    const [currentModal , setCurrentModal] = useState()
    const [imageLoading, setImageLoading] = useState(false)
    const [prevImageDimensions , setPrevImageDimensions] = useState()
    

    async function handleMenuClick(type){
        if(type === 'resolved'){
            submit({setResolved : true, id }, {
                action : '/findings/edit',
                method: 'PATCH',
                navigate: false
            })
        }
    }

    return(
        <>
        {currentModal === 'title' ? 
        <Spaces_Card_Modal_Title close={close} opened={opened} id={id} title={title}/> : null }

        {currentModal === 'description' ? 
        <Spaces_Card_Modal_Description close={close} opened={opened} id={id} description={description}/> : null }
        
        {currentModal === 'rating' ? 
        <Spaces_Card_Modal_Rating close={close} opened={opened} id={id}/> : null }

        {currentModal === 'image' ? 
        <Spaces_Card_Modal_ChangeImage close={close} opened={opened} id={id} image={image} setImageLoading={setImageLoading} imageLoading={imageLoading}/> : null }


            <Flex>
                <Card
                    shadow="sm"
                    p='md'
                    miw={"100%"}
                >
                    {/*ToDo : Create menu*/}
                    <Card.Section  p='xs'>
                        <Menu position='bottom-end'>

                        <Group  justify='space-between'>
                        {resolved === false ?  
                        <Badge variant="dot" color="red" size="sm">Unresolved</Badge>
                        : <Badge variant="dot" color="green" size="sm">Resolved</Badge>}
                        
                        <Menu.Target>
                            
                            <ActionIcon variant='default'>
                                <IoEllipsisVertical />
                            </ActionIcon>
                           
                        </Menu.Target>
                        </Group>
                       
                        
                        <Menu.Dropdown>
                            <Menu.Label>Configure Finding</Menu.Label>
                            <Menu.Item 
                                leftSection={<IoCheckmarkDoneOutline />}
                                onClick={()=>handleMenuClick('resolved')} >
                                Toggle Resolved
                            </Menu.Item>
                            <Menu.Item 
                                leftSection={<IoTextSharp />}
                                onClick={()=>{setCurrentModal('title'); open()}}>
                                Edit Title
                            </Menu.Item>                            
                            <Menu.Item 
                                leftSection={<IoDocumentTextOutline />}
                                onClick={()=>{setCurrentModal('description'); open()}}>
                                Edit Description
                            </Menu.Item>
                            <Menu.Item 
                                leftSection={<IoImagesOutline />} 
                                onClick={()=>{setCurrentModal('image'); open()}}>
                                Change Image
                            </Menu.Item>
                            <Menu.Item 
                                leftSection={<IoThumbsDownOutline />}
                                onClick={()=>{setCurrentModal('rating'); open()}}>
                                Edit Rating
                            </Menu.Item>
                            <Menu.Item 
                                leftSection={<IoTrashOutline />} 
                                style={{color: theme.colors.red[9]}}
                                onClick={()=>{submit({id},{
                                    method: 'DELETE',
                                    action : '/findings/edit',
                                    navigate : false
                                })}}>
                                Delete Finding
                            </Menu.Item>
                            
                        </Menu.Dropdown>

                    </Menu>
                    </Card.Section>

                    <Card.Section>
                        {imageLoading ? 
                        <Skeleton
                            height={prevImageDimensions}/> :
                        <Image
                        src={image? image : "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"}
                        h={160}
                        alt={title}
                        onLoad={(e)=>setPrevImageDimensions(e.target.height)}
                        />}
                    </Card.Section>   

                    <Text fw={500} size="lg" mt="md">
                        {title.length > 25 ? title.substring(0,26)+ '...' : title}
                    </Text>
                    
                    <Text mt="md" c="dimmed" size="sm">
                        {description}
                    </Text>
                    <Stack gap='xs'>
                    <Text mt='lg' fw={400}>Rating Level : {rating}</Text>
                     <Rating
                      defaultValue={rating}
                      readOnly
                      emptySymbol={thumbIconEmpty}
                      fullSymbol={thumbIconFull}></Rating>
                      </Stack>

                </Card>
            </Flex>
    </>)
}