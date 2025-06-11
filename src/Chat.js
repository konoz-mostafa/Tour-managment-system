

import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import './Chat.css';
import Chatbachgr from './Chatbachgr.jpg';

const Chat = () => {
  const [role, setRole] = useState('Agency'); // 'Agency' or 'Tourist'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [selectedTouristId, setSelectedTouristId] = useState('');
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub') // تأكد من عنوان الهب
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        console.log('Connected to SignalR');
        connection.invoke('JoinRoom', role);

        connection.on('ReceiveMessage', (sender, message) => {
          setMessages((prevMessages) => [...prevMessages, { sender, message }]);
        });
      })
      .catch((error) => console.error('Connection failed: ', error));

    return () => {
      connection.stop();
    };
  }, [role]);

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // عدل الرابط حسب API عندك
        const data = await response.json();
        setTourists(data);
      } catch (error) {
        console.error('Error fetching tourists:', error);
      }
    };

    if (role === 'Agency') {
      fetchTourists();
    }
  }, [role]);

  const sendMessage = async () => {
    if (message.trim() && connectionRef.current) {
      try {
        if (role === 'Agency') {
          if (!selectedTouristId) {
            alert('Please select a tourist');
            return;
          }
          await connectionRef.current.invoke('SendMessageToUser', selectedTouristId, message);
        } else {
          await connectionRef.current.invoke('SendMessageToRoom', 'Agency', message);
        }

        setMessages((prevMessages) => [...prevMessages, { sender: role, message }]);
        setMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="chatbg" style={{ backgroundImage: `url(${Chatbachgr})` }}>
      <div className="chat-container">
        <h1 className="chat-title" style={{ color: '#176b87' }}>
          {role === 'Agency' ? 'Agency Chat' : 'Tourist Chat'}
        </h1>

        <div className="role-buttons">
          <button onClick={() => setRole('Agency')}>Agency</button>
          <button onClick={() => setRole('Tourist')}>Tourist</button>
        </div>

        {role === 'Agency' && (
          <div className="select-tourist">
            <label>Select Tourist to Chat With:</label>
            <select value={selectedTouristId} onChange={(e) => setSelectedTouristId(e.target.value)}>
              <option value="">-- Select Tourist --</option>
              {tourists.map((tourist) => (
                <option key={tourist.id} value={tourist.id}>
                  {tourist.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

