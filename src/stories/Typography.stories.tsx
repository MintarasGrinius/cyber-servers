import { Heading, Paragraph } from "@/components/ui/Typography";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Typography",
};

export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading.H1>Heading 1</Heading.H1>
      <Heading.H2>Heading 2</Heading.H2>
      <Heading.H3>Heading 3</Heading.H3>
      <Heading.H4>Heading 4</Heading.H4>
      <Heading.H5>Heading 5</Heading.H5>
      <Heading.H6>Heading 6</Heading.H6>
    </div>
  ),
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional classes for styling headings",
    },
  },
};

export const Paragraphs: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Paragraph size="xs">This is a small paragraph (xs).</Paragraph>
      <Paragraph size="default">This is a default paragraph.</Paragraph>
      <Paragraph size="lg">This is a large paragraph (lg).</Paragraph>
      <Paragraph {...args}>This is controlled by the size prop.</Paragraph>
    </div>
  ),
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "default", "lg"],
      description: "The size of the paragraph",
    },
    className: {
      control: { type: "text" },
      description: "Additional classes for styling paragraphs",
    },
  },
  args: {
    size: "default",
    className: "",
  },
};
