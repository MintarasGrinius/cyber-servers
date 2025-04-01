import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "no-background"],
    },
  },
  args: {
    variant: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const NoBackground: Story = {
  args: {
    variant: "no-background",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>No Background Card</CardTitle>
        <CardDescription>
          This card has no background styling applied.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
};
