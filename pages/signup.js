/* React Form Hook, provides the best control
for forms. There is a way to get server side error messages
e.g. 'This email is already in use' */
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import { Map, PersonBadge, Envelope, Person, GeoAlt, Key } from 'react-bootstrap-icons'
//import bcrypt from 'bcryptjs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"

export default function Signup() {
  const [password, setPassword] = useState(false)
  const captcha = useRef(null)
  const { handleSubmit, watch, errors, control, getValues } = useForm()

  const onSubmit = (data) => {
    // place submission to database here
    // TODO: check if email is in use already and report error before submit
    console.log("Data:", data)
    // bcrypt.hash(data.password, 10, function(err, hash) {
    //   alert(`Signup Request!\n\nName: ${data.firstName} ${data.lastName}\nBadge: ${data.badge}\nPrecinct: ${data.precinct}\nZip: ${data.zip}\nEmail: ${data.email}\nPassword (hashed): ${hash}`)
    // })

    // Map frontend fields to backend fieldnames
    const { firstName, lastName, zip, password, email, badgeNumber, precinctNumber} = data;
    data = { firstName, lastName, email, badgeNumber, precinctNumber, zip, password, admin: false, token: captcha.current.getValue() }

    const token = captcha.current.getValue()
    if (token !== "") {
      console.log(data)
      axios.post("/api/user", data)
        .then((res) => {
          // alert(`Signup Successful!\n\nEmail: ${data.email}\nPassword: ${data.password}\nID: ${res.data.user.id}\nToken: ${res.data.token}`)
          setCookie('simpleAuth', true, { path: '/', sameSite: 'strict' })
          context.setAuth(true)
        })
        .then((res) => {          
          history.push(`/posts`)
        })
        .catch((err) => {
          //TODO handle expected error codes from backend
          // 400 = User already exists
          // 500 = Unable to save user
          alert(`Signup Failure\nError Code: ${err.response.status}`)
        });
    }
  }

  useEffect(() => {
    setPassword(watch('password'))
  }, [watch])

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
            sitekey="6LcUZt4ZAAAAAKsu3QqginzUrcKS_9brtBKGBQcL"
            ref={captcha}
          />
          <Button className="mx-auto my-5" style={{width: "40%"}} variant="primary" type="submit">Create Account</Button>
        </Row>
      </Form>
    </>
  )
}
