interface LogoProps {
  size?: number;
  className?: string;
  /** Set when the logo sits next to the word "Daftar" so screen readers don't repeat it. */
  decorative?: boolean;
}

export default function Logo({ size = 40, className, decorative = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Daftar logo"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Orange tile */}
      <rect width="64" height="64" rx="15" fill="#F2A65A" />
      {/* Cream notebook */}
      <rect x="13" y="10" width="32" height="40" rx="4.5" fill="#F8F3E6" />
      {/* Burnt-orange binding strip */}
      <path d="M17.5 10H21v40h-3.5a4.5 4.5 0 0 1-4.5-4.5v-31a4.5 4.5 0 0 1 4.5-4.5Z" fill="#B5541A" />
      {/* Navy "writing" */}
      <g stroke="#1D2B3A" strokeWidth="3" strokeLinecap="round">
        <line x1="26" y1="20" x2="39" y2="20" />
        <line x1="26" y1="27.5" x2="39" y2="27.5" />
        <line x1="26" y1="35" x2="33" y2="35" />
      </g>
      {/* Chat bubble with tail */}
      <path
        d="M45 31.5a11.5 11.5 0 1 1-6.3 21.1L33 54.5l1.9-5.4A11.5 11.5 0 0 1 45 31.5Z"
        fill="#1D2B3A"
        stroke="#F2A65A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Check mark */}
      <path
        d="M39.8 43.2l3.6 3.6 6.6-6.8"
        fill="none"
        stroke="#F2A65A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
