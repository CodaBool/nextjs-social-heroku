import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export default function Navigation() {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={() => router.push('/post')}>Trafficking Spotters</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link href="/post">
            <div className={`${(router.asPath.includes('/post') && router.asPath !== '/post/new') && 'active'} nav-link`}>Browse</div>
          </Link>
          {session
            ?
            <>
              <Link href="/post/new">
                <div className={`${router.asPath === '/post/new' && 'active'} nav-link`}>Create</div>
              </Link>
              <Link href="/account">
                <div className={`${router.asPath.includes('/account') && 'active'} nav-link`}>Account</div>
              </Link>
              <Link href="/logout">
                <div className={`${router.asPath.includes('/logout') && 'active'} nav-link`}>Logout</div>
              </Link>
            </>
            : 
            <Link href="/login">
              <div className={`${router.asPath.includes('/login') && 'active'} nav-link`}>Login</div>
            </Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}