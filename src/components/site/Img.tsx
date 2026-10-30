import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Lazy image with a graceful tonal fallback if the source fails. */
export function Img({ className, alt, eager, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-gradient-to-br from-current/10 to-current/25", className)}
      />
    );
  return (
    <img
      {...rest}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
