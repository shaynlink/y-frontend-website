import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UsersContext';
import { updateProfile, updatePicture } from '../../services/AuthService';

import Style from './Settings.module.scss';

import defaultPicture from '../../assets/chad_default.png';

export default function Settings() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user?.username,
    picture: null,
    email: user?.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'picture') {
      setFormData(prev => ({ ...prev, picture: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const updater = [];

    updater.push(updateProfile({
      username: formData.username,
      email: formData.email,
    }));

    if (formData.picture) {
      updater.push(updatePicture(formData.picture as unknown as File));
    }

    await Promise.all(updater)
      .then(() => {
        setIsLoading(false);
        navigate(`/profile/me`);
      })
  };

  const originalPicture = !user?.picture
    ? defaultPicture
    : `https://storage.googleapis.com/y-bucket-cdn/${user._id}/${user.picture}`;

  return (
    <div className={Style.editprofileform}>
      <form onSubmit={handleSubmit}>
      <div>
        <label className={Style.formlabel}>Picture</label>
        <img
          src={formData.picture ? URL.createObjectURL(formData.picture) : originalPicture}
          alt={`Picture of ${user?.username}`}
          width={150}
          height={150}
        />
        <input
          type="file"
          name="picture"
          className={Style.formpicture}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={Style.formlabel}>Username</label>
        <input
          type="text"
          name="username"
          className={Style.forminput}
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className={Style.lastForm}>
        <label className={Style.formlabel}>Email</label>
        <input
          type="email"
          name="email"
          className={Style.forminput}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {isLoading && (
        <div className="loading">
          <span className="spinner" />
        </div>
      )}
      {!isLoading && (
        <button type="submit" className={Style.formbutton}>Save Changes</button>
      )}
    </form>
    </div>
  );
}
