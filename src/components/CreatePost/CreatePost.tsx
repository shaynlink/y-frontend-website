import { useContext, useState } from 'react';
import styles from './CreatePost.module.scss';

import defaultLogo from '../../assets/chad_default.png';
import { UserContext } from '../../contexts/UsersContext';

interface CreatePostProps {
  onPostSubmit: (text: string, files: File[]) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const picture = !user?.picture
    ? defaultLogo
    : `https://storage.googleapis.com/y-bucket-cdn/${user._id}/${user.picture}`;

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.picture} src={picture} alt="Default logo" />
      </div>
      <form className={styles.subContainer} onSubmit={(ev) => {
        ev.preventDefault();
        onPostSubmit(text, files);
        setText('');
        setFiles([]);
      }}>
        <textarea
          className={styles.textarea}
          placeholder="What's happening?"
          maxLength={255}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          {files && (
            <div className={styles.imagePreview}>
              {[...files].map((file) => (
                <img
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={150}
                  height={150}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.toolbar}>
          <button className={styles.submitButton}>Post</button>
          <label>
            <input
              type="file"
              name="images"
              accept="image/*"
              style={{
                display: 'none',
              }}
              onChange={(e) => {
                const medias = [
                  e.target.files?.item(0),
                  e.target.files?.item(1),
                  e.target.files?.item(2),
                  e.target.files?.item(3),
                ]
                setFiles(medias.filter((m) => m) as File[]);
              }}
              max={4}
              multiple
            />
            <svg
              className={styles.iconPicture}
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </label>
        </div>
      </form>
      <div className={styles.separator}></div>
    </div>
  )
}
