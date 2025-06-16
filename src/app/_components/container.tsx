type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return (
    <div className={`container mx-auto px-5 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
