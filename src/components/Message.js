import React from 'react';
import './Message.css';

function Message({ role, text }) {
  return (
    <div className={`message message-${role}`}>
      <div className="message-bubble">
        {text.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default Message; 