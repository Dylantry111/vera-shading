"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface ZoomableImageProps {
  src: string;
  fullSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ZoomableImage({ src, fullSrc, alt, className, style }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ""}`}
        style={style}
        onClick={() => setOpen(true)}
      />
      {open && (
        <Lightbox src={fullSrc} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
