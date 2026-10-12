import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Mare Nostrum Button — pill shapes only, brand palette aligned.
 * Texte 600, 15 px (16 px en lg) ; survol 150 ms (fond + lever de 1 px) via .mn-btn.
 * Tailles : sm 44 px mobile / 40 px dès md, default 44, lg 48 ; texte 15 px à 500
 * (gabarit Delos retenu par le propriétaire le 12 octobre 2026).
 * Le libellé peut passer sur deux lignes (interligne serré, tient dans 44 px) :
 * avec whitespace-nowrap, un bouton dans une colonne étroite débordait sur ses
 * propres marges (carte collante des articles, oct. 2026).
 * - default  : filled Nuit  (CTA principal)
 * - outline  : ghost outline Nuit (CTA secondaire)
 * - ghost    : transparent, hover turquoise
 * - secondary: turquoise filled  (accent CTA)
 * - destructive: rouge système
 * - link     : underline editorial
 */
const buttonVariants = cva(
  "mn-btn inline-flex items-center justify-center gap-2 text-center leading-tight rounded-[10px] text-[15px] font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "mn-btn-lift bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
        destructive:
          "mn-btn-lift bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "mn-btn-lift border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "mn-btn-lift bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft",
        ghost:
          "bg-transparent text-primary hover:bg-primary/5 hover:text-primary",
        link:
          "text-primary underline-offset-4 hover:underline text-[15px]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-11 px-5 md:h-10",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
