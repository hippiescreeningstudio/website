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
      className={`fixed right-2 md:left-80 top-3/4 transform z-50 w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold text-center animate-pulse ${
        link ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''
      }`}
      style={{ 
        backgroundColor: color,
        boxShadow: `
          0 0 20px ${color}80,
          0 0 40px ${color}60,
          0 0 60px ${color}40,
          0 0 80px ${color}20
        `
      }}
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
        className="leading-tight text-center text-sm md:text-xl"
        style={{ 
          transform: 'rotate(-20deg)',
          color: textColor,
          fontWeight: 'bold',
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