
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PostList/>} />
      </Routes>
    </Router>
  );
}

export default App;
