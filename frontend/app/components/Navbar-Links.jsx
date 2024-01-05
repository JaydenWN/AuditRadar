import { IoHome, IoSettingsSharp , IoCompassSharp, IoAddCircleSharp, IoWarningSharp} from "react-icons/io5/index.js";

const navbarLinks = [
    {
        label : 'Home',
        description: 'Go to homepage',
        url : '/',
        leftSection : <IoHome />,
    },
    {
        label : 'Settings',
        description: 'Change user settings',
        url : '/settings',
        leftSection : <IoSettingsSharp />,
    },
    {
        label : 'My Spaces',
        leftSection : <IoCompassSharp />,
        children: [
            {
                label : 'room name 1',
                url : '/spaces/room name 1'
            }
        ]

    },
    {
        label : 'Create New Space',
        url : 'spaces/new_space',
        leftSection : <IoAddCircleSharp />
    },
    {   
        label : 'View Findings',
        leftSection : <IoWarningSharp />,
        children : [
            {
                label : 'View Current Findings',
                url : '/findings/current_findings'
            },
            {   
                label : 'View Resolved Findings',
                url : '/findings/resolved_findings'
            },
        ]
    }
]

export default navbarLinks