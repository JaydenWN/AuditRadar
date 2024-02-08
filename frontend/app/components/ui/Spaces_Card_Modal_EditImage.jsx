import { useSubmit } from "@remix-run/react"
import {
    Modal,
    Stack,
    FileInput,
    Group,
    Button,
    Image,
    Text,
    Skeleton
 } from "@mantine/core"
 import { useForm } from "@mantine/form"
 import { useFetcher } from "@remix-run/react"
 import { useEffect, useState } from "react"

export default function Spaces_Card_Modal_ChangeImage({opened, close, id, image, title, setImageLoading, imageLoading}){
    
    const [currentImg, setCurrentImage] = useState(image)
    
    const [prevImageDimensions , setPrevImageDimensions] = useState()

    const handleSubmit = useSubmit()
//ToDo : handle image loading skeleton?
    

    const form = useForm({

        validate : {
            image : (value) => value ? null : 'You must set an image'
        }
    })

    const fetcher = useFetcher()

    useEffect(()=>{
        console.log(currentImg)
        
        async function uploadToS3(){
            setImageLoading(true)
            fetch(fetcher.data.signedUrl, {
                method : 'PUT',
                body: form.values.image,
            }).then(async(res)=>{
                if(res.ok === true){
                    setCurrentImage(res.url.split('?')[0])
                    setImageLoading(false)
                }
            })
            }
        if(fetcher.data){
            
            uploadToS3()
            

             handleSubmit({imageUrl : fetcher.data.dbUrl, findingId : id}, {method : 'post', action : `/spaces/${title}`, navigate: false})            
             
        }
    },[fetcher.data])

    return (
        <Modal
            opened={opened}
            onClose={close}
            title = 'Change Image'>
                <form
                    onSubmit={
                        form.onSubmit((values)=>{
                            const imageData = new FormData()
                            imageData.set('image', values.image)

                            fetcher.submit(imageData,{ method : 'POST', action : '/getPresignedUrl'})
                        })
                    }
                    >
                    <Stack>
                        {imageLoading ? 
                        <Skeleton
                            height={prevImageDimensions}
                            
                        /> : 
                        <Image 
                            src={currentImg}
                            onLoad={(e)=> setPrevImageDimensions(e.target.height)} />}
                    
                   <FileInput
                    accept="image/png,image/jpeg"
                    label="Select Image"
                    placeholder="..."
                    {...form.getInputProps('image')}/>
                        
                    <Group justify='space-between'>
                    <Button
                        variant='outline'
                        color='red'
                        onClick={close}>
                            Cancel
                    </Button>
                    <Button
                        variant='default'
                        type='submit'>
                            Submit
                    </Button>
                    </Group>
                    </Stack>
                </form>
        </Modal>
    )
}