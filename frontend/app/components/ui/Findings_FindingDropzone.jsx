import {
    Dropzone,
    
} from '@mantine/dropzone'

import{
    Box,
    FileInput,
    Group,
    Stack,
    Text
} from '@mantine/core'

import { IoCheckmarkCircle, IoCloseCircle, IoImage } from "react-icons/io5/index.js";

import styles from './styles/Findings_FindingDropzone.module.css'
//form.setValues({image : file})
export default function FindingDropZone({form}){
    return(
        <FileInput
            label='image'
            description="Input description"
            placeholder="Input placeholder"
            onChange={(v)=>{form.setValues({image : v}); console.log(v.type)}}
        >

        </FileInput>
            // <Dropzone 
            //     className={styles.dropzone}
            //     accept={[
            //         'image/png',
            //         'image/jpeg',
            //       ]}
            //       onDrop={(files)=>{
                    
            //         form.setValues({image : files[0]})
            //         console.log(files[0])
            //       }}
            //     >
            //     <Group justify='center' p='xl' style={{pointerEvents: 'none'}}>

            //     <Dropzone.Accept>
            //         <IoCheckmarkCircle style={{fontSize: '4em'}}/>
                    
            //     </Dropzone.Accept>

            //     <Dropzone.Reject>
            //         <IoCloseCircle style={{fontSize: '4em'}}/>
            //     </Dropzone.Reject>

            //     <Dropzone.Idle>
            //         <IoImage style={{fontSize: '4em'}}/>
                    
            //     </Dropzone.Idle>

            //     <Box>
            //         <Text size='lg' fw={500}>Drag and drop a file or click to upload an image of the finding here.</Text>
            //         <Text size='sm' c='dimmed'>File should not exceed over 4mb. Supported file types: .jpg .png</Text>
            //     </Box>

            //     </Group>
            // </Dropzone>
      
    )
}