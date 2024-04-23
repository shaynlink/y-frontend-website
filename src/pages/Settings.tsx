import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
            username: 'Omer82',
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Picture:</label>
                <input
                    type="file"
                    name="picture"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default Settings;
