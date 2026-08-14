export function EqualHousingIcon({
  className,
  style,
  title = "Equal Housing Opportunity",
}: {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="40"
      height="40"
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        d="M24 4 4 20h6v22h11v-13h6v13h11V20h6L24 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <rect x="15" y="27" width="18" height="3" fill="currentColor" />
      <rect x="15" y="33" width="18" height="3" fill="currentColor" />
    </svg>
  );
}
