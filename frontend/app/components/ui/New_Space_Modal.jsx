import { FileInput, Modal,  Stack, TextInput, } from "@mantine/core";
import { useState } from "react";

import { IoCloudUploadOutline } from "react-icons/io5/index.js";

export default function NewSpaceModal({opened, close, open}){
    const [value, setValue] = useState()
    return(
        <Modal opened={opened} onClose={close} title='Create A New Space'>
            <Stack>
                <TextInput
                label='Space Name'
                description='Give a name for this space'
                placeholder='Example : Kitchen'
                />
                <FileInput
                leftSection={<IoCloudUploadOutline/>}
                label='Upload an image'
                placeholder='Image of New Space'
                value={value}
                onChange={setValue}
               
                />
            </Stack>
        </Modal>
    )
}

