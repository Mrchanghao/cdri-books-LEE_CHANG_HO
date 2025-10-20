export type { ButtonProps } from './button';

export const buttonVariants = {
  variant: {
    default: "default",
    outline: "outline", 
    secondary: "secondary",
    ghost: "ghost",
    destructive: "destructive",
    link: "link",
  } as const,
  size: {
    sm: "sm",
    md: "md", 
    lg: "lg",
    icon: "icon",
  } as const,
};

export const buttonDefaultProps = {
  variant: "default" as const,
  size: "md" as const,
  asChild: false,
  loading: false,
};
