
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const [selectedHour, setSelectedHour] = useState<string>(
    date ? format(date, 'HH') : '12'
  );
  const [selectedMinute, setSelectedMinute] = useState<string>(
    date ? format(date, 'mm') : '00'
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    date ? (parseInt(format(date, 'HH')) >= 12 ? 'PM' : 'AM') : 'PM'
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    const hours = selectedPeriod === 'PM' && selectedHour !== '12' 
      ? parseInt(selectedHour) + 12 
      : (selectedPeriod === 'AM' && selectedHour === '12' ? 0 : parseInt(selectedHour));
      
    const newDate = new Date(selectedDate);
    newDate.setHours(hours);
    newDate.setMinutes(parseInt(selectedMinute));
    setDate(newDate);
  };

  const handleTimeChange = (hour?: string, minute?: string, period?: string) => {
    if (!date) return;
    
    const newHour = hour !== undefined ? hour : selectedHour;
    const newMinute = minute !== undefined ? minute : selectedMinute;
    const newPeriod = period !== undefined ? period : selectedPeriod;
    
    setSelectedHour(newHour);
    setSelectedMinute(newMinute);
    setSelectedPeriod(newPeriod);
    
    const hours = newPeriod === 'PM' && newHour !== '12' 
      ? parseInt(newHour) + 12 
      : (newPeriod === 'AM' && newHour === '12' ? 0 : parseInt(newHour));
      
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(parseInt(newMinute));
    setDate(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "glass w-full justify-start text-left font-normal border-white/10 hover:bg-white/10",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "glass w-full justify-start text-left font-normal border-white/10 hover:bg-white/10",
                !date && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4 text-green-500" />
              {date ? (
                format(date, "h:mm a")
              ) : (
                <span>Set time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-card border-border" align="start">
            <div className="flex gap-2">
              <Select
                value={selectedHour}
                onValueChange={(value) => handleTimeChange(value, undefined, undefined)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={selectedMinute}
                onValueChange={(value) => handleTimeChange(undefined, value, undefined)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={selectedPeriod}
                onValueChange={(value) => handleTimeChange(undefined, undefined, value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateTimePicker;
