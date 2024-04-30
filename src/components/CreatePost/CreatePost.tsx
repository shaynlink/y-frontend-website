import { useState } from 'react';
import styles from './CreatePost.module.scss';

import defaultLogo from '../../assets/chad_default.png';

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
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.picture} src={defaultLogo} alt="Default logo" />
      </div>
      <div className={styles.subContainer}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={handleContentChange}
          placeholder="What's happening?"
          maxLength={255}
        />
        <div className={styles.toolbar}>
          <button className={styles.submitButton}>Post</button>

          <svg className={styles.iconPicture} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )

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
