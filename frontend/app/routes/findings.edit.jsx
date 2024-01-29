import { redirect } from "@remix-run/react"
import { prisma } from "../utils/db.server"
import getUser from "../utils/getUser"
import { requireUserId } from "../utils/session.server"

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