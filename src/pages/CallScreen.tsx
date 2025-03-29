
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneOff, Mic, MicOff, Phone, Users, UserPlus, MoreVertical, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const CallScreen = () => {
  const navigate = useNavigate();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  
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
    navigate('/chat');
  };
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-between py-12 px-6">
      {/* Caller Info */}
      <div className="flex flex-col items-center mt-16">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-500">
            <img 
              src="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png"
              alt="Robin Sharma" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div 
            className="absolute -inset-1 rounded-full border-2 border-green-500 opacity-50"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        
        <h2 className="text-3xl font-bold mt-6 text-white">Robin Sharma</h2>
        <p className="text-xl text-gray-400 mt-2">{formatTime(callDuration)}</p>
      </div>
      
      {/* Call Controls */}
      <div className="grid grid-cols-3 gap-10 mt-10">
        <button 
          onClick={handleToggleMute}
          className={`flex flex-col items-center ${isMuted ? 'text-red-500' : 'text-white'}`}
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </div>
          <span className="text-sm">Mute</span>
        </button>
        
        <button 
          onClick={handleOpenChat}
          className="flex flex-col items-center text-white"
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <MessageSquare size={24} />
          </div>
          <span className="text-sm">Chat</span>
        </button>
        
        <button 
          onClick={handleToggleSpeaker}
          className={`flex flex-col items-center ${isSpeakerOn ? 'text-green-500' : 'text-white'}`}
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
          </div>
          <span className="text-sm">Speaker</span>
        </button>

        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <Mic size={24} />
          </div>
          <span className="text-sm">Record</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <UserPlus size={24} />
          </div>
          <span className="text-sm">Add</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-white"
        >
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
            <MoreVertical size={24} />
          </div>
          <span className="text-sm">More</span>
        </button>
      </div>
      
      {/* End Call Button */}
      <div className="mt-12 mb-8">
        <button 
          onClick={handleEndCall}
          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse-slow transition-transform duration-300 hover:scale-110"
        >
          <Phone className="w-8 h-8 text-white transform rotate-135" />
        </button>
      </div>
    </div>
  );
};

export default CallScreen;
