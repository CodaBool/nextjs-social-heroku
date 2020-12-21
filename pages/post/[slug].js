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

export async function getStaticProps(context) {
  let products = []
  let totalPages = 1
  let { slug } = context.params

  const all = await stripe.products.list({limit: 100, active: true}) // starting_after: pagination, uses id
  if (all) {
    totalPages = Math.ceil(all.data.length / PRODUCTS_PER_PAGE) || 1
    
    // Splits products into small arrays of the max page size
    let i = 0, j, tempArr, chunk = PRODUCTS_PER_PAGE, splitArr = []
    for (i = 0 , j = all.data.length; i < j; i += chunk) {
      tempArr = all.data.slice(i, i + chunk)
      splitArr.push(tempArr)
    }
    products = splitArr[slug - 1]

  } else {
    console.log('could not find products')
  }
  return { props: {products, totalPages, slug } }
}

export async function getStaticPaths() {
  let paths = []
  if (stripe) {
    const products = await stripe.products.list({limit: 100, active: true}) // starting_after: pagination, uses id
    if (products) {
      const pages = Math.ceil(products.data.length / PRODUCTS_PER_PAGE) || 1
      paths = makeArr(pages).map(page => ({
        params: { slug: page },
      }))
    } else {
      console.log('no products found')
    }
  } else {
    console.log('could not make instantiate stripe')
  }
  console.log('browse/[slug] paths', paths)
  return { paths, fallback: false } // { fallback: false } means other routes should 404.
}

// singlePost
// import React, { useEffect, useState, useRef, useCallback } from 'react'
// import axios from 'axios'
// import Comments from './Comments'
// import Spinner from 'react-bootstrap/Spinner'
// import Button from 'react-bootstrap/Button'
// // import Card from 'react-bootstrap/Card'
// import { useHistory } from 'react-router-dom'
// import { format } from 'timeago.js'
// import Modal from 'react-bootstrap/Modal'
// import memoize from "fast-memoize";
// // import Post from './Post'

// export default function SinglePost(props) {
//   const [show, setShow] = useState(false);
//   const [commentsLoaded, setCommentsLoaded] = useState(false);
//   const [post, setPost] = useState()
//   const commentSection = useRef(null)
//   const history = useHistory()
//   const closeModal = () => setShow(false);
//   let id

//   if (props.location.state) {
//     id = props.location.state.id
//   }

//   useEffect(() => { // get post
//     axios.get(`/api/post/${id}`)
//       .then(res => {
//         console.log(res.data)
//         setPost(res.data)
//       })
//       .catch((err) => {
//         console.log("error", err)
//       })
//   }, [id])


//   const scrollToTop = useCallback(memoize((force) => {
//     if ((commentSection.current && history.location.hash) || (force && commentSection.current)) {
//       commentSection.current.scrollIntoView({
//         behavior: "smooth",
//       })
//     }
//   }, []))

//   function handleEdit() {
//     history.push({
//       pathname: '/edit',
//       state: { id: props.location.state.id, post }
//     })
//   }

//   useEffect(() => {
//     scrollToTop()
//   }, [commentsLoaded, history.location.hash, scrollToTop])

//   function handleDelete() {
//     closeModal()
//     axios.delete(`/api/post/${id}`)
//       .then(res => {
//         history.push('/')
//       })
//       .catch((err) => {
//         alert('Could Not Delete Post')
//         console.log("error", err)
//       })
//   }

//   return (
//     <>
//       {post 
//         ? 
//         <>
//           <h1>{post.title}</h1>
//           <h6 className="text-muted">Created: {format(post.createdAt)} || Updated: {format(post.updatedAt)}</h6>
//           <img src={post.picture} alt="post_image" style={{maxWidth: "500px"}}/>
          
//           <div>
//             <hr></hr>
//             <h4 className="card-title mb-3 text-muted">Description:</h4>
//             <h5 className="card-subtitle">{post.description}</h5>
//           </div>
          
//           <div>
//           <br></br>
//             <b>Name:</b> {post.firstName +  ' ' + post.lastName}
//             <br></br>
//             <b>Alias:</b> {post.alias}
//             <br></br>
//             <b>Age:</b> {post.age}
//             <br></br>
//             <b>Status:</b> {post.status}
//             <br></br>
//             <b>Type:</b> {post.type}
//             <br></br>
//             <b>Last Known Location:</b> {post.lastLocation}
//             <hr></hr>
//             <h4 className="card-title mb-3 text-muted">Comments:</h4>
//           </div>
          

//           <a href="!#" disabled ref={commentSection} style={{opacity: '0', pointerEvents: 'none'}}>comments</a>
//           <Comments id={id} setCommentsLoaded={setCommentsLoaded} scrollToTop={scrollToTop} />
//           <div className="my-5 float-right">
//             <Button variant="btn btn-primary" className="w-30 mr-2 mb-5" onClick={handleEdit}>Edit Post</Button>
//             <Button variant="btn btn-danger" className="w-30 mb-5" onClick={() => setShow(true)}>Delete Post</Button>
//           </div>
//         </>
//         : 
//         <>
//           <Spinner animation="border" variant="info" style={{margin: '20% auto 0 auto', display: 'block'}} />
//           <h4 className="text-center m-3 fadeOnLoad">Loading...</h4>

//           {/* TODO: handle post not found better than this message */}
//           <h4 className="text-center m-3 errorFade">An error may have occured</h4>
//         </>
//       }
//       {/* Modal */}
//       <Modal show={show} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Post?</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <p>Delete this post and lose all data tied to the post.</p>
//           <p className="text-muted">This action is permanent and cannot be undone.</p>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="outline-primary w-75 mx-auto" onClick={closeModal}>Cancel</Button>
//           <Button variant="danger" onClick={handleDelete}>Delete</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

