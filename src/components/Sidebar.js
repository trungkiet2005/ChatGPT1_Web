import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = React.forwardRef(({ isOpen, onClose, onSelectChat, onNewChat, currentChatId }, ref) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveChatHistory = (history) => {
    // Keep only last 50 chats
    const limitedHistory = history.slice(0, 50);
    setChatHistory(limitedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(limitedHistory));
  };

  const saveCurrentChat = (messages) => {
    // Don't save if there's no user message
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (!firstUserMessage || !firstUserMessage.text?.trim()) {
      return; // Don't save chat if user hasn't sent any message
    }
    
    // Use first user message as title
    const cleanText = firstUserMessage.text.trim();
    let chatTitle;
    if (cleanText.length > 50) {
      chatTitle = cleanText.substring(0, 50) + '...';
    } else {
      chatTitle = cleanText;
    }
    
    // Check if this chat already exists (by comparing first user message)
    const existingChat = chatHistory.find(chat => {
      const existingFirstUserMsg = chat.messages.find(msg => msg.role === 'user');
      return existingFirstUserMsg?.text?.trim() === cleanText;
    });
    
    if (existingChat) {
      // Update existing chat instead of creating new one
      const updatedHistory = chatHistory.map(chat => 
        chat.id === existingChat.id 
          ? { ...chat, messages: messages, timestamp: new Date().toISOString() }
          : chat
      );
      saveChatHistory(updatedHistory);
      return existingChat.id;
    }
    
    const chatId = Date.now().toString();
    
    const newChat = {
      id: chatId,
      title: chatTitle,
      messages: messages,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [newChat, ...chatHistory];
    saveChatHistory(updatedHistory);
    return chatId;
  };

  const deleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    saveChatHistory(updatedHistory);
  };

  const handleSelectChat = (chat) => {
    onSelectChat(chat);
    onClose();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Vừa xong';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} phút trước`;
    } else if (diffInMinutes < 1440) { // 24 hours
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      if (diffInDays === 1) {
        return 'Hôm qua';
      } else if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
      } else {
        return date.toLocaleDateString('vi-VN', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        });
      }
    }
  };

  // Expose saveCurrentChat function to parent
  React.useImperativeHandle(ref, () => ({
    saveCurrentChat
  }));

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Lịch sử trò chuyện</h3>
          <button className="sidebar-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <button className="new-chat-btn" onClick={() => { onNewChat(); onClose(); }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Cuộc trò chuyện mới</span>
        </button>

        <div className="chat-list">
          {chatHistory.length === 0 ? (
            <div className="empty-state">
              <p>Chưa có lịch sử trò chuyện</p>
            </div>
          ) : (
            chatHistory.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="chat-item-content">
                  <div className="chat-title">{chat.title}</div>
                  <div className="chat-timestamp">{formatDate(chat.timestamp)}</div>
                </div>
                <button 
                  className="delete-chat"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M7 7v4M9 7v4M3 4l.5 9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
});

export default Sidebar; 