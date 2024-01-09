import { 
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Avatar,
  RingProgress,
  SimpleGrid,
  Card,
  Image,
  Center
} from "@mantine/core";


import Index_Welcome from '../components/ui/Index_Welcome'
import Index_CurrentFindings from '../components/ui/Index_CurrentFindings'
import Index_LatestFindings from '../components/ui/Index_LatestFindings'
import NewSpaceButton from "../components/ui/New_Space_Button";



export default function Index() {
  return (
    <Center>
    <Stack maw={{base : '100%' , md: '60%'}}>
      <Index_Welcome/>
      <Index_CurrentFindings/>
      <Index_LatestFindings/>
      <NewSpaceButton/>
    </Stack>
    </Center>
  );
}
