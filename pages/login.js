/* React Form Hook, provides the best control
for forms. While also requiring work to style them */
import React, { useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Envelope, Key } from 'react-bootstrap-icons'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import axios from "axios"

const SingupText = styled.p`
  color: rgb(2, 117, 216);
  margin: 0 auto 0 auto;
  width: 250px;
  cursor: pointer;
  transition: font-size 0.2s, text-shadow 1s;
  &:hover {
    color: rgb(10, 98, 175);
    font-size: 1.2em;
    text-shadow: 0 0 30px rgba(122, 165, 190, 0.3);
  }
`

export default function Login() {
  const context = useContext(Context)
  const { handleSubmit, errors, control } = useForm()
  const [, setCookie] = useCookies(['simpleAuth']);
  const history = useHistory()

  useEffect(() => {
    // console.log('in login, noticed change in auth', context.isAuth)
  }, [context.isAuth])


  const onSubmit = (data) => {
    data = { email: data.email, password: data.password } 
    axios.post("/api/auth", data)
      .then((res) => {
        setCookie('simpleAuth', true, { path: '/', sameSite: 'strict' })
        context.setAuth(true)
      })
      .then((res) => {
        history.push(`/posts`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // console.log("Errors", errors)

  useEffect(() => {
    if (!context.isAuth) { // already logged in, redirect to posts
      console.log('already logged in redirect to /login')
      // history.push(`/posts`)
    } 
  }, [context.isAuth])



  return (
    <><div className="float-right" style={{width: "500px", margin: "0 auto 0 auto"}}>
      <Form onSubmit={handleSubmit(onSubmit)} >
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
        <Row>
          <Button className="mx-auto mt-5" style={{width: "40%"}} variant="primary" type="submit">Login</Button>
        </Row>
        <SingupText className="my-5 text-center" onClick={() => history.push(`/signup`)}>New Here? Create Account Now.</SingupText>
      </Form>
    </div>
      

    <div className="float-left mr-15" style={{width: "500px", margin: "0 auto 0 auto"}}>
      <Image src={HeaderImage} width="500" fluid />
      <h1 className="mt-3">Building Tools For Law Enforcement</h1>
      <h3>Communication Is Key</h3>
      <p className="mx-auto" style={{ maxWidth: "700px" }}>
        SM50 is a tool created for law enforcement to communicate with each
        other in the pursuit of victims and criminals. Our goal is to provide a
        social media like environment for officers to post information about
        traffickers, sex workers or missing persons.
      </p>
      <p className="mx-auto" style={{ maxWidth: "700px" }}>
        We believe that if officers have a central hub to share information with
        other precincts who are fighting the same battle that they will find
        more success in their pursuits.
      </p>
      <p className="mx-auto" style={{ maxWidth: "700px" }}>
        If traffickers and sex workers stay in one area too long they increase
        their chances of being caught. Knowing this, it is essential that law
        enforcement has means of communicating with surrounding colleagues to
        fight this method of evasion.
      </p>
    </div>
    </>
  )
}
