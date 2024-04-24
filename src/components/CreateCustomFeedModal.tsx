import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); 

const CreateCustomFeedModal = ({ isOpen, onClose, onCreateFeed }) => {
  const [userQuery, setUserQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/users/search?query=${userQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSelectUser = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSubmit = () => {
    onCreateFeed(selectedUsers);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Create Custom Feed</h2>
      <input
        type="text"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} onClick={() => handleSelectUser(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Create Feed</button>
    </Modal>
  );
};

export default CreateCustomFeedModal;
