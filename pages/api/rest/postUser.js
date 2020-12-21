import query from '../../../lib/db'
import axios from 'axios'

export default async function (req, res) {
  try {
    const { body } = req
    const valid = await verify(body.token)
    if (valid) {
      const result = await query(
        'INSERT INTO users(email, name, password, joined, updated) VALUES ($1, $2, $3, $4, $5)', 
        [body.email.toLowerCase(), body.name, body.password, body.joined, body.updated]
      )
      console.log('result', result)
      if (result.err) {
        res.status(500).send(result.err)
      } else {
        res.status(200).json({result: result.rowCount})
      }
    } else {
      res.status(500).send('Invalid Captcha')
    }
  } catch (err) {
    res.status(500).send('General Create User/Customer Error')
  }
}

async function verify(token) {
  const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}`)
  const valid = data.success || false
  return valid
}