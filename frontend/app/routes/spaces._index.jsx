import getUser from '../utils/getUser'
import { requireUserId } from '../utils/session.server'
export async function loader({request}){
    await requireUserId(request)
    
    const user = await getUser(request)
    return user
      
}

export default function spaceindex(){
    return (<></>)
}