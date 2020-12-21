import React from 'react'
import { useSession } from 'next-auth/client'
import { Load, isLoad } from '../components/Load'
import { quickUser } from '../lib/helper'
import { format } from 'timeago.js'

export default function Account({ user }) {
  const [session, loading] = useSession()

  if (isLoad(session, loading, true)) return <Load />

  return (
    <>
      <div>
        <hr></hr>
        <h4 className="card-title mb-3 text-muted">Account</h4>
      </div>
      
      <div>
        <p>Name: {user.name}</p>
        <p>{user.email}</p>
        <p>Active: {user.active ? 'true' : 'false'}</p>
        <p>Joined: {format(user.joined)}</p>
        <p>Updated: {format(user.updated)}</p>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const user = await quickUser(context)
  return { props: { user }}
}