import {Text} from '@mantine/core'

export default function DateDisplay({style}){
    const date = new Date()
    console.log(date)
    const formatedDate = {
        day : date.getDate(),
        month : date.getMonth() + 1,
        year : date.getFullYear()
    }
    return(
        <Text size='xs' style={style}>{`${formatedDate.day}/${formatedDate.month}/${formatedDate.year}`}</Text>
    )
}