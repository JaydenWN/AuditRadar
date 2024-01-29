import {prisma} from './db.server'
import { getSession } from "../utils/session.server";
import { redirect } from '@remix-run/node';

export default async function getUser(request){
    const session = await getSession(request.headers.get('Cookie'))
    const userId = await session.get('UserId')
    if(userId){
        return await prisma.user.findUnique({
            where : {
                id : userId
            },
            include : {
                findings : true,
                spaces : {include : {Finding : true}}
            } 
        })
    }else{return redirect('/login')}
}