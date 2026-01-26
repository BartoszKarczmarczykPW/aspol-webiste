"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/types";

interface CalendarWidgetProps {
    events: Event[];
    className?: string;
}

export default function CalendarWidget({ events, className = "" }: CalendarWidgetProps) {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2)); // Start in March 2026 for demo purposes as data is in 2026

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    // Adjust startDay for Monday start (0=Sunday, 1=Monday -> standard JS)
    // We want Monday aligned, usually. Let's stick to Sun-Sat for simplicity in rendering, 
    // or adjust: (startDay + 6) % 7 if we want Monday start. Let's do Standard Sun-Sat.

    const renderDays = () => {
        const dayElements = [];

        // Empty slots for days before start of month
        for (let i = 0; i < startDay; i++) {
            dayElements.push(<div key={`empty-${i}`} className="h-8 md:h-10" />);
        }

        // Days of month
        for (let d = 1; d <= days; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const hasEvent = events.some(e => e.isoDate === dateStr);
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            dayElements.push(
                <div key={d} className="relative h-8 md:h-10 flex items-center justify-center">
                    <div
                        className={`
                            w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-all
                            ${isToday ? 'bg-aspol-red text-white' : ''}
                            ${hasEvent ? 'bg-blue-50 text-aspol-navy font-bold border border-blue-100 hover:bg-aspol-navy hover:text-white cursor-pointer' : 'text-gray-500'}
                        `}
                        title={hasEvent ? "Event this day" : ""}
                    >
                        {d}
                        {hasEvent && !isToday && (
                            <span className="absolute bottom-1 w-1 h-1 bg-aspol-red rounded-full" />
                        )}
                    </div>
                </div>
            );
        }

        return dayElements;
    };

    return (
        <div className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-aspol-navy font-serif">
                    {monthNames[month]} {year}
                </h3>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-center gap-y-1">
                {renderDays()}
            </div>

            {/* Legend / Info */}
            <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-center text-gray-400">
                <span className="inline-block w-2 h-2 rounded-full bg-aspol-red mr-2" />
                Event scheduled
            </div>
        </div>
    );
}
