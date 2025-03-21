
import React, { useState } from 'react';
import { User, CreditCard, Bell, Shield, Wallet, Clock, ChevronRight, LogOut } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

const paymentHistory = [
  {
    id: '1',
    stationName: 'Shell Gas Station',
    date: 'Apr 23, 2023',
    amount: 18.95,
    method: 'Credit Card'
  },
  {
    id: '2',
    stationName: 'ExxonMobil',
    date: 'Apr 15, 2023',
    amount: 24.73,
    method: 'Apple Pay'
  },
  {
    id: '3',
    stationName: 'Chevron',
    date: 'Apr 3, 2023',
    amount: 12.49,
    method: 'Venmo'
  }
];

const Settings: React.FC = () => {
  return (
    <>
      <Header showBack title="Account & Settings" />
      
      <main className="page-container pb-20">
        {/* Profile section */}
        <div className="mb-6 glass card-shadow rounded-xl p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold mr-4">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
            <button className="ml-auto bg-muted/50 h-10 w-10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Account & Preferences section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Account & Preferences</h3>
          <div className="space-y-3">
            <div className="glass card-shadow p-4 rounded-xl flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Payment Methods</h4>
                <p className="text-xs text-muted-foreground">Manage your payment options</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="glass card-shadow p-4 rounded-xl flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                <Bell className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Notifications</h4>
                <p className="text-xs text-muted-foreground">Customize your alerts</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="glass card-shadow p-4 rounded-xl flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Privacy & Security</h4>
                <p className="text-xs text-muted-foreground">Manage your account security</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        {/* Payment History */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Payment History</h3>
          <div className="glass card-shadow rounded-xl overflow-hidden">
            {paymentHistory.map((payment, index) => (
              <div 
                key={payment.id}
                className={`p-4 flex justify-between items-center ${index !== paymentHistory.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                    <Wallet className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{payment.stationName}</h4>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{payment.method}</p>
                </div>
              </div>
            ))}
            
            <div className="p-4 text-center">
              <button className="text-green-500 text-sm hover:underline">View All Transactions</button>
            </div>
          </div>
        </div>
        
        {/* Logout button */}
        <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500/10 transition-colors">
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </main>
      
      <BottomNav />
    </>
  );
};

export default Settings;
