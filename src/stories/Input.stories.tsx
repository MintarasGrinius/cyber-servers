import { Input } from "@/components/ui/Input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
      description: "The type of the input field",
    },
    placeholder: {
      control: { type: "text" },
      description: "The placeholder text for the input field",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the input field",
    },
    "aria-invalid": {
      control: { type: "boolean" },
      description: "Marks the input as invalid for accessibility",
    },
  },
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
    "aria-invalid": false,
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
