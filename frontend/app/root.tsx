import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider, AppShell, Burger, Group, Title, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './components/ui/Navbar'
import { IoRadio } from "react-icons/io5/index.js";


export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [opened, { toggle }] = useDisclosure();

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

          <AppShell
            header={{ height: {base : 60, md: 80} }}
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
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Group justify="space-between" gap='xs'>
                    <Title order={2}><IoRadio /></Title>
                    <Title>Audit Radar</Title>
                  </Group>
                </Group>
              </Stack>
            </AppShell.Header>
            
            <Navbar/>

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
