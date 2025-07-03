import React from "react";

interface QrCodeProps {
  value: string;
  alt?: string;
  size?: number;
}

export function QrCode({ value, alt = "QR Code Pix", size = 200 }: QrCodeProps) {
  return (
    <div className="flex items-center justify-center p-2 bg-white border-2 border-gray-300 shadow-md rounded-lg">
      <img
        src={value}
        alt={alt}
        width={size}
        height={size}
        className="block mx-auto"
        style={{ maxWidth: size, maxHeight: size }}
      />
    </div>
  );
} 