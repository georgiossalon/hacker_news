import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Posts from 'views/pages/Posts';
import Post from 'views/pages/Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/:postId" element={<Post />} />
    </Routes>
  );
}

export default App;
