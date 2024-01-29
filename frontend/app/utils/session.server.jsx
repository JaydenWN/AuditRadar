import {createCookieSessionStorage} from '@remix-run/node'
import {redirect} from '@remix-run/node'
const {getSession, commitSession, destroySession} = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets:[process.env.SESSION_SECRET],
    }
})

async function requireUserId(request){
    const session = await getSession(request.headers.get('Cookie'))
    const userId = await session.get('UserId')

    if(!userId){
        throw redirect('/login')
    }else{
        return userId
    }
}

export {getSession, commitSession, destroySession, requireUserId}