/** SVG shutter illustrations — visual stand-in for product photos */

interface Props {
  variant: "classic" | "premium" | "entry" | "hero" | "texture";
  className?: string;
  photo?: string; // real product photo URL — replaces SVG when provided
}

export default function ShutterIllustration({ variant, className = "", photo }: Props) {
  // If a real photo is provided, render <img> instead of SVG
  if (photo) {
    return (
      <img
        src={photo}
        alt="VERA plantation shutter"
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        loading="lazy"
      />
    );
  }
  if (variant === "hero") {
    return (
      <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="VERA plantation shutters">
        <rect width="800" height="600" fill="#F7F5F0" />
        {/* Large window frame */}
        <rect x="100" y="60" width="600" height="480" rx="4" fill="#EDE8DF" stroke="#1C1C1C" strokeWidth="2" />
        {/* Shutter panels */}
        {[
          { x: 120, w: 135 },
          { x: 265, w: 135 },
          { x: 410, w: 135 },
          { x: 555, w: 125 },
        ].map((panel) => (
          <g key={panel.x}>
            <rect x={panel.x} y={80} width={panel.w} height="440" rx="2" fill="#1C1C1C" opacity="0.92" />
            {/* Louver lines */}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={i} x1={panel.x + 8} y1={105 + i * 24} x2={panel.x + panel.w - 8} y2={105 + i * 24} stroke="#3A3A3A" strokeWidth="2.5" opacity="0.35" />
            ))}
          </g>
        ))}
        {/* Light gap centre */}
        <rect x="395" y="80" width="20" height="440" fill="#F7F5F0" opacity="0.15" />
        {/* Ambient glow */}
        <ellipse cx="400" cy="300" rx="350" ry="280" fill="#1C1C1C" opacity="0.03" />
      </svg>
    );
  }

  if (variant === "classic") {
    return (
      <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#F7F5F0" rx="4" />
        <rect x="40" y="30" width="420" height="340" rx="3" fill="#EDE8DF" stroke="#1C1C1C" strokeWidth="1.5" />
        <rect x="55" y="45" width="185" height="310" rx="2" fill="#1C1C1C" opacity="0.88" />
        <rect x="260" y="45" width="185" height="310" rx="2" fill="#1C1C1C" opacity="0.88" />
        {[0, 1].map((s) => Array.from({ length: 14 }).map((_, i) => (
          <line key={`${s}-${i}`} x1={60 + s * 205} y1={68 + i * 22} x2={235 + s * 205} y2={68 + i * 22} stroke="#3A3A3A" strokeWidth="2" opacity="0.3" />
        )))}
        <rect x="240" y="45" width="20" height="310" fill="#F7F5F0" opacity="0.2" />
      </svg>
    );
  }

  if (variant === "premium") {
    return (
      <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#F7F5F0" rx="4" />
        <rect x="30" y="30" width="440" height="340" rx="3" fill="#EDE8DF" stroke="#1C1C1C" strokeWidth="1.5" />
        <rect x="45" y="45" width="130" height="310" rx="2" fill="#1C1C1C" opacity="0.92" />
        <rect x="185" y="45" width="130" height="310" rx="2" fill="#1C1C1C" opacity="0.92" />
        <rect x="325" y="45" width="130" height="310" rx="2" fill="#1C1C1C" opacity="0.92" />
        {[0, 1, 2].map((s) => Array.from({ length: 14 }).map((_, i) => (
          <line key={`${s}-${i}`} x1={50 + s * 140} y1={68 + i * 22} x2={170 + s * 140} y2={68 + i * 22} stroke="#3A3A3A" strokeWidth="2.5" opacity="0.3" />
        )))}
        {/* Decorative arch top */}
        <path d="M45 100 Q200 30 355 100" stroke="#1C1C1C" strokeWidth="1.5" fill="none" opacity="0.15" />
      </svg>
    );
  }

  if (variant === "entry") {
    return (
      <svg className={className} viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="320" fill="#F7F5F0" rx="4" />
        <rect x="50" y="25" width="400" height="270" rx="3" fill="#EDE8DF" stroke="#1C1C1C" strokeWidth="1.5" />
        <rect x="65" y="40" width="370" height="240" rx="2" fill="#1C1C1C" opacity="0.85" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={70} y1={60 + i * 20} x2={430} y2={60 + i * 20} stroke="#3A3A3A" strokeWidth="2" opacity="0.3" />
        ))}
      </svg>
    );
  }

  // texture = subtle wood grain pattern
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="woodGrain" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="#EDE8DF" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${10 + i * 25} ${10 + (i % 3) * 60} Q${100 + (i % 2) * 30} ${20 + i * 25} ${190 - i * 10} ${40 + (i % 4) * 40}`}
              stroke="#1C1C1C"
              strokeWidth="0.8"
              opacity="0.04"
              fill="none"
            />
          ))}
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#woodGrain)" />
    </svg>
  );
}
