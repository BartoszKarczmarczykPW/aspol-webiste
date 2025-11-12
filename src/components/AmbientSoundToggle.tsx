"use client";

import { useState, useEffect, useRef } from "react";

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Create Web Audio API context (ambient sound simulation)
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startAmbientSound = () => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    
    // Create oscillator for ambient sound
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, context.currentTime); // A3 note
    
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const stopAmbientSound = () => {
    if (oscillatorRef.current && gainNodeRef.current && audioContextRef.current) {
      const context = audioContextRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, context.currentTime + 0.5);
      
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current = null;
        }
      }, 500);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
      setIsPlaying(false);
    } else {
      startAmbientSound();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      <div className="relative group">
        {/* Volume Slider (appears on hover) */}
        {isPlaying && (
          <div className="absolute bottom-full right-0 mb-4 bg-white rounded-full shadow-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (gainNodeRef.current) {
                  gainNodeRef.current.gain.value = newVolume;
                }
              }}
              className="w-32 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleSound}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isPlaying
              ? "bg-linear-to-br from-red-500 to-red-700 animate-pulse"
              : "bg-white hover:bg-gray-100"
          }`}
          aria-label={isPlaying ? "Stop ambient sound" : "Play ambient sound"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Animated Sound Waves */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute inset-0 rounded-full bg-red-300 opacity-15 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
          </div>
        )}
      </div>
    </div>
  );
}
