import { 
    Title,
    Text,
    Paper,
    Group,
    RingProgress
  } from "@mantine/core";


export default function Index_CurrentFindings({findings, spaces}){
    return(
      <Paper shadow="sm" withBorder p="xl">
        <Group justify="center">
        <RingProgress
          size={200}
          thickness={16}
          label={
            <Text size="xs" ta="center" px="xs" style={{ pointerEvents: 'none' }}>
              Hover / Press sections to see tooltips
            </Text>
          }
          sections={
           []
          //   [
          //   { value: 40, color: 'cyan', tooltip: 'Room' },
          //   { value: 25, color: 'orange', tooltip: 'Room 2' },
          //   { value: 15, color: 'grape', tooltip: 'Room 3' },
          // ]
        }
        />
        <Title order={2}>
          Your Current Findings
        </Title>
        </Group>
      </Paper>
    )
}