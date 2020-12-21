/* React Form Hook, provides the best control
for forms. There is a way to get server side error messages
e.g. 'This email is already in use' */
import React, { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import { Map, PersonBadge, Envelope, Person, GeoAlt, Key } from 'react-bootstrap-icons'
import bcrypt from 'bcryptjs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"
import Toast from '../components/Toast'
import { signIn, useSession } from 'next-auth/client'
import { Load, isLoad } from '../components/Load'

export default function Signup() {
  const [password, setPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [show, setShow] = useState(false)
  const captcha = useRef(null)
  const [session, loading] = useSession()
  const { handleSubmit, watch, errors, control, getValues } = useForm()

  const onSubmit = (data) => {
    const token = captcha.current.getValue()
    // if (true) { // TODO: reset this 
    if (token !== "") {
      bcrypt.hash(data.password, 10, function(err, hash) {
        axios.post('/api/rest/postUser', {
          email: data.email,
          name: data.firstName + ' ' + data.lastName,
          token: token,
          password: hash,
          joined: new Date(),
          updated: new Date()
        })
          .then(res => {
            setSuccess(true)
            signIn('credentials', { email: data.email, password: data.password, callbackUrl: '' })
          })
          .catch(err => {
            if (err.response.data === 'Duplicate Stripe Email' || err.response.data === 'Cannot Create PG User') {
              setShow(true)
            } else {
              console.log(err.response.data)
            }
          })
          .finally(
            captcha.current.reset()
          )
      })
    }
  }
  useEffect(() => {
    setPassword(watch('password'))
  }, [watch])

  if (isLoad(session, loading) || success) return <Load />

  // console.log("Errors", errors)

  return (
    <>
      <h1 className="display-6">Create Account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Person className="mr-2 mb-1" size={20}/>
        <Form.Label>Name</Form.Label>
        <Row>
          <Col>
            <Form.Group>
              <Controller 
                as={<Form.Control />} 
                control={control}
                name="firstName"
                defaultValue=""
                placeholder="First name" 
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Controller 
                as={<Form.Control />} 
                control={control}
                name="lastName"
                defaultValue=""
                placeholder="Last name" 
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <PersonBadge className="mr-2 mb-1" size={20}/>
          <Form.Label>Badge Number</Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            name="badge"
            defaultValue=""
            placeholder="Badge Number"
          />
        </Form.Group>
        <Form.Group>
          <Map className="mr-2 mb-1" size={20}/>
          <Form.Label>Precinct Number</Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            name="precinct"
            defaultValue=""
            placeholder="Precinct Number"
          />
        </Form.Group>
        <Form.Group>
          <GeoAlt className="mr-2 mb-1" size={20}/>
          <Form.Label>Zip Code </Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            name="zip"
            defaultValue=""
            placeholder="Zip Code"
          />
        </Form.Group>
        <Form.Group>
          <Envelope className="mr-2 mb-1" size={20}/>
          <Form.Label>Email</Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            type="email"
            name="email"
            defaultValue=""
            placeholder="name@example.com"
            required
          />
        </Form.Group>
        <Form.Group>
          <Key className="mr-2 mb-1" size={20}/>
          <Form.Label>Password</Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            type="password"
            name="password"
            placeholder="Password" 
            defaultValue=""
            required
            rules={{
              minLength: 8 // sets rule pass >= 8
            }}
          />
          {errors.password && <p className="errMsg">Your password must be at least 8 characters</p>}
        </Form.Group>
        <PasswordStrengthBar password={password} className={`${password.length === 0 ? 'fadeOut' : 'fadeIn'}`}/>
        <Form.Group>
          <Key className="mr-3 mb-1" size={30}/>
          <Form.Label>Confirm Password</Form.Label>
          <Controller 
            as={<Form.Control />} 
            control={control} 
            type="password"
            name="confirmPass"
            placeholder="Confirm Password" 
            defaultValue=""
            required
            rules={{
              validate: () => {
                return getValues("password") === getValues("confirmPass");
              }
            }}
          />
          {errors.confirmPass && <p className="errMsg">Your password must match</p>}
        </Form.Group>
        <Row >
          <ReCAPTCHA
            className="mx-auto mt-3"
            sitekey="6LfYhw0aAAAAANDCPhmW-uWwN6shEUvs31Jof6TT"
            ref={captcha}
          />
          <Button className="mx-auto my-5" style={{width: "40%"}} variant="primary" type="submit">Create Account</Button>
        </Row>
      </Form>
      <div style={{position: 'fixed', top: '120px', right: '20px'}}>
        <Toast show={show} setShow={setShow} title='Email Taken' error body={
          <h5 className="text-danger" >An account already exists with the Email Address</h5>
        }/>
      </div>
    </>
  )
}
