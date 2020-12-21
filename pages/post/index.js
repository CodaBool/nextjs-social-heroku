import React, { useState, useEffect } from 'react'
import Post from '../../components/Post'
import data from '../../constants/data.json'
import axios from 'axios'
import { format } from 'timeago.js'

export default function Posts() {
  const [posts, setPosts] = useState(data)

  useEffect(() => {
    // axios.get('/api/post')
    //   .then(res => {
    //     setPosts(res.data)
    //     console.log(res.data)
    //   })
    //   .catch((err) => {
    //     console.log("error", err)
    //   })
  }, [])

  return (
    <>
      <h1 className="display-3">Latest Posts</h1>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {posts.map((post) => 
          <Post
            title={post.title}
            key={post.title}
            body={post.body}
            id={post.id}
            user={post.user}
            created={post.createdAt}
            updated={post.updatedAt}
            image={post.image}
          />
        )}
      </div>
    </>
  )
}
