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
        url : '/settings',
        leftSection : <IoCompassSharp />,
        children: [
            {
                label : 'room name 1',
                url : '/'
            }
        ]

    },
    {
        label : 'Create New Space',
        leftSection : <IoAddCircleSharp />
    },
    {   
        label : 'View Findings',
        leftSection : <IoWarningSharp />,
        children : [
            {
                label : 'View Current Findings'
            },
            {   
                label : 'View Resolved Findings'
            },
        ]
    }
]

export default navbarLinks