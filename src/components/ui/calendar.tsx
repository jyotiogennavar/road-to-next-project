"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Days of the week
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

// Months of the year
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// This type mimics the DayPicker props from react-day-picker
export type CalendarProps = {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date } | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  disabled?: { from: Date; to: Date } | Date[] | ((date: Date) => boolean)
  fromDate?: Date
  toDate?: Date
  defaultMonth?: Date
  numberOfMonths?: number
  [key: string]: unknown
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  disabled,
  fromDate,
  toDate,
  defaultMonth,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  numberOfMonths = 1}: CalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = React.useState(defaultMonth?.getMonth() ?? today.getMonth())
  const [currentYear, setCurrentYear] = React.useState(defaultMonth?.getFullYear() ?? today.getFullYear())
  const [] = React.useState<number | null>(null)

  // Get the number of days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    // Adjust to start week on Monday (0 = Monday, 6 = Sunday)
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday (0) to 6, and shift others by -1
  }

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      if (showOutsideDays) {
        // Calculate the day from previous month
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)
        const day = daysInPrevMonth - firstDay + i + 1
        days.push({ day, month: prevMonth, year: prevYear, outside: true })
      } else {
        days.push(null)
      }
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, month: currentMonth, year: currentYear, outside: false })
    }

    // Add days from next month to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - days.length

    if (showOutsideDays && remainingCells > 0) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

      for (let i = 1; i <= remainingCells; i++) {
        days.push({ day: i, month: nextMonth, year: nextYear, outside: true })
      }
    }

    return days
  }

  // Check if a date is selected
  const isSelected = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!selected || !dateObj) return false

    const date = new Date(dateObj.year, dateObj.month, dateObj.day)

    if (Array.isArray(selected)) {
      return selected.some(
        (selectedDate) =>
          selectedDate.getDate() === dateObj.day &&
          selectedDate.getMonth() === dateObj.month &&
          selectedDate.getFullYear() === dateObj.year,
      )
    } else if (typeof selected === "object" && "from" in selected && "to" in selected) {
      // Range selection
      return date >= selected.from && date <= selected.to
    } else if (selected instanceof Date) {
      return (
        selected.getDate() === dateObj.day &&
        selected.getMonth() === dateObj.month &&
        selected.getFullYear() === dateObj.year
      )
    }

    return false
  }

  // Check if a date is the start of a range
  const isRangeStart = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!selected || !dateObj || typeof selected !== "object" || !("from" in selected)) return false

    const from = selected.from

    return from.getDate() === dateObj.day && from.getMonth() === dateObj.month && from.getFullYear() === dateObj.year
  }

  // Check if a date is the end of a range
  const isRangeEnd = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!selected || !dateObj || typeof selected !== "object" || !("to" in selected)) return false

    const to = selected.to

    return to.getDate() === dateObj.day && to.getMonth() === dateObj.month && to.getFullYear() === dateObj.year
  }

  // Check if a date is today
  const isToday = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!dateObj) return false

    return today.getDate() === dateObj.day && today.getMonth() === dateObj.month && today.getFullYear() === dateObj.year
  }

  // Check if a date is disabled
  const isDisabled = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!dateObj) return true

    const date = new Date(dateObj.year, dateObj.month, dateObj.day)

    // Check fromDate and toDate constraints
    if (fromDate && date < fromDate) return true
    if (toDate && date > toDate) return true

    // Check disabled dates
    if (disabled) {
      if (Array.isArray(disabled)) {
        return disabled.some(
          (disabledDate) =>
            disabledDate.getDate() === dateObj.day &&
            disabledDate.getMonth() === dateObj.month &&
            disabledDate.getFullYear() === dateObj.year,
        )
      } else if (typeof disabled === "object" && "from" in disabled && "to" in disabled) {
        return date >= disabled.from && date <= disabled.to
      } else if (typeof disabled === "function") {
        return disabled(date)
      }
    }

    return false
  }

  // Handle date selection
  const handleSelect = (dateObj: { day: number; month: number; year: number } | null) => {
    if (!onSelect || !dateObj || isDisabled(dateObj)) return

    const newDate = new Date(dateObj.year, dateObj.month, dateObj.day)
    onSelect(newDate)
  }

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Group days into weeks
  const weeks = React.useMemo(() => {
    const days = generateCalendarDays()
    const weeksArray = []

    for (let i = 0; i < days.length; i += 7) {
      weeksArray.push(days.slice(i, i + 7))
    }

    return weeksArray
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear, showOutsideDays])

  return (
    <div className={cn("p-3", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-center pt-1 relative">
          <div className={cn("text-sm font-medium", classNames?.caption_label)}>
            {MONTHS[currentMonth]} {currentYear}
          </div>
          <div className={cn("space-x-1 flex items-center absolute left-1", classNames?.nav)}>
            <button
              onClick={prevMonth}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                classNames?.nav_button,
                classNames?.nav_button_previous,
              )}
              disabled={fromDate && new Date(currentYear, currentMonth, 1) <= fromDate}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </button>
          </div>
          <div className={cn("space-x-1 flex items-center absolute right-1", classNames?.nav)}>
            <button
              onClick={nextMonth}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                classNames?.nav_button,
                classNames?.nav_button_next,
              )}
              disabled={toDate && new Date(currentYear, currentMonth + 1, 0) >= toDate}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </button>
          </div>
        </div>
        <div className={cn("space-y-4", classNames?.month)}>
          <table className={cn("w-full border-collapse space-y-1", classNames?.table)}>
            <thead>
              <tr className={cn("flex", classNames?.head_row)}>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className={cn(
                      "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                      classNames?.head_cell,
                    )}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex} className={cn("flex w-full mt-2", classNames?.row)}>
                  {week.map((dateObj, dayIndex) => {
                    const isDateSelected = isSelected(dateObj)
                    const isDateRangeStart = isRangeStart(dateObj)
                    const isDateRangeEnd = isRangeEnd(dateObj)
                    const isDateToday = isToday(dateObj)
                    const isDateDisabled = isDisabled(dateObj)
                    const isDateOutside = dateObj?.outside

                    return (
                      <td
                        key={dayIndex}
                        className={cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                          isDateSelected && "bg-accent",
                          isDateSelected && isDateOutside && "bg-accent/50",
                          isDateRangeEnd && "rounded-r-md",
                          mode === "range"
                            ? cn(
                                isDateRangeEnd && "rounded-r-md",
                                isDateRangeStart && "rounded-l-md",
                                "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                              )
                            : isDateSelected && "rounded-md",
                          classNames?.cell,
                        )}
                      >
                        {dateObj && (
                          // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                          <button
                            type="button"
                            onClick={() => handleSelect(dateObj)}
                            disabled={isDateDisabled}
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                              isDateSelected &&
                                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                              isDateToday && "bg-accent text-accent-foreground",
                              isDateOutside && "text-muted-foreground",
                              isDateOutside && isDateSelected && "bg-accent/50 text-muted-foreground",
                              isDateDisabled && "text-muted-foreground opacity-50",
                              isDateRangeStart && "day-range-start",
                              isDateRangeEnd && "day-range-end",
                              !isDateRangeStart &&
                                !isDateRangeEnd &&
                                isDateSelected &&
                                mode === "range" &&
                                "aria-selected:bg-accent aria-selected:text-accent-foreground",
                              classNames?.day,
                              isDateRangeStart && classNames?.day_range_start,
                              isDateRangeEnd && classNames?.day_range_end,
                              isDateSelected && classNames?.day_selected,
                              isDateToday && classNames?.day_today,
                              isDateOutside && classNames?.day_outside,
                              isDateDisabled && classNames?.day_disabled,
                              !isDateRangeStart &&
                                !isDateRangeEnd &&
                                isDateSelected &&
                                mode === "range" &&
                                classNames?.day_range_middle,
                            )}
                            aria-selected={isDateSelected}
                          >
                            {dateObj.day}
                          </button>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
