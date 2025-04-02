
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, Calendar, User } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Card number is too long"),
  cardHolder: z.string().min(2, "Please enter the cardholder name"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use format MM/YY"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4),
});

type FormValues = z.infer<typeof formSchema>;

interface CreditCardFormProps {
  onSubmit: (values: FormValues) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const [flipped, setFlipped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });
  
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(' ');
  };
  
  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else if (digits.length === 2) {
      return `${digits}/`;
    }
    
    return digits;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue('cardNumber', formatted);
    checkFormCompletion();
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue('expiryDate', formatted);
    checkFormCompletion();
  };
  
  const handleCvvFocus = () => {
    setFlipped(true);
  };
  
  const handleCvvBlur = () => {
    setFlipped(false);
    checkFormCompletion();
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('cardHolder', e.target.value);
    checkFormCompletion();
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('cvv', e.target.value);
    checkFormCompletion();
  };

  const checkFormCompletion = () => {
    const values = form.getValues();
    const isComplete = 
      values.cardNumber.replace(/\s/g, '').length >= 16 && 
      values.cardHolder.length >= 2 && 
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiryDate) && 
      values.cvv.length >= 3;
    
    setFormComplete(isComplete);
  };

  // Auto-submit when form is complete
  useEffect(() => {
    if (formComplete && !isSubmitting) {
      handleFormSubmit(form.getValues());
    }
  }, [formComplete]);

  const handleFormSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      onSubmit(values);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className={`relative w-full h-56 bg-gradient-to-br from-green-600 to-green-400 rounded-xl perspective mb-6 transition-transform duration-700 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute inset-0 backface-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start">
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded opacity-80"></div>
              <CreditCard className="text-white/80 h-8 w-8" />
            </div>
            
            <div className="mt-8">
              <div className="font-mono text-xl text-white tracking-wider">
                {form.watch('cardNumber') || '•••• •••• •••• ••••'}
              </div>
            </div>
            
            <div className="mt-auto flex justify-between">
              <div>
                <div className="text-xs text-white/70 uppercase">Card Holder</div>
                <div className="font-mono text-white tracking-wide">
                  {form.watch('cardHolder') || 'YOUR NAME'}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-white/70 uppercase">Expires</div>
                <div className="font-mono text-white tracking-wide">
                  {form.watch('expiryDate') || 'MM/YY'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full flex flex-col">
            <div className="h-12 bg-black/80 w-full mt-6"></div>
            <div className="flex-1 bg-gradient-to-br from-green-600 to-green-400 p-6">
              <div className="h-10 w-full bg-white/90 flex items-center justify-end pr-4 mt-4">
                <div className="font-mono text-gray-800">
                  {form.watch('cvv') || 'CVV'}
                </div>
              </div>
              <div className="mt-6 text-xs text-white/70 text-center">
                The CVV number is the 3 or 4 digit number on the back of your card
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  Card Number
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    {...field} 
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="glass border-white/10 focus-visible:ring-green-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center">
                  <User className="h-4 w-4 text-green-500" />
                  Card Holder
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    onChange={handleCardHolderChange}
                    className="glass border-white/10 focus-visible:ring-green-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4 text-green-500" />
                    Expiry Date
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/YY" 
                      {...field} 
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      className="glass border-white/10 focus-visible:ring-green-500/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123" 
                      {...field} 
                      type="text" 
                      maxLength={4}
                      onFocus={handleCvvFocus}
                      onBlur={handleCvvBlur}
                      onChange={handleCvvChange}
                      className="glass border-white/10 focus-visible:ring-green-500/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default CreditCardForm;
