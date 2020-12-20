import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import axios from "axios"
import { Plus } from 'react-bootstrap-icons'
// import bsCustomFileInput from 'bs-custom-file-input'

export default function NewPost() {
  const { handleSubmit, control, register } = useForm()
  const [show, setShow] = useState(false)

  const onSubmit = (data) => {
    console.log('form data', data)
    setShow(true)
    // const formData = new FormData();
    // formData.append('imagePost', data.postImage[0])
    // formData.append('imagePerson', data.imagePerson[0])
    // formData.append('title', data.title);
    // formData.append('firstName', data.firstName);
    // formData.append('lastName', data.lastName);
    // formData.append('email', data.email);
    // formData.append('alias', data.alias);
    // formData.append('age', data.age);
    // formData.append('lastLocation', data.lastLocation);
    // formData.append('type', data.type);
    // formData.append('status', data.status);

    // axios.post('/api/post', formData, config)
    //   .then((res) => {
    //     console.log(res)
    //     history.push(`/posts`)
    //   })
    //   .catch((err) => {
    //     alert(err)
    //   })
  }
  useEffect(() => {
    // bsCustomFileInput.init()
  }, [])
  
  return (
    <>
      {/* Modal informing about test payment info */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>This is a Test Environment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This application has been frozen and no new posts can be made</p>
          <p>You can view already submitted posts at the browse tab</p>
        </Modal.Body>
        <Modal.Footer>
          <p>Thanks for visiting!</p>
        </Modal.Footer>
      </Modal >

      {/* Form */}
      <h1 className="display-6 mb-2">Create New Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Accordion defaultActiveKey="0" className="wave">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Basic Info <Plus size={25}/>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    type="text"
                    name="title"
                    defaultValue=""
                    placeholder="Title"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Controller 
                    as={<Form.Control as="textarea" />} 
                    control={control} 
                    name="description"
                    rows="5"
                    defaultValue=""
                    placeholder="Description"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.File 
                    label="Post Image"
                    custom
                    name="postImage"
                    ref={register}
                  />
                </Form.Group>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Person <Plus size={25} className="" />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
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
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="email"
                    defaultValue=""
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alias</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="alias"
                    defaultValue=""
                    placeholder="Alias"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="age"
                    defaultValue=""
                    placeholder="Age"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Location</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="lastLocation"
                    defaultValue=""
                    placeholder="Last Location"
                  />
                </Form.Group>
                <Form.Label>Type</Form.Label>
                <select className="form-control" ref={register} defaultValue="" name="type">
                  {['Sex Worker', 'Trafficker', 'Missing Person'].map((option, index) => <option key={index}>{option}</option>)}
                </select>
                <Form.Label>Status</Form.Label>
                <select className="form-control" ref={register} defaultValue="" name="status">
                  {['Active', 'Inactive', 'Deceased', 'Missing'].map((option, index) => <option key={index}>{option}</option>)}
                </select>
                <Form.Group>
                  <Form.Label>Image </Form.Label>
                  <Form.File 
                    label="Post Image"
                    custom
                    name="imagePerson"
                    ref={register}
                  />
                </Form.Group>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Row >
          <Button className="mx-auto my-5" style={{width: "20%"}} variant="primary" type="submit">Submit</Button>
        </Row>
      </Form>
    </>
  )
}