
import React from 'react';

export const COLORS = {
  charcoal: '#1A1A1A',
  emerald: '#2E7D32',
  amber: '#FFB300',
  red: '#D32F2F',
  gray: '#2A2A2A',
  text: '#E5E5E5',
};

export const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2E7D32" />
        <stop offset="40%" stopColor="#43A047" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
    </defs>
    
    {/* The Three Vertical 'Arrow' Columns */}
    <g opacity="0.9">
      {/* Left Column */}
      <path d="M15 28 L25 18 L35 28 V72 L25 82 L15 72 Z" fill="url(#logoGrad)" />
      {/* Center Column */}
      <path d="M40 22 L50 12 L60 22 V78 L50 88 L40 78 Z" fill="url(#logoGrad)" />
      {/* Right Column */}
      <path d="M65 28 L75 18 L85 28 V72 L75 82 L65 72 Z" fill="url(#logoGrad)" />
    </g>
    
    {/* The Central Eye Overlap */}
    <path 
      d="M10 50 C 25 30, 75 30, 90 50 C 75 70, 25 70, 10 50 Z" 
      fill="#1A1A1A" 
      stroke="#E5E5E5" 
      strokeWidth="1.5" 
    />
    
    {/* The Iris/Aperture Circle */}
    <circle cx="50" cy="50" r="12" stroke="#E5E5E5" strokeWidth="1" fill="#111" />
    
    {/* Aperture Blades */}
    <g transform="translate(50,50) scale(0.12)">
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <path 
          key={deg}
          d="M0 -100 L 100 0 L 0 0 Z" 
          fill="#E5E5E5" 
          transform={`rotate(${deg})`}
          opacity="0.8"
        />
      ))}
    </g>
    
    {/* Center Pupil */}
    <circle cx="50" cy="50" r="3" fill="#FFB300" />
  </svg>
);
