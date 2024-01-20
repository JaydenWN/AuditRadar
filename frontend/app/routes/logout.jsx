import { redirect } from "@remix-run/node"

import { commitSession, destroySession, getSession } from "../utils/session.server"

export async function action({request}){
    const session = await getSession(request.headers.get('Cookie'))
    session.unset('UserId')
    return destroySession(session)
}

export async function loader({request}){
    const session = await getSession(request.headers.get('Cookie'))
    session.unset('UserId')
    destroySession(session)
    return redirect('/login', {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}