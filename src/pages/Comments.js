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
    <div className="card mt-3">
      <div className="card-header">
        <h5>Comments</h5>
      </div>
      <ul className="list-group list-group-flush">
        {comments.map(comment => (
          <li key={comment.id} className="list-group-item">
            <h6>{comment.name}</h6>
            <h6>{comment.email}</h6>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
