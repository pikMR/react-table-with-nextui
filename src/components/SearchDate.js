import React from "react";
import { DateRangePicker } from "@nextui-org/date-picker";

const SearchDate = () => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 text-black">
      <DateRangePicker
        classNames={{
          base: "text-[1.4rem] py-6 px-4 sm:w-[40rem] w-full",
          label: "text-[1.4rem]",
          input: "p-4 text-[1.4rem]",
          inputWrapper: "p-4",
          calendar: "w-fit flex justify-center p-4 text-[1.2rem] sm:text-[1rem]",
          calendarContent: "border p-2 border-primary rounded-lg",
          selectorIcon: "text-[1.6rem]",
        }}
        visibleMonths={2}
        pageBehavior="single"
        color="default"
        size="lg"
        variant="flat"
        radius="full"
        // label="Label..."
        // labelPlacement="outside-left"
      />
    </div>
  )
}

export default SearchDate;
