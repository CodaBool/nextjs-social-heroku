import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"
import { Plus } from 'react-bootstrap-icons'

export default function EditPost(props) {
  const { handleSubmit, control, register } = useForm()
  const history = useHistory()

  if (props.location.state === undefined) { // user got to page with no router location data
    return <Redirect to={{pathname: "/posts"}} />
  }

  // WARNING: risky variable assignment, possible that state could be null
  let id = props.location.state.id
  let post = props.location.state.post

  const onSubmit = (data) => {
    axios.put(`/api/post/${id}`, data)
      .then((res) => {
        history.push({
          pathname: '/post',
          state: { id }
        })
      })
      .catch((err) => {
        alert(err)
      });
  }
  return (
    <>
      <h1 className="display-6 mb-2">Update Post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Accordion defaultActiveKey="0">
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
                    defaultValue={post.title}
                    placeholder="Title"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Controller 
                    as={<Form.Control as="textarea" />} 
                    control={control} 
                    name="description"
                    rows="5"
                    defaultValue={post.description}
                    placeholder="Description"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  {/* This will not display your selected file by default. This requires 'npm i bs-custom-file-input' */}
                  <Controller 
                    as={<Form.File />} 
                    control={control} 
                    name="imagePost"
                    custom
                    defaultValue=""
                    label="Image Upload"
                  />
                </Form.Group>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Person <Plus size={25}/>
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
                        defaultValue={post.firstName ? post.firstName : ''}
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
                        defaultValue={post.lastName ? post.lastName : ''}
                        placeholder="Last name" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Alias</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="alias"
                    defaultValue={post.alias ? post.alias : ''}
                    placeholder="Alias"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="age"
                    defaultValue={post.age ? post.age : ''}
                    placeholder="Age"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Location</Form.Label>
                  <Controller 
                    as={<Form.Control />} 
                    control={control} 
                    name="lastLocation"
                    defaultValue={post.lastLocation ? post.lastLocation : ''}
                    placeholder="Last Location"
                  />
                </Form.Group>
                <Form.Label>Type</Form.Label>
                <select className="form-control" ref={register} defaultValue={post.type ? post.type : ''} name="type">
                  {['Sex Worker', 'Trafficker', 'Missing Person'].map((option, index) => <option key={index}>{option}</option>)}
                </select>
                <Form.Label>Status</Form.Label>
                <select className="form-control" ref={register} defaultValue={post.status ? post.status : ''} name="status">
                  {['Active', 'Inactive', 'Deceased', 'Missing'].map((option, index) => <option key={index}>{option}</option>)}
                </select>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  {/* This will not display your selected file by default. This requires 'npm i bs-custom-file-input' */}
                  <Controller 
                    as={<Form.File />} 
                    control={control} 
                    name="imagePerson"
                    custom
                    defaultValue=""
                    label="Image Upload"
                  />
                </Form.Group>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Row >
          <Button className="mx-auto my-5" style={{width: "20%"}} variant="primary" type="submit">Update Post</Button>
        </Row>
      </Form>
    </>
  )
}

