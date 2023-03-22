import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Comments from './Comments'

function Post() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        setPost(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [postId])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-secondary mb-3 mx-auto">
              Back to All Posts
            </Link>
          </div>
          <h1 className="text-center mb-4">{post.title}</h1>
          <h4>{post.body}</h4>
          <Comments postId={postId} />
        </div>
      </div>
    </div>
  )
}

export default Post
