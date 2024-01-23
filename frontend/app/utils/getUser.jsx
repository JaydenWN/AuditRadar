import {prisma} from './db.server'
import { getSession } from "../utils/session.server";

export default async function getUser(request){
    const session = await getSession(request.headers.get('Cookie'))
    const userId = await session.get('UserId')
        return prisma.user.findUnique({
            where : {
                username : userId
            },
            include : {
                findings : true,
                spaces : true
            } 
        })
}