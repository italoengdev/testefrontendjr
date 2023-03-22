import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostList from './pages/PostList'
import UserDetails from './pages/UserDetails'
import Post from './pages/Post'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route exact path="/users" element={<UserDetails />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </Router>
  )
}

export default App
