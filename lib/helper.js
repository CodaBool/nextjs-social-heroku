import query from './db'
import { parseCookies, setCookie } from 'nookies'
import { parseJwt, dateParsed } from '../constants'

export async function getUser(email, deletePass) { // search Stripe Customers to see if the email already exists
  const result = await query(
    'SELECT * FROM users WHERE email=$1', 
    [email.toLowerCase()]
  )
  // Promise.reject(new Error('could not find a user with that email'))
  if (deletePass) {
    delete result.rows[0].password
  }
  return dateParsed(result.rows[0])
}

export function emailFromContext(context) {
  const cookies = parseCookies(context)
  if (cookies) {
    const token = cookies['__Secure-next-auth.session-token'] || cookies['next-auth.session-token']
    if (token) {
      return parseJwt(token).email
    } else {
      console.log('no session')
      return null
    }
  }
}

export async function quickUser(context) {
  let user
  const email = await emailFromContext(context)
  if (email) {
    user = await getUser(email, true)
  } else {
    user = { err: 'no session' }
  }
  return user
}