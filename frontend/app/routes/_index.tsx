import { 
  Stack,
  Center
} from "@mantine/core";

import Index_Welcome from '../components/ui/Index_Welcome'
import Index_CurrentFindings from '../components/ui/Index_CurrentFindings'
import Index_LatestFindings from '../components/ui/Index_LatestFindings'
import {requireUserId} from '../utils/session.server'
import getUser from '../utils/getUser'
import { useLoaderData } from "@remix-run/react";

export async function loader({request}){
    try{
      const user = await getUser(request)
      return {
        username : user?.username,
        avatar : user?.avatar,
        findings : user?.findings,
        spaces : user?.spaces
      }
    }catch{
      return await requireUserId(request)
    }

    return null
}

export default function Index() {

  const userData = useLoaderData()
  console.log(userData)

  return (
    <Center>
    <Stack maw={{base : '100%' , md: '60%'}}>
      <Index_Welcome 
        username={userData.username}
        avatar={userData.avatar}/>
      <Index_CurrentFindings findings={userData.findings} spaces={userData.spaces}/>
      <Index_LatestFindings/>
    </Stack>
    </Center>
  );
}
