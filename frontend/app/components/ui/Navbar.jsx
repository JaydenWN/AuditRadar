import { AppShell, Box} from "@mantine/core"
import { Link } from "@remix-run/react";
import { NavLink as MantineNavLink } from "@mantine/core";
import navbarLinks from '../Navbar-Links'
import { useState } from "react";

export default function Navbar(){

//https://mantine.dev/core/nav-link
    const [active, setActive] = useState(0);

    const items = navbarLinks.map((item, index) => (
    //'Polymorphed mantine navLink to remix Link component
    //If item has a child link then it will be also added.
      <MantineNavLink
        component={Link}
        href={item.url}
        to={item.url}
        key={item.label}
        active={index === active}
        label={item.label}
        description={item.description}
        leftSection={item.leftSection}
        onClick={() => setActive(index)}
        >
        {item.children ? item.children.map((itemChild)=>(
            <MantineNavLink
            component={Link}
            to={itemChild.url}
            href={itemChild.url}
            key={itemChild.label}
            label={itemChild.label}
            description={itemChild.description}
            />)) : ''}
        </MantineNavLink>
    ));
  
    return(
        <AppShell.Navbar >
            {items}
        </AppShell.Navbar>
    )
}