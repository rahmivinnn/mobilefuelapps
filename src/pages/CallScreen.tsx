
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PhoneOff, Mic, MicOff, Phone, Users, UserPlus, MoreVertical, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CallScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerName, setCustomerName] = useState('Customer');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callQuality, setCallQuality] = useState(5); // 1-5 quality
  
  useEffect(() => {
    // Get customer name from URL query parameters
    const params = new URLSearchParams(location.search);
    const name = params.get('customerName');
    if (name) {
      setCustomerName(name);
    }
    
    // Random call quality simulator
    const qualityInterval = setInterval(() => {
      setCallQuality(Math.max(3, Math.round(Math.random() * 5)));
    }, 5000);
    
    return () => clearInterval(qualityInterval);
  }, [location]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleEndCall = () => {
    navigate(-1);
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };
  
  const handleOpenChat = () => {
    navigate(`/chat?customerName=${encodeURIComponent(customerName)}`);
  };
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center px-4">
      {/* Signal quality indicators */}
      <div className="absolute top-10 left-0 right-0 flex justify-center">
        <div className="flex space-x-1 items-end">
          {[1, 2, 3, 4, 5].map((level) => (
            <div 
              key={level}
              className={`w-1 rounded-t-sm ${level <= callQuality ? 'bg-green-500' : 'bg-gray-700'}`}
              style={{ height: `${6 + level * 4}px` }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Caller Info */}
      <div className="flex flex-col items-center mt-20 mb-10">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-500 bg-green-500 flex items-center justify-center">
            <User className="h-20 w-20 text-black" />
          </div>
          <motion.div 
            className="absolute -inset-1 rounded-full border-2 border-green-500 opacity-50"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        
        <h2 className="text-3xl font-bold mt-6 text-white">{customerName}</h2>
        <p className="text-xl text-gray-400 mt-2">{formatTime(callDuration)}</p>
        <p className="text-green-500 text-sm mt-1">
          {callQuality >= 4 ? "Excellent connection" : callQuality >= 3 ? "Good connection" : "Weak connection"}
        </p>
        
        {/* Voice waveform animation */}
        <div className="flex items-center justify-center space-x-1 mt-5 h-5">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-500 rounded-full"
              initial={{ height: 5 }}
              animate={{ height: [5, 15, 10, 20, 5][Math.floor(Math.random() * 5)] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Call Controls */}
      <div className="grid grid-cols-3 gap-5 w-full max-w-md">
        <button 
          onClick={handleToggleMute}
          className={`flex flex-col items-center ${isMuted ? 'text-red-500' : 'text-white'}`}
        >
          <div className={`w-14 h-14 rounded-full ${isMuted ? 'bg-red-500/20' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </div>
          <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
        
        <button 
          onClick={handleOpenChat}
          className="flex flex-col items-center text-white"
        >
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <MessageSquare size={24} />
          </div>
          <span className="text-xs">Chat</span>
        </button>
        
        <button 
          onClick={handleToggleSpeaker}
          className={`flex flex-col items-center ${isSpeakerOn ? 'text-green-500' : 'text-white'}`}
        >
          <div className={`w-14 h-14 rounded-full ${isSpeakerOn ? 'bg-green-500/20' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
          </div>
          <span className="text-xs">{isSpeakerOn ? 'Speaker On' : 'Speaker'}</span>
        </button>

        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <UserPlus size={24} />
          </div>
          <span className="text-xs">Add Call</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <Users size={24} />
          </div>
          <span className="text-xs">Contacts</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <MoreVertical size={24} />
          </div>
          <span className="text-xs">More</span>
        </button>
      </div>
      
      {/* End Call Button */}
      <div className="mt-auto mb-16 py-8">
        <button 
          onClick={handleEndCall}
          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse-slow transition-transform duration-300 hover:scale-110"
        >
          <Phone className="w-8 h-8 text-white transform rotate-135" />
        </button>
      </div>
      
      {/* Call quality info */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="text-xs text-gray-500">
          {callQuality >= 4 ? "HD Voice" : callQuality >= 3 ? "Voice" : "Low Quality"}
        </p>
      </div>
    </div>
  );
};

export default CallScreen;
