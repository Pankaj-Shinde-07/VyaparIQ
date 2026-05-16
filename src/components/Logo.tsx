import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" fill="none" className={className}>
      {/* Diamond / Shield Base Structure */}
      <path d="M50 20 L20 50 L50 90 L80 50 Z" stroke="#0059B9" strokeWidth="4" strokeLinejoin="round"/>
      
      {/* Outer Shield Elements */}
      <path d="M50 20 L80 10 L110 20" stroke="#00AB8E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 50 L10 60 L30 80" className="stroke-[#00305D] dark:stroke-white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M80 50 L110 60 L90 80" className="stroke-[#00305D] dark:stroke-white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 90 L70 110 L90 80" className="stroke-[#00305D] dark:stroke-white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Checkmark Arrow */}
      <path d="M25 65 L45 85 L95 25" stroke="#0059B9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="85,15 110,15 100,40" fill="#00AB8E" />

      {/* Center Star Motif */}
      <path d="M45 45 L50 35 L55 45 L65 50 L55 55 L50 65 L45 55 L35 50 Z" fill="#0059B9" />

      {/* Text */}
      <text x="130" y="65" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="800" fontSize="48" className="fill-[#00305D] dark:fill-white" letterSpacing="-1">Vyapar</text>
      <text x="295" y="65" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="800" fontSize="48" fill="#00AB8E" letterSpacing="-1">IQ</text>
    </svg>
  );
}

// synced
