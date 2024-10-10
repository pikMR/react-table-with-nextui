import React from "react";
import { DateRangePicker } from "@nextui-org/react";

const SearchDate = () => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 text-black">
      <DateRangePicker
        classNames={{
          base: "text-[1.6rem] sm:w-[40rem] w-full",
          label: "text-[1.4rem]",
          input: "text-[14px]",
          innerWrapper: "h-fit",
          inputWrapper: "px-6 py-4 max-h-auto h-fit",
          calendar: "w-fit flex justify-center p-4 text-[1.2rem] sm:text-[1rem]",
          calendarContent: "p-2 rounded-lg",
          selectorIcon: "text-[1.6rem] w-[2rem] h-[2rem]",
        }}
        visibleMonths={2}
        pageBehavior="single"
        color="default"
        size="lg"
        variant="flat"
        radius="full"
      />
    </div>
  )
}

export default SearchDate;
