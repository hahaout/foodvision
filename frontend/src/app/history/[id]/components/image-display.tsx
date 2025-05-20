"use client"

import Image from 'next/image';
import React from 'react'

interface ImageDisplayerProps {
  base64String?: string | null; // Make prop optional
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: React.ReactNode;
}

function ImageDisplayer({
  base64String,
  alt = "Image content",
  width = 600,
  height = 600,
  className = "",
  fallback = <div className="bg-gray-100 w-full h-full flex items-center justify-center">Image not available</div>
}: ImageDisplayerProps) {
  // Return fallback if no string provided
  if (!base64String) {
    return <>{fallback}</>;
  }

  try {
    // Ensure the string is properly formatted
    const imageSrc = base64String.startsWith('data:image') 
      ? base64String 
      : `data:image/png;base64,${base64String}`;

    return (
      <Image 
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={(e) => {
          // Handle broken images by replacing with fallback
          const img = e.target as HTMLImageElement;
          img.style.display = 'none';
        }}
      />
    );
  } catch (error) {
    console.error('Error processing image:', error);
    return <>{fallback}</>;
  }
}

export { ImageDisplayer };