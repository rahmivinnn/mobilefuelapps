
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, Send, Image, Mic, Paperclip, X, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [driverName, setDriverName] = useState('Driver');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, I'll be there in 10 minutes with your fuel delivery", sender: 'driver', time: '10:30 AM' },
    { id: 2, text: "Great! I'm waiting at the location. Can you confirm the total amount again?", sender: 'user', time: '10:32 AM' },
    { id: 3, text: "Sure, it's $45.75 for 10 gallons of premium fuel. You can pay through the app when I arrive.", sender: 'driver', time: '10:33 AM' },
  ]);

  // Get driver name from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('driverName');
    if (name) {
      setDriverName(name);
    }
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCall = () => {
    navigate(`/call?driverName=${encodeURIComponent(driverName)}`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate a reply from the driver
      setTimeout(() => {
        const driverReply = {
          id: messages.length + 2,
          text: "Got it! I'll be there soon. Just finalizing another delivery.",
          sender: 'driver',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prevMessages => [...prevMessages, driverReply]);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-green-500 flex items-center justify-center">
              <User className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 className="font-semibold">{driverName}</h2>
              <p className="text-xs text-muted-foreground">Driver • Online</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleCall}
          className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Phone className="h-5 w-5 text-black" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-green-500 text-white rounded-br-none' 
                  : 'bg-card border border-border rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-muted-foreground'}`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center bg-card rounded-full px-4 py-2 border border-border">
          <button className="mr-2 text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="mx-2 text-muted-foreground">
            <Mic className="h-5 w-5" />
          </button>
          <button 
            className={`h-10 w-10 rounded-full ${message.trim() ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
