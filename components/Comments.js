import React, { useState, useEffect, useRef, useCallback } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { format } from 'timeago.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ArrowClockwise } from 'react-bootstrap-icons'
import axios from 'axios'

export default function NewComments({ id, setCommentsLoaded, scrollToTop }) {
  const [comments, setComments] = useState([])
  const [spin, setSpin] = useState('')
  const comment = useRef(null)

  
  // function fetchComments() {
  //   axios.get(`/api/comment/${id}`)
  //   .then(res => { // show comments in reverse order so newest are first
  //     setComments(res.data.reverse()) 
  //     setCommentsLoaded(true)
  //   })
  //   .catch((err) => {
  //     console.log("error", err)
  //   })
  // }

  const fetchComments = useCallback(() => {
    axios.get(`/api/comment/${id}`)
      .then(res => { // show comments in reverse order so newest are first
        setComments(res.data.reverse()) 
        setCommentsLoaded(true)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [id, setCommentsLoaded])
  
  function onSubmit(e) {
    e.preventDefault()
    axios.post('/api/comment', {postId: id, body: comment.current.value, createdBy: 'Placeholder'})
      .then(res => {
        comment.current.value = '' // clear comment input
        fetchComments() // inefficiently replace comment array
        scrollToTop(true)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }
  function refreshComments() {
    setSpin('spin')
    setTimeout(() => setSpin(''), 2000)
    fetchComments()
  }
  
  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <>
    <Button variant="outline-primary" className="float-right" onClick={refreshComments}>
      <div className={`${spin} pb-1`}>
        <ArrowClockwise size={20}/>
      </div>
    </Button>
    <ListGroup variant="flush">
      {comments.map(com => (
        <ListGroup.Item key={com._id}>
          <p className="text-muted">{format(com.updatedAt)}</p>
          <p>{com.body}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="inputComment">
        <Form.Label>Add Comment</Form.Label>
        <Form.Control as="textarea" rows={3} ref={comment} />
      </Form.Group>
      <Button variant="success" type="submit">Submit Comment</Button>
    </Form>
    </>
  )
}
