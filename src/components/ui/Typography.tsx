import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("break-anywhere font-semibold", {
  variants: {
    size: {
      h1: "text-2xl md:text-3xl text-foreground",
      h2: "text-lg",
      h3: "text-base",
      h4: "text-sm",
      h5: "text-sm",
      h6: "text-xs",
    },
  },
});

type HeadingElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends ComponentProps<"h1"> {
  el?: HeadingElements;
  size?: HeadingElements;
}

export const HeadingBase = ({
  el: Comp = "h2",
  className,
  size: _size,
  children,
  ...props
}: HeadingProps) => {
  const size = _size || Comp;

  return (
    <Comp {...props} className={cn(headingVariants({ size }), className)}>
      {children}
    </Comp>
  );
};

export const Heading = {
  H1: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h1">
      {children}
    </HeadingBase>
  ),
  H2: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h2">
      {children}
    </HeadingBase>
  ),
  H3: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h3">
      {children}
    </HeadingBase>
  ),
  H4: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h4">
      {children}
    </HeadingBase>
  ),
  H5: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h5">
      {children}
    </HeadingBase>
  ),
  H6: ({ children, ...props }: Omit<HeadingProps, "el">) => (
    <HeadingBase {...props} el="h6">
      {children}
    </HeadingBase>
  ),
};

const paragraphVariants = cva(
  [
    "break-anywhere text-grey-600",
    "disabled:text-grey-300 peer-disabled:text-grey-300",
    "group-disabled:text-grey-300 aria-disabled:text-grey-300",
    "group-aria-disabled:text-grey-300 peer-aria-disabled:text-grey-300",
  ],
  {
    variants: {
      size: {
        xs: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const Paragraph = ({
  children,
  className,
  size,
  ...rest
}: ComponentProps<"p"> & VariantProps<typeof paragraphVariants>) => (
  <p {...rest} className={cn(paragraphVariants({ size }), className)}>
    {children}
  </p>
);
