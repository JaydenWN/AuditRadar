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
  Image
} from "@mantine/core";


import Index_Welcome from '../components/ui/Index_Welcome'
import Index_CurrentFindings from '../components/ui/Index_CurrentFindings'
import Index_LatestFindings from '../components/ui/Index_LatestFindings'



export default function Index() {
  return (
    <Stack>
      <Index_Welcome/>
      <Index_CurrentFindings/>
      <Index_LatestFindings/>
    </Stack>
  );
}
