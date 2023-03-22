import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from './Comments'

function BlogPosts() {
  const [posts, setPosts] = useState([])
  const [selectedPostId, setSelectedPostId] = useState(null)

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => showComments(post.id)}
                >
                  Show Comments
                </button>
                {selectedPostId === post.id && (
                  <Comments postId={selectedPostId} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  function showComments(postId) {
    setSelectedPostId(postId)
  }
}

export default BlogPosts
