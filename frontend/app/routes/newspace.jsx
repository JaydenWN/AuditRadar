import {prisma}from '../utils/db.server'
import getUser from '../utils/getUser'
import {Prisma} from '@prisma/client'
import { requireUserId } from '../utils/session.server'

export async function action({request}){
    await requireUserId(request)
    const user = await getUser(request)
    const data = await request.formData()

    const createdSpace = await prisma.space.create({
        data: {
            title: data.get('title'),
            userId: user.id
        }
    }).catch((e) => {
        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            const returnedResponseObj = {
                errorTarget: e.meta?.target?.[0],
                errorCode: e.code,
            }
            console.log(returnedResponseObj)
            return returnedResponseObj;
        } else {
            console.error('Unhandled error during user creation:', e);
            return null
        }
    });
   
    return {createdSpace}
}
export async function loader({request}){
    await requireUserId(request)
    return null
}