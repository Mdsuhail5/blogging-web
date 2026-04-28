import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { Blog } from './pages/Blog'
import { FullBlog } from './pages/FullBlog'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Publish } from './components/Publish'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><FullBlog /></ProtectedRoute>} />
          <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
