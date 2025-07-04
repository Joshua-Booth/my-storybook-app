import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";

import { Calendar } from "~/components/ui/calendar";
import { expect, userEvent } from "storybook/test";

// Static base date for consistent Chromatic snapshots
const STATIC_DATE = new Date("2024-06-15");

/**
 * A date field component that allows users to enter and edit date.
 */
const meta = {
  title: "ui/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    mode: "single",
    selected: STATIC_DATE,
    onSelect: action("onDayClick"),
    className: "rounded-md border w-fit",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the calendar.
 */
export const Default: Story = {};

/**
 * Use the `multiple` mode to select multiple dates.
 */
export const Multiple: Story = {
  args: {
    min: 1,
    selected: [STATIC_DATE, addDays(STATIC_DATE, 2), addDays(STATIC_DATE, 8)],
    mode: "multiple",
  },
};

/**
 * Use the `range` mode to select a range of dates.
 */
export const Range: Story = {
  args: {
    selected: {
      from: STATIC_DATE,
      to: addDays(STATIC_DATE, 7),
    },
    mode: "range",
  },
};

/**
 * Use the `disabled` prop to disable specific dates.
 */
export const Disabled: Story = {
  args: {
    disabled: [
      addDays(STATIC_DATE, 1),
      addDays(STATIC_DATE, 2),
      addDays(STATIC_DATE, 3),
      addDays(STATIC_DATE, 5),
    ],
  },
};

/**
 * Use the `numberOfMonths` prop to display multiple months.
 */
export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
    showOutsideDays: false,
  },
};

export const ShouldChangeMonths: Story = {
  name: "when using the calendar navigation, should change months",
  tags: ["!dev", "!autodocs"],
  args: {
    defaultMonth: new Date(2000, 8),
  },
  play: async ({ canvas }) => {
    const title = await canvas.findByText(/2000/i);
    const startTitle = title.textContent || "";
    const backBtn = await canvas.findByRole("button", {
      name: /previous/i,
    });
    const nextBtn = await canvas.findByRole("button", {
      name: /next/i,
    });
    const steps = 6;
    for (let i = 0; i < steps / 2; i++) {
      await userEvent.click(backBtn);
      expect(title).not.toHaveTextContent(startTitle);
    }
    for (let i = 0; i < steps; i++) {
      await userEvent.click(nextBtn);
      if (i == steps / 2 - 1) {
        expect(title).toHaveTextContent(startTitle);
        continue;
      }
      expect(title).not.toHaveTextContent(startTitle);
    }
  },
};
