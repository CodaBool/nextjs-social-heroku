import React, { useState, useEffect } from 'react'
import Post from '../../components/Post'
import axios from 'axios'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('/api/post')
      .then(res => {
        setPosts(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [])

  function clickedPost(id) {
    history.push({
      pathname: '/post',
      state: { id }
    })
  }

  return (
    <>
    {/*<h2>Welcome Back **USER FIRST NAME HERE** ! </h2> */}
      <hr></hr>
      <h1>Latest Posts</h1>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {posts.map((post) => <Post
            title={post.title}
            key={post._id}
            id={post._id}
            body={post.description}
            userId={post.createdBy}
            created={post.createdAt}
            updated={post.updatedAt}
            image={post.picture}
            clickPost={() => clickedPost(post._id)}
          />
        )}
      </div>
    </>
  )
}
