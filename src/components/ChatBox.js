import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import './ChatBox.css';

const BASE_URL = "https://huynhtrungkiet09032005-gpt1.hf.space";

function ChatBox({ messages, setMessages }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesListRef = useRef();

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setLoading(true);

    try {
      console.log('Sending request to:', `${BASE_URL}/generate`);
      console.log('Request payload:', {
        prompt: input,
        max_length: 350,
        temperature: 1.0
      });

      const response = await fetch(`${BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          max_length: 200,
          temperature: 1.0
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to generate poetry: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      // Process the generated text to remove lines containing ":" and keep only complete lines
      const rawText = data.generated_text || 'Xin lỗi, không thể tạo thơ lúc này.';
      // Find the last complete newline
      const lastNewlineIndex = rawText.lastIndexOf('\n');
      const processedText = (lastNewlineIndex !== -1 ? rawText.substring(0, lastNewlineIndex) : rawText)
        .split('\n')
        .filter(line => !line.includes(':'))
        .filter(line => line.trim() !== '') // Remove empty lines
        .join('\n')
        .replace(/\n\n/g, '\n') // Replace double newlines with single newline
        .trim();
      
      // Ensure the number of lines is divisible by 4
      const lines = processedText.split('\n');
      const numLines = lines.length;
      const remainder = numLines % 4;
      const adjustedLines = remainder === 0 ? lines : lines.slice(0, numLines - remainder);
      
      // Add newline after every 4 lines
      const finalText = adjustedLines.reduce((acc, line, index) => {
        if (index > 0 && index % 4 === 0) {
          return acc + '\n' + line;
        }
        return acc + (index === 0 ? '' : '\n') + line;
      }, '');
      
      // Add bot response with the processed text
      setMessages(prev => [
        ...prev,
        { 
          role: 'bot', 
          text: finalText
        }
      ]);
    } catch (error) {
      console.error('Error generating poetry:', error);
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: `Xin lỗi, đã có lỗi xảy ra khi tạo thơ: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbox-container">
      <div className="messages-list" ref={messagesListRef}>
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} text={msg.text} />
        ))}
        {loading && <Message role="bot" text="Đang sinh thơ..." />}
      </div>
      <div className="input-row">
        <input
          type="text"
          placeholder="Nhập từ khóa để làm thơ"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()} aria-label="Gửi">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBox; 