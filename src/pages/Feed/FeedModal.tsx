import { useEffect, useState } from 'react';
import ClickableLayer from '../../components/ClickableLayer/ClickableLayer';
import styles from './Feed.module.scss';
import { getFollowers } from '../../services/AuthService';

import defaultPicture from '../../assets/chad_default.png';

const LIMIT = 1;

interface FeedModalProps {
  handleSubmit: (name: string, users: string[]) => void;
}

export default function FeedModal({ handleSubmit }: FeedModalProps) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [page] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      getFollowers(page, LIMIT)
        .then((response) => {
          console.log(response.data.result);
          if (response.data.result) {
            setUsers(response.data.result);
            setLoading(false);
          }
        })
    }

    loadUsers();
  }, [])

  return (
    <ClickableLayer>
      <div className={styles.clickableContainer}>
        <div className={styles.modal}>
          <div>
            <h2>Create a new feed</h2>
            <h4>Choose name for your new feed</h4>
            <input
              type="text"
              placeholder="Feed name"
              className={styles.input}
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            <h4>Choose the users you want to follow</h4>
            <div className={styles.usersList}>
              {loading && (
                <div className={styles.loading}>
                  <span className={styles.spinner} />
                </div>
              )}
              {!loading && users.map((user: any) => {
                const picture = !user?.picture
                  ? defaultPicture
                  : `https://storage.googleapis.com/y-bucket-cdn/${user?._id}/${user?.picture}`;
                return (
                  <div className={styles.item}>
                    <div>
                      <img src={picture} alt={`Picture of ${user?.username}`} width={40} height={40} style={{ borderRadius: '50%' }} />
                      <p>{user.username}</p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value={user._id}
                        onChange={(evt) => {
                          if (evt.target.checked) {
                            setSelectIds([...selectIds, user._id]);
                          } else {
                            setSelectIds(selectIds.filter((id) => id !== user._id));
                          }
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <button className={styles.button} onClick={() => handleSubmit(name, selectIds)}>Create feed</button>
            </div>
          </div>
        </div>
      </div>
    </ClickableLayer>
  )
}