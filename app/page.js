'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetch('collection.json')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  const sendMsg = () => {
    if (!username || !messageText) {
      alert("Please make sure that you've entered your name and message...");
      return;
    }

    const now = new Date();
    const newMessage = {
      user: username,
      text: messageText,
      time: now.toISOString()
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const downloadJson = () => {
    const jsonString = JSON.stringify(messages, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'messages.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="input-part">
        <input
          id="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          required
        />
        <textarea
          id="msg-text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder='Your massage'
          required
        ></textarea>
        <button onClick={sendMsg}>Send</button>
      </div>
      <div id="something-idk">
        {messages.map((msg, index) => (
          <div key={index} className="msg-box">
            <strong>{msg.user}:</strong> {msg.text} <em>({msg.time})</em>
          </div>
        ))}
      </div>
      <div className="download-btn">
        <button onClick={downloadJson}>Download JSON</button>
      </div>
    </div>
  );
}
