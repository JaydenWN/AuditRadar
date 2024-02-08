import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto'

export async function action({request}){
//Generate a near unguessable random name for the image to avoid conflicts
const genNameFromCrypto = crypto.randomBytes(32).toString('hex')

    if(request.method === "POST"){
        const formData = await request.formData()
        const type = formData.get('type')

        const s3client = new S3Client({
            region : process.env.REGION,
            credentials: {
                secretAccessKey : process.env.S3_SECRET,
                accessKeyId : process.env.S3_ACCESS
            }
        })

        const objectCmd = new PutObjectCommand({
            Bucket : process.env.BUCKET,
            Key: genNameFromCrypto,
            ContentType : type
        })

        const signedUrl = await getSignedUrl(s3client, objectCmd,{expiresIn : 60})
        
        return {signedUrl : signedUrl, dbUrl : signedUrl.split('?')[0]}
    }
    return null
}

export async function loader(){
    
return null
}