
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, Send, Mic, Paperclip, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [customerName, setCustomerName] = useState('Customer');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, I'll be there in 10 minutes with your fuel delivery", sender: 'customer', time: '10:30 AM' },
    { id: 2, text: "Great! I'm waiting at the location. Can you confirm the total amount again?", sender: 'user', time: '10:32 AM' },
    { id: 3, text: "Sure, it's $45.75 for 10 gallons of premium fuel. You can pay through the app when I arrive.", sender: 'customer', time: '10:33 AM' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Get customer name from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('customerName');
    if (name) {
      setCustomerName(name);
    }
  }, [location]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCall = () => {
    navigate(`/call?customerName=${encodeURIComponent(customerName)}`);
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
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate a reply from the customer
      setTimeout(() => {
        setIsTyping(false);
        const customerReply = {
          id: messages.length + 2,
          text: "Got it! I'll be there soon. Just finalizing another delivery.",
          sender: 'customer',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prevMessages => [...prevMessages, customerReply]);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-green-500 flex items-center justify-center">
              <User className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 className="font-semibold">{customerName}</h2>
              <p className="text-xs text-gray-400">Customer • Online</p>
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
      
      {/* Messages - increased flex-1 to take more space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'customer' && (
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1">
                <User className="h-4 w-4 text-black" />
              </div>
            )}
            <div 
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-green-500 text-white rounded-br-none' 
                  : 'bg-gray-800 text-white rounded-bl-none'
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center mr-2 flex-shrink-0 self-end mb-1">
              <User className="h-4 w-4 text-black" />
            </div>
            <div className="bg-gray-800 rounded-2xl px-4 py-3 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input - fixed at bottom */}
      <div className="p-3 border-t border-gray-800 bg-black">
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-1">
          <button className="mr-2 text-gray-400">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-white py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="mx-2 text-gray-400">
            <Mic className="h-5 w-5" />
          </button>
          <button 
            className={`h-10 w-10 rounded-full flex items-center justify-center ${message.trim() ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-400'}`}
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
