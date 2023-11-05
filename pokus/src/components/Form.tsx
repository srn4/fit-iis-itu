import React, { useState } from 'react';
import "./Form.css";
import axios from 'axios';

const Form: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/create-group', { name: inputValue })
            .then((response) => {
                console.log('Group created successfully');
            })
            .catch((error) => {
                console.error('Error creating group:', error);
            });
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
          />
          <button type="submit">Přidat Skupinu</button>
        </div>
      </form>
    </div>
  );
};

export default Form;

