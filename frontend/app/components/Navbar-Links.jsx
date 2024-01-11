import { IoHome, IoSettingsSharp , IoCompassSharp, IoWarningSharp, IoCameraSharp} from "react-icons/io5/index.js";

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
    },
    {
        label: 'Submit New Finding',
        leftSection: <IoCameraSharp />,
        url: '/findings/new_finding'
    }
   
]

export default navbarLinks