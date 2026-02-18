interface DividerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ 
  size = 'md', 
  orientation = 'horizontal',
  className = ''
}: DividerProps) {
  const sizeClasses = {
    xs: orientation === 'horizontal' ? 'h-2' : 'w-2',
    sm: orientation === 'horizontal' ? 'h-4' : 'w-4', 
    md: orientation === 'horizontal' ? 'h-6' : 'w-6',
    lg: orientation === 'horizontal' ? 'h-8' : 'w-8',
    xl: orientation === 'horizontal' ? 'h-12' : 'w-12',
    '2xl': orientation === 'horizontal' ? 'h-16' : 'w-16',
    '3xl': orientation === 'horizontal' ? 'h-24' : 'w-24'
  };

  const orientationClass = orientation === 'vertical' ? 'inline-block' : 'block';

  return (
    <div 
      className={`${sizeClasses[size]} ${orientationClass} ${className}`}
      aria-hidden="true"
    />
  );
}

export function SpaceDivider({ 
  size = 'md', 
  className = '' 
}: Pick<DividerProps, 'size' | 'className'>) {
  return <Divider size={size} orientation="horizontal" className={className} />;
}

export function InlineDivider({ 
  size = 'sm', 
  className = '' 
}: Pick<DividerProps, 'size' | 'className'>) {
  return <Divider size={size} orientation="vertical" className={className} />;
}
