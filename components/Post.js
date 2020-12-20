import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import axios from 'axios'
import { format } from 'timeago.js'

// use Bootstrap Cards for this component
export default function Post(props) {
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios.get(`/api/comment/${props.id}`)
      .then(res => {
        setComments(res.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [props.id])

  function commentClick(e) {
    e.stopPropagation()
    history.push({
      pathname: '/post', 
      hash: '#comments',
      state: { id: props.id }
    })
  }

  return (
    <Card className="Post" onClick={props.clickPost}>
      <Card.Body>
        <Card.Img className="mb-3" src={props.image}></Card.Img>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        <Card.Link onClick={commentClick}>{<p>Comments: {comments.length}</p>}</Card.Link>
        <small className="mb-2 text-muted">Last Updated: {format(props.updated)} || Create by: {props.userId}</small>
      </Card.Body>
    </Card>
  );
}
