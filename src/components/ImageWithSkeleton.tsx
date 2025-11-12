"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string;
}

export default function ImageWithSkeleton({ 
  skeletonClassName = "", 
  className = "",
  ...props 
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {/* Skeleton loader */}
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded-lg ${skeletonClassName}`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>
      )}
      
      {/* Actual image */}
      <Image
        {...props}
        className={`${className} transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        alt={props.alt}
      />
    </div>
  );
}
