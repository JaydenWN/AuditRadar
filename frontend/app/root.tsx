import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, AppShell, Burger, Group, Title, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from "@mantine/notifications";
import Navbar from './components/ui/Navbar'
import { IoRadio } from "react-icons/io5/index.js";
import { getSession } from "./utils/session.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({request}){
  //If user is logged in then show navbar ui otherwise show nothing
  const session = await getSession(request.headers.get('Cookie'))
  console.log(session.has('UserId'))
  return session.has('UserId')
}


export default function App() {
  const [opened, { toggle }] = useDisclosure()
  const loaderData = useLoaderData()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
        <Notifications />
          <AppShell
            header={{ height: {base : 80, md: 80} }}
            navbar={{
              width: 250,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Stack h='100%' p='lg'>
                <Group justify="space-between"> 
                {loaderData?  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  /> 
                  : ''}                
                  <Group justify="space-between" gap='xs'>
                    <Title style={{display: 'flex'}}><IoRadio /></Title>
                    <Title>Audit Radar</Title>
                  </Group>
                </Group>
              </Stack>
            </AppShell.Header>
            {loaderData?  <Navbar/> : ''}
            <AppShell.Main >
              <Outlet />
            </AppShell.Main>

          </AppShell>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
