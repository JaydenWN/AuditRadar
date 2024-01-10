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
    Stack
} from '@mantine/core'

import { IoEllipsisVertical, IoImagesOutline, IoDocumentTextOutline, IoTextSharp, IoTrashOutline, IoCheckmarkDoneOutline, IoThumbsDown, IoThumbsDownOutline } from "react-icons/io5/index.js";

export default function Spaces_Card({title, space, description, rating}){
    const theme = useMantineTheme()
    const thumbIconFull = (<IoThumbsDown style={{color: theme.colors.red[6]}}/>)
    const thumbIconEmpty = (<></>)
    return(
            <Flex>
                <Card
                    shadow="sm"
                    p='md'
                >
                    {/*ToDo : Create menu*/}
                    <Card.Section  p='xs'>
                        <Menu position='bottom-end'>

                        <Group  style={{flexDirection: 'row-reverse'}}>
                        <Menu.Target>
                            
                            <ActionIcon variant='default'>
                                <IoEllipsisVertical />
                            </ActionIcon>
                           
                        </Menu.Target>
                        </Group>
                       
                        
                        <Menu.Dropdown>
                            <Menu.Label>Configure Finding</Menu.Label>
                            <Menu.Item leftSection={<IoCheckmarkDoneOutline />} >
                                Mark As Resolved
                            </Menu.Item>
                            <Menu.Item leftSection={<IoDocumentTextOutline />}>
                                Edit Description
                            </Menu.Item>
                            <Menu.Item leftSection={<IoImagesOutline />}>
                                Change Image
                            </Menu.Item>
                            <Menu.Item leftSection={<IoThumbsDownOutline />}>
                                Edit Rating
                            </Menu.Item>
                            <Menu.Item leftSection={<IoTrashOutline />} style={{color: theme.colors.red[9]}}>
                                Delete Finding
                            </Menu.Item>
                            
                        </Menu.Dropdown>

                    </Menu>
                    </Card.Section>

                    <Card.Section>
                        <Image
                        src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        h={160}
                        alt="No way!"
                        />
                    </Card.Section>   

                    <Text fw={500} size="lg" mt="md">
                        Finding Title
                    </Text>
                    
                    <Text mt="md" c="dimmed" size="sm">
                        Space Description Lorem ipsum dolor sit amet, consectetur adip...
                    </Text>
                    <Stack gap='xs'>
                    <Text mt='lg' fw={400}>Rating Level</Text>
                     <Rating
                      defaultValue={2}
                      readOnly
                      emptySymbol={thumbIconEmpty}
                      fullSymbol={thumbIconFull}></Rating>
                      </Stack>

                </Card>
            </Flex>
    )
}