import {prisma}from '../utils/db.server'
import getUser from '../utils/getUser'

export async function action({request}){

    const user = await getUser(request)

    const data = await request.formData()
    
    
    return await prisma.space.create({
        data: {
            title: data.get('title'),
            userId: user.id
        }
    })
   
}

export function loader(){
    return null
}