import getUser from '../utils/getUser'

export async function loader({request}){
    const user = await getUser(request)
    return user
}

export default function spaceindex(){
    return (<></>)
}