import {
    Dropzone,
    
} from '@mantine/dropzone'

import{
    Box,
    Group,
    Stack,
    Text
} from '@mantine/core'

import { IoCheckmarkCircle, IoCloseCircle, IoImage } from "react-icons/io5/index.js";

import styles from './styles/Findings_FindingDropzone.module.css'

export default function FindingDropZone(){
    return(
        
            <Dropzone 
                className={styles.dropzone}
                accept={[
                    'image/png',
                    'image/jpeg',
                  ]}
                >
                <Group justify='center' p='xl' style={{pointerEvents: 'none'}}>

                <Dropzone.Accept>
                    <IoCheckmarkCircle style={{fontSize: '4em'}}/>
                    
                </Dropzone.Accept>

                <Dropzone.Reject>
                    <IoCloseCircle style={{fontSize: '4em'}}/>
                </Dropzone.Reject>

                <Dropzone.Idle>
                    <IoImage style={{fontSize: '4em'}}/>
                    
                </Dropzone.Idle>

                <Box>
                    <Text size='lg' fw={500}>Drag and drop a file or click to upload an image of the finding here.</Text>
                    <Text size='sm' c='dimmed'>File should not exceed over 4mb. Supported file types: .jpg .png</Text>
                </Box>

                </Group>
            </Dropzone>
      
    )
}