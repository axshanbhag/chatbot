import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../App.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const chatEndRef = useRef(null);

    const sendMessage = async () => {
        if (message.trim()) {
            setChat(prev => [...prev, { user: 'You', text: message }]);
            setMessage('');
            try {
                const response = await axios.post('http://localhost:8000/api/chat', { message });
                setChat(prev => [...prev, { user: 'AI', text: response.data.reply }]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Scroll to bottom when chat updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    return (
        <div className="Floating-chat" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', height: '60%', }}>
            <div className="Floating-chat-messages">
                {chat.map((msg, index) => (
                    <p 
                        key={index} 
                        style={{ margin: '0.5rem 0', textAlign: msg.user === 'You' ? 'right' : 'left' }}
                    >
                        <strong>{msg.user}:</strong> <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </p>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="Floating-chat-input-row">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="Floating-chat-input"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                    onClick={sendMessage} 
                    className="App-submit"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
