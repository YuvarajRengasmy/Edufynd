import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBubble = ({ message, time, isSender }) => {
  return (
    <div className={`d-flex ${isSender ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
      <div className={`card ${isSender ? 'bg-success text-white' : 'bg-light'}`} style={{ maxWidth: '50%', fontSize: '0.85rem' }}>
        <div className="card-body p-2" style={{ padding: '5px 10px' }}>
          <p className="mb-1" style={{ marginBottom: '5px' }}>{message}</p>
          <small className={`text-muted ${isSender ? 'text-end' : ''}`} style={{ fontSize: '0.7rem' }}>{time}</small>
        </div>
      </div>
    </div>
  );
};

// Example usage
const App = () => {
  return (
    <div className="container mt-5">
      <ChatBubble message="Hi there!" time="10:30 AM" isSender={false} />
      <ChatBubble message="Hello! How's it going?" time="10:31 AM" isSender={true} />
    </div>
  );
};

export default App;
