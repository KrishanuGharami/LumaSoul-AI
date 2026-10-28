import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "glow";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "glass",
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    glass:
      "bg-charcoal-900/80 backdrop-blur-md border border-charcoal-700/60 shadow-glass-inset",
    default:
      "bg-charcoal-900 border border-charcoal-800",
    bordered:
      "bg-charcoal-950/90 border border-charcoal-700/80",
    glow:
      "bg-charcoal-900/90 border border-amberGold-500/30 shadow-glow-amber",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-5 text-ivory-100 transition-all duration-300",
        variants[variant],
        hoverEffect && "hover:border-amberGold-500/40 hover:-translate-y-0.5 hover:shadow-glow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-serif tracking-wide text-ivory-50", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-ivory-400 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
