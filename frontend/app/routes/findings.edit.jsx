import { redirect } from "@remix-run/react"
import { prisma } from "../utils/db.server"
import getUser from "../utils/getUser"
import { requireUserId } from "../utils/session.server"
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"

export async function action({request}){
    const data = await request.formData()
    const user = getUser(request)
    if(request.method === 'PATCH'){
        if(data.get('setResolved')){
            const currentFinding = await prisma.finding.findFirst({
                where : {
                    id : Number(data.get('id')),
                    userId : user.id
                }
            })
            await prisma.finding.update({
                where : {
                    id : Number(data.get('id')),
                    userId : user.id
                },
                data : {
                    resolved : !currentFinding.resolved
                }
            })
        }
        if(data.get('title')){
            await prisma.finding.update({
                where : {
                    id : Number(data.get('id')),
                    userId : user.id
                },
                data : {
                    title : data.get('title')
                }
            })
        }

        if(data.get('description')){
            await prisma.finding.update({
                where : {
                    id : Number(data.get('id')),
                    userId : user.id
                },
                data : {
                    description : data.get('description')
                }
            })
        }

        if(data.get('rating')){
            await prisma.finding.update({
                where : {
                    id : Number(data.get('id')),
                    userId : user.id
                },
                data : {
                    rating : Number(data.get('rating'))
                }
            })
        }
    }
    if(request.method === "DELETE"){

        const currentFinding = await prisma.finding.findFirst({
            where : {
                id : Number(data.get('id')),
                userId : user.id
            }
        })

        const key = currentFinding.image.split('/')[3]
        const deleteCommand = new DeleteObjectCommand({Bucket : process.env.BUCKET, Key: key})

        const s3client = new S3Client({
            region : process.env.REGION,
            credentials: {
                secretAccessKey : process.env.S3_SECRET,
                accessKeyId : process.env.S3_ACCESS
            }
        })

        try{
            await s3client.send(deleteCommand)
        }catch (e){
            console.log(`Error Deleting S3 Bucket Object : ${e}`)
        }

        return await prisma.finding.delete({
            where : {
                id : Number(data.get('id')),
                userId : user.id
            }
        })
    }
    return null
}

export async function loader({request}){
    await requireUserId(request)
 return redirect('/') 
}