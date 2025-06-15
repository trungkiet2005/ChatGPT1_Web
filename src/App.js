import React, { useState, useEffect, useRef } from 'react';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Xin chào! Hãy nhập vài từ để mình làm thơ cho bạn.' }
  ]);
  const sidebarRef = useRef();

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Auto-save chat when user sends first message
  useEffect(() => {
    // Save chat automatically when user sends their first message
    if (messages.length >= 3 && !currentChatId && sidebarRef.current) {
      // Check if we have: bot greeting + user message + bot response
      const userMessages = messages.filter(msg => msg.role === 'user');
      const botResponses = messages.filter(msg => msg.role === 'bot');
      
      if (userMessages.length >= 1 && botResponses.length >= 2) {
        const chatId = sidebarRef.current.saveCurrentChat(messages);
        setCurrentChatId(chatId);
      }
    }
  }, [messages, currentChatId]);

  const handleNewChat = () => {
    // Save current chat if it has user messages and doesn't already have an ID
    const hasUserMessage = messages.some(msg => msg.role === 'user' && msg.text?.trim());
    if (hasUserMessage && !currentChatId && sidebarRef.current) {
      sidebarRef.current.saveCurrentChat(messages);
    }
    
    // Reset to initial state
    setMessages([
      { role: 'bot', text: 'Xin chào! Hãy nhập vài từ để mình làm thơ cho bạn.' }
    ]);
    setCurrentChatId(null);
  };

  const handleSelectChat = (chat) => {
    // Save current chat first if it has user messages and doesn't already have an ID
    const hasUserMessage = messages.some(msg => msg.role === 'user' && msg.text?.trim());
    if (hasUserMessage && !currentChatId && sidebarRef.current) {
      sidebarRef.current.saveCurrentChat(messages);
    }
    
    // Load selected chat
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-bg">
      <div className="topbar">
        <div className="topbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3 7h14M3 10h14M3 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <g>
                <circle cx="14" cy="14" r="13" fill="#333" opacity="0.2"/>
                <circle cx="14" cy="14" r="10" fill="#333" opacity="0.4"/>
                <path d="M14 8c-1.5 0-2.7 1.2-2.7 2.7v0.6c0 0.3-0.2 0.5-0.5 0.5h-0.6c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7h0.6c0.3 0 0.5 0.2 0.5 0.5v0.6c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7v-0.6c0-0.3 0.2-0.5 0.5-0.5h0.6c1.5 0 2.7-1.2 2.7-2.7s-1.2-2.7-2.7-2.7h-0.6c-0.3 0-0.5-0.2-0.5-0.5v-0.6C16.7 9.2 15.5 8 14 8z" fill="#333"/>
                <circle cx="14" cy="14" r="2.5" fill="#333" opacity="0.8"/>
                <path d="M12 10l4 8M16 10l-4 8" stroke="#333" strokeWidth="0.8" opacity="0.6"/>
              </g>
            </svg>
          </span>
          <span className="topbar-title">GPT1</span>
        </div>
        <div className="topbar-center">
        </div>
        <div className="topbar-right">
          <button className="topbar-newchat" onClick={handleNewChat}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Tạo chat mới
          </button>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5v15M4.22 4.22l11.56 11.56M2.5 10h15M4.22 15.78L15.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5 5.5 5.5 0 0 0 17.5 12.5z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <Sidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        currentChatId={currentChatId}
      />
      
      <div className="chat-wrapper">
        <ChatBox 
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default App; 