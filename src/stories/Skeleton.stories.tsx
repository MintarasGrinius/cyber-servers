import { Skeleton } from "@/components/ui/Skeleton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional classes for styling the skeleton",
    },
  },
  args: {
    className: "h-4 w-32", // Default size
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    className: "h-10 w-10 rounded-full",
  },
};

export const LargeRectangle: Story = {
  args: {
    className: "h-8 w-64",
  },
};

export const CustomStyle: Story = {
  args: {
    className: "h-6 w-48 bg-red-300 animate-pulse",
  },
};
