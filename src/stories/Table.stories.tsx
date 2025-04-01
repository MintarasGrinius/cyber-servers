import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional classes for styling the table",
    },
  },
  args: {
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A simple table example</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>28</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>34</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>41</TableCell>
          <TableCell>Manager</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>End of Table</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithCustomStyles: Story = {
  args: {
    className: "border border-blue-500",
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>A table with custom styles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>28</TableCell>
          <TableCell>Developer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>34</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>41</TableCell>
          <TableCell>Manager</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>End of Table</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
