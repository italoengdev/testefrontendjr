import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Comments({ postId }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        setComments(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [postId])

  return (
    <div className="card mt-3 bg-secondary">
      <div className="card-header">
        <h5>Comments</h5>
      </div>
      <ul className="list-group list-group-flush ">
        {comments.map(comment => (
          <li key={comment.id} className="list-group-item bg-light">
            <h5>Name: {comment.name}</h5>
            <h6>{comment.email}</h6>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
