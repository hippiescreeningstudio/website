type Props = {
  text: string;
  color: string;
  textColor?: string;
  link?: string;
};

export function Sticker({ text, color, textColor = '#FFFFFF', link }: Props) {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`fixed right-4 md:right-48 top-3/4 transform z-50 w-20 h-20 rounded-full flex items-center justify-center font-bold text-center shadow-lg ${
        link ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''
      }`}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      role={link ? 'button' : undefined}
      tabIndex={link ? 0 : undefined}
      onKeyDown={link ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
    >
      <span 
        className="leading-tight text-center"
        style={{ 
          transform: 'rotate(-20deg)',
          color: textColor,
          fontWeight: 'bold',
          fontSize: '16px',
          wordBreak: 'break-word',
          hyphens: 'none',
          lineHeight: '1.1'
        }}
      >
        {text}
      </span>
    </div>
  );
} 