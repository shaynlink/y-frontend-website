import React, { useState } from 'react';

const CreatePost = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onPostSubmit(content, image);
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', textAlign: 'center' }}>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's happening?"
        style={{ width: '100%', height: '100px' }}
      />
      <input
        type="file"
        onChange={handleImageChange}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <button type="submit" disabled={!content}>Post</button>
    </form>
  );
};

export default CreatePost;
