import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  const handleNewChat = () => {
    window.location.reload(); // Đơn giản: reload để làm mới chat
  };

  return (
    <div className="app-bg">
      <div className="topbar">
        <div className="topbar-left">
          <span className="logo-icon">
            {/* SVG logo giống ChatGPT */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><g><circle cx="14" cy="14" r="14" fill="#10a37f"/><path d="M14 6.5c-2.07 0-3.75 1.68-3.75 3.75v1.25h-1.25A3.75 3.75 0 0 0 5.25 15c0 2.07 1.68 3.75 3.75 3.75h1.25v1.25A3.75 3.75 0 0 0 14 21.5c2.07 0 3.75-1.68 3.75-3.75v-1.25h1.25A3.75 3.75 0 0 0 22.75 13c0-2.07-1.68-3.75-3.75-3.75h-1.25V10.25A3.75 3.75 0 0 0 14 6.5z" fill="#fff"/></g></svg>
          </span>
          <span className="topbar-title">ChatGPT</span>
        </div>
        <button className="topbar-newchat" onClick={handleNewChat}>+ Tạo chat mới</button>
        <div className="topbar-right"></div>
      </div>
      <div className="chat-wrapper">
        <ChatBox />
      </div>
    </div>
  );
}

export default App; 