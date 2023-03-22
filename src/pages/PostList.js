import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import { Link } from 'react-router-dom'

function BlogPosts() {
  const [posts, setPosts] = useState([])
  const [selectedPostIds, setSelectedPostIds] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

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

  function toggleComments(postId) {
    if (selectedPostIds.includes(postId)) {
      setSelectedPostIds(selectedPostIds.filter(id => id !== postId))
    } else {
      setSelectedPostIds([...selectedPostIds, postId])
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber)
  }

  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const userImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg'
  ]

  const [postImages, setPostImages] = useState({})

  function getRandomUserImage(postId) {
    if (!postImages[postId]) {
      // Generate a random user image URL for this post and save it in the map
      const index = Math.floor(Math.random() * userImages.length)
      postImages[postId] = userImages[index]
      setPostImages(postImages)
    }
    return postImages[postId]
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-3">Alkabot Blog</h1>
        <div className="row">
          {currentPosts.map(post => (
            <div key={post.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <img
                  src={getRandomUserImage(post.id)}
                  width={150}
                  height={150}
                  className="rounded mx-auto mt-2"
                  alt="User"
                />
                <div className="card-body">
                  <Link to={`/post/${post.id}`}>
                    <h5 className="card-title mx-auto">{post.title}</h5>
                  </Link>
                  <p className="card-text">{post.body}</p>
                  <button
                    className="btn btn-primary mx-auto d-flex"
                    onClick={() => toggleComments(post.id)}
                  >
                    {selectedPostIds.includes(post.id)
                      ? 'Hide Comments'
                      : 'Show Comments'}
                  </button>
                  {selectedPostIds.includes(post.id) && (
                    <Comments postId={post.id} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="col">
            <nav>
              <ul className="pagination justify-content-center d-none d-md-flex">
                {pageNumbers.map(number => (
                  <li
                    key={number}
                    className={`page-item${
                      currentPage === number ? ' active' : ''
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="d-md-none">
                <nav>
                  <ul className="pagination justify-content-between">
                    {currentPage > 1 && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                    )}
                    <li className="page-item">
                      <span className="page-link">{currentPage}</span>
                    </li>
                    {currentPage < pageNumbers.length && (
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPosts
