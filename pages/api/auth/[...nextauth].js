import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { compare } from 'bcryptjs'
import { getUser }from '../../../lib/helper'

export const config = { // nextjs doc for custom config https://nextjs.org/docs/api-routes/api-middlewares#custom-config
  api: { // was getting warning that API resolved without sending a response for /api/auth/session, this may result in stalled requests.
    // following stackoverflow answer I set this config but may be dangerous since I may not always return a response
    externalResolver: true,
  },
}

export default (req, res) => {
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: { label: "Password", type: "password", placeholder: "Password" }
        },
  
        // can use throw new Error('message') to send to err.message catch block 
        authorize: async (clientData) => {
          try {
            const user = await getUser(clientData.email, false)
            console.log('compare', user.password, 'vs', clientData.password)
            const validPassword = await compare(clientData.password, user.password)
            if (validPassword) {
              console.log('got valid password sending back user obj for successful signin')
              return { id: user.id, name: user.name, email: user.email } // complete successful login
            } else { // invalid password
              console.log('got invalid password')
              return Promise.reject('/login?error=invalid')
            }
          } catch (err) {
            console.log('try failed with err', err)
            return Promise.reject('/login?error=invalid')
          }
        },
      })
    ],
    pages: {
      signIn: '/',
      signOut: '/logout',
      newUser: '/signup',
      error: '/', // Error code passed in query string as ?error=
    },
    session: {
      jwt: true, 
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: true,
    secret: process.env.SECRET,
    database: process.env.DATABASE_URL,
  })
}