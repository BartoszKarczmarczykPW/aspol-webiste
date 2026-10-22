"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/types";

interface CalendarWidgetProps {
    events: Event[];
    className?: string;
}

export default function CalendarWidget({ events, className = "" }: CalendarWidgetProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

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
            const hasEvent = events.some(e => e.isoDate && e.isoDate.startsWith(dateStr));
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            dayElements.push(
                <div key={d} className="relative h-8 md:h-10 flex items-center justify-center">
                    <div
                        className={`
                            size-9 md:size-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                            ${isToday ? 'ring-2 ring-aspol-red text-aspol-dark font-bold' : ''}
                            ${hasEvent ? 'bg-aspol-navy text-white font-bold' : 'text-aspol-ink-soft'}
                        `}
                        title={hasEvent ? "Event this day" : ""}
                    >
                        {d}
                        {hasEvent && !isToday && (
                            <span className="absolute bottom-0.5 size-1.5 rounded-full bg-aspol-red" />
                        )}
                    </div>
                </div>
            );
        }

        return dayElements;
    };

    return (
        <div className={`rounded-[2rem] bg-aspol-white p-6 sm:p-10 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="display display-sm">
                    {monthNames[month]} {year}
                </h3>
                <div className="flex gap-2">
                    <button type="button" onClick={prevMonth} aria-label="Previous month" className="grid size-11 place-items-center rounded-full bg-aspol-mist text-aspol-dark transition-colors hover:bg-aspol-navy hover:text-white">
                        <ChevronLeft size={20} />
                    </button>
                    <button type="button" onClick={nextMonth} aria-label="Next month" className="grid size-11 place-items-center rounded-full bg-aspol-mist text-aspol-dark transition-colors hover:bg-aspol-navy hover:text-white">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="font-display text-xs font-bold text-aspol-ink-soft">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-center gap-y-1">
                {renderDays()}
            </div>

            {/* Legend / Info */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-aspol-line pt-5 text-sm text-aspol-ink-soft">
                <span className="inline-block size-2.5 rounded-full bg-aspol-navy" />
                Event scheduled
            </div>
        </div>
    );
}
