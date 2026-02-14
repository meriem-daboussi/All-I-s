
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
        <stop offset="50%" stopColor="#43A047" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
    </defs>
    {/* The Three Bars with Arrow Tips */}
    <path d="M25 15L35 25V75L25 85L15 75V25L25 15Z" fill="url(#logoGrad)" opacity="0.9" />
    <path d="M50 10L60 20V80L50 90L40 80V20L50 10Z" fill="url(#logoGrad)" />
    <path d="M75 15L85 25V75L75 85L65 75V25L75 15Z" fill="url(#logoGrad)" opacity="0.9" />
    
    {/* The Central Eye */}
    <path d="M10 50C10 50 30 25 50 25C70 25 90 50 90 50C90 50 70 75 50 75C30 75 10 50 10 50Z" fill="#1A1A1A" stroke="#E5E5E5" strokeWidth="2" />
    <circle cx="50" cy="50" r="14" fill="#E5E5E5" />
    
    {/* The Iris/Aperture */}
    <g transform="translate(50,50) scale(0.18)">
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(0)" />
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(60)" />
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(120)" />
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(180)" />
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(240)" />
      <path d="M20 0L80 0L50 50Z" fill="#1A1A1A" transform="rotate(300)" />
    </g>
    <circle cx="50" cy="50" r="4" fill="#FFB300" />
  </svg>
);
