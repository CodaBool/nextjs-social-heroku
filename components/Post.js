import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import axios from 'axios'
import { format } from 'timeago.js'
import { useRouter } from 'next/router'

export default function Post({ title, body, created, updated, image, id, user }) {
  // const [comments, setComments] = useState([])
  // useEffect(() => {
  //   axios.get(`/api/comment/${props.id}`)
  //     .then(res => {
  //       setComments(res.data)
  //     })
  //     .catch((err) => {
  //       console.log("error", err)
  //     })
  // }, [props.id])
  
  const router = useRouter()

  function handleClick() {
    window.scrollTo(0,0)
    router.push(`/post/${id}`)
  }

  return (
    <Card className="Post" onClick={handleClick}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        {/* <Card.Img className="mb-3" src={image}></Card.Img> */}
        <Card.Title>{title}</Card.Title>
        <Card.Text>&emsp;{body.substring(0, 300)}...</Card.Text>
        <Card.Text>Created: {created}</Card.Text>
        {/* <Card.Link onClick={commentClick}>{<p>Comments: {comments.length}</p>}</Card.Link> */}
        <small className="mb-2 text-muted">Last Updated: {format(updated)} || Create by: {user}</small>
      </Card.Body>
    </Card>
  );
}
