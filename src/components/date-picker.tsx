"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type React from "react"
import { useImperativeHandle, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomCalendar } from "../components/custom-calender"

export type ImperativeHandleFromDatePicker = {
  reset: () => void
}

interface DatePickerProps {
  id: string
  name: string
  defaultValue?: string | undefined
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker | null>
}

const DatePicker = ({ id, name, defaultValue, imperativeHandleRef }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date())

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(defaultValue ? new Date(defaultValue) : new Date()),
  }))

  const [open, setOpen] = useState(false)
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
  }

  const formattedStringDate = date ? format(date, "dd/MM/yyyy") : ""

  return (
    <>
      <input type="hidden" name={name} value={formattedStringDate} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" id={id} asChild>
          <Button variant="outline" className="justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedStringDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CustomCalendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  )
}

export { DatePicker }
