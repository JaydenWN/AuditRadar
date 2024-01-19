import { 
  Stack,
  Center
} from "@mantine/core";

import Index_Welcome from '../components/ui/Index_Welcome'
import Index_CurrentFindings from '../components/ui/Index_CurrentFindings'
import Index_LatestFindings from '../components/ui/Index_LatestFindings'
import {requireUserId} from '../utils/session.server'


export async function loader({request}){
  return await requireUserId(request)
}

export default function Index() {

  return (
    <Center>
    <Stack maw={{base : '100%' , md: '60%'}}>
      <Index_Welcome/>
      <Index_CurrentFindings/>
      <Index_LatestFindings/>
    </Stack>
    </Center>
  );
}
