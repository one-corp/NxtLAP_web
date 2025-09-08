"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonImageProps {
  src: string
  alt: string
  className?: string
}

export function SkeletonImage({ src, alt, className }: SkeletonImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full h-40 sm:h-full">
      {isLoading && <Skeleton className={`absolute inset-0 w-full h-full rounded-xl`} />}
      <Image
        src={src}
        alt={alt}
        width={500}
        height={280}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}