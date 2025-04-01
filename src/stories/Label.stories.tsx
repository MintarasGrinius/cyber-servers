import { Input } from "@/components/ui/Input"; // Assuming you have the Input component
import { Label } from "@/components/ui/Label";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  argTypes: {
    htmlFor: {
      control: { type: "text" },
      description: "The ID of the input element this label is associated with",
    },
    children: {
      control: { type: "text" },
      description: "The text content of the label",
    },
    className: {
      control: { type: "text" },
      description: "Additional classes for the label",
    },
  },
  args: {
    htmlFor: "input-id",
    children: "Label Text",
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} />
      <Input id={args.htmlFor} placeholder="Enter text..." />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2 group data-[disabled=true]">
      <Label {...args} />
      <Input id={args.htmlFor} placeholder="Disabled input" disabled />
    </div>
  ),
  args: {
    children: "Disabled Label",
  },
};

export const WithCustomClass: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} />
      <Input id={args.htmlFor} placeholder="Custom styled input" />
    </div>
  ),
  args: {
    children: "Custom Label",
    className: "text-red-500 font-bold",
  },
};
