import { 
    Title,
    Text,
    Paper,
    Group,
    RingProgress
  } from "@mantine/core";
import { useEffect, useState } from "react";


export default function Index_CurrentFindings({findings, spaces}){

   const [spacesWithIssue, setSpacesWithIssue] = useState(0)
   const [totalIssues, setTotalIssues] = useState(0)

   useEffect(()=>{
    const spacesWithIssues = []
      if(spaces){
        spaces.map((space)=>{  
          let issueCount = 0
          space.Finding.map((finding)=>{
            Object.values(finding).includes(false) ? issueCount++  : null}
          )
          spacesWithIssues.push({spaceTitle : space.title, issueCount : issueCount})
        }
        )
      }
      let count = 0;
      spacesWithIssues.map((space)=>{
        count += space.issueCount
        
      })
    setTotalIssues(count)
    setSpacesWithIssue(spacesWithIssues)
      
   },[spaces])

   function getRandomRGBColor() {
    const red = Math.floor(Math.random() * 256); 
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;

    return rgbColor;
}
   

    return(
      <Paper shadow="sm" withBorder p="xl">
        <Group justify="center">
        <RingProgress
          size={200}
          thickness={16}
          label={
            <Text size="xs" ta="center" px="xs" style={{ pointerEvents: 'none' }}>
              {totalIssues != 0 ? 'Hover / Press sections to see information' : 'No findings' }
            </Text>
          }
          sections={
            spacesWithIssue != 0 && totalIssues != 0 ?
            spacesWithIssue.map((space)=>(
              { value: space.issueCount / totalIssues * 100,
                color: getRandomRGBColor(), 
                tooltip: `${space.spaceTitle}, ${space.issueCount / totalIssues * 100}%`}
            )) : []
        }
        />
        <Title order={2}>
          Your Current Findings
        </Title>
        </Group>
      </Paper>
    )
}