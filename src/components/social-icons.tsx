import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function InstagramLogo({ title = "Instagram", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={title ? undefined : true} role="img" {...props}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="instagram-gradient" x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9CE34" />
          <stop offset="0.35" stopColor="#EE2A7B" />
          <stop offset="0.7" stopColor="#6228D7" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#instagram-gradient)" />
      <circle cx="12" cy="12" r="4.25" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
    </svg>
  );
}

export function WhatsAppLogo({ title = "WhatsApp", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={title ? undefined : true} role="img" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        fill="#25D366"
        d="M12 2.25A9.74 9.74 0 0 0 3.57 16.9L2.25 21.75l4.98-1.3A9.75 9.75 0 1 0 12 2.25Z"
      />
      <path
        fill="#fff"
        d="M17.54 14.19c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.8-1.66-2.1-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.61-.92-2.2-.24-.57-.48-.49-.67-.5h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.2 3.08c.15.2 2.08 3.17 5.03 4.45.7.3 1.24.48 1.67.62.7.22 1.34.19 1.85.12.56-.08 1.74-.71 1.98-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}
