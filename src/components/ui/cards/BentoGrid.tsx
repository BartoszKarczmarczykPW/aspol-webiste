"use client";

import React from "react";
import Image from "next/image";

interface BentoItem {
  title: string;
  description?: string; // Made optional
  header?: React.ReactNode;
  icon?: React.ReactNode; 
  className?: string;
  image?: string;
  large?: boolean;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
  large = false,
}: BentoItem) => {
  return (
    <div
      className={`row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 p-4 border border-white/20 bg-white/70 backdrop-blur-md shadow-lg justify-between flex flex-col space-y-4 ${
        large ? "md:col-span-2" : "md:col-span-1"
      } ${className}`}
    >
      {header}
      {image && (
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2">
               <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover/bento:scale-105"
              />
          </div>
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-aspol-navy dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        {description && (
             <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
             {description}
             </div>
        )}
      </div>
    </div>
  );
};
