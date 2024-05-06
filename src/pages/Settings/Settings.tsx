import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Style from './Settings.module.scss';

const Settings = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        picture: null,
        email: '',
        password: ''
    });

    useEffect(() => {
        
        setFormData({
            username: 'shaynlink',
            picture: null,
            email: 'Seth_Block@hotmail.com',
            password: ''  
        });
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'picture') {
            setFormData(prev => ({ ...prev, picture: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // TODO envoyer les données modifiées au serveur
        navigate(`/profile/${userId}`);
    };

    return (
      <div className={Style.editprofileform}>
      <form onSubmit={handleSubmit}>
      <div>
          <label className={Style.formlabel}>Picture</label>
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
        <div>
          <label className={Style.formlabel}>Email</label>
          <input
            type="email"
            name="email"
            className={Style.forminput}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={Style.formlabel}>Password</label>
          <input
            type="password"
            name="password"
            className={Style.forminput}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={Style.formbutton}>Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
