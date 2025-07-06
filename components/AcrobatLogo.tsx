import React from "react";

export default function AcrobatLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#FB0000"/>
      <path d="M20.7 27.8C22.8 23.7 28.2 13.5 23.5 13.5C18.8 13.5 16.9 23.7 16.9 27.8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="20" cy="17.5" rx="2.5" ry="2" fill="#fff"/>
      <ellipse cx="20" cy="32" rx="9.5" ry="2" fill="#fff" fillOpacity="0.15"/>
      <rect x="12" y="11" width="16" height="6" rx="2" fill="#fff" fillOpacity="0.05"/>
    </svg>
  );
}