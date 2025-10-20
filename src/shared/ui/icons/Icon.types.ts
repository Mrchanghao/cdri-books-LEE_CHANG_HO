export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const variantClasses = {
  default: "text-gray-600",
  primary: "text-brand-primary",
  secondary: "text-gray-400",
};
