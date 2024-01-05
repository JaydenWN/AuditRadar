const navbarLinks = [
    {
        label : 'Home',
        description: 'Go to homepage',
        url : '/'
    },
    {
        label : 'Settings',
        description: 'Change user settings',
        url : '/settings'
    },
    {
        label : 'My Spaces',
        url : '/settings',
        children: [
            {
                label : 'room name 1',
                url : '/'
            }
        ]

    },
    {
        label : 'Create New Space'
    },
    {   
        label : 'View Issues',
        children : [
            {
                label : 'View Current Issues'
            },
            {   
                label : 'View Resolved Issues'
            },
        ]
    }
]

export default navbarLinks