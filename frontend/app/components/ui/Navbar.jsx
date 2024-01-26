import { AppShell, ScrollArea} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { Link, useFetcher } from "@remix-run/react";
import { NavLink as MantineNavLink } from "@mantine/core";
import navbarLinks from '../Navbar-Links'
import { useEffect, useState } from "react";
import { useLocation, useLoaderData } from "@remix-run/react";
import NewSpaceButton from "./New_Space_Button";


export default function Navbar(){
    const [handlers] = useDisclosure();
    const location = useLocation()

    function handleNavClick(index, item){
        setActive(index)
        if(!item.children){
            handlers.close()
        }
        
    }
    
    const userSpacesArr = []
    const fetcher = useFetcher()
    const [userSpaces, setUserSpaces] = useState(userSpacesArr)
    useEffect(()=>{
        if(!fetcher.data){
            fetcher.load('/spaces')
        }
        
        if(fetcher.data){
            console.log(fetcher.data)
            if(fetcher.data.spaces){
                fetcher.data.spaces.map((currentObj)=>{
                    const label = currentObj.title
                    const url = `/spaces/${currentObj.title}`
                    const newObj = {label, url}
                    userSpacesArr.push(newObj)
                    
                })
                setUserSpaces(userSpacesArr)
            } 
        }
    },[fetcher.data])

    const [active, setActive] = useState(0);

    const items = navbarLinks.map((item, index) => {
    //'Polymorphed mantine navLink to remix Link component
    //If item has a child link then it will be also added.
    //If spaces exist, then they are added to the userSpaces array.
    //This data is pulled from user.
    let childLinks = null;
        
        if(item.children && item.label === 'My Spaces'){
          childLinks = userSpaces.map((itemChild)=>(
            <MantineNavLink
            component={Link}
            to={itemChild.url}
            href={itemChild.url}
            key={itemChild.label}
            label={itemChild.label}
            description={itemChild.description}
            onClick={() => handleNavClick(itemChild)}
            style={{display : 'flex'}}
            />))
        }

        if(item.children && item.label === 'View Findings'){
            childLinks = item.children.map((itemChild)=>(
                <MantineNavLink
                component={Link}
                to={itemChild.url}
                href={itemChild.url}
                key={itemChild.label}
                label={itemChild.label}
                description={itemChild.description}
                onClick={() => handleNavClick(itemChild)}
                />))
        }

    return(
    <MantineNavLink
        component={Link}
        href={item.url}
        to={item.url ? item.url : location.pathname}
        key={item.label}
        active={location.pathname === item.url ? true : false}
        label={item.label}
        description={item.description}
        leftSection={item.leftSection}
        onClick={() => handleNavClick(index, item)}
        >
        {childLinks}
    </MantineNavLink>)
});
    return(
        <>
            <AppShell.Navbar  component={ScrollArea}>
                {items}
                <NewSpaceButton/>
            </AppShell.Navbar>
        </>   
    )
}