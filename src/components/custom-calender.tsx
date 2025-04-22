"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Days of the week
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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

export type CalendarProps = {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  initialFocus?: boolean
  disabled?: boolean
  fromDate?: Date
  toDate?: Date
}

export function CustomCalendar({
  selected,
  onSelect,
  className,
  initialFocus,
  disabled = false,
  fromDate,
  toDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())
  const [focusedDay, setFocusedDay] = React.useState<number | null>(null)

  // Get the number of days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Check if a date is selected
  const isSelected = (day: number) => {
    if (!selected || !day) return false


    if (Array.isArray(selected)) {
      return selected.some(
        (selectedDate) =>
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === currentMonth &&
          selectedDate.getFullYear() === currentYear,
      )
    } else {
      return (
        selected.getDate() === day && selected.getMonth() === currentMonth && selected.getFullYear() === currentYear
      )
    }
  }

  // Check if a date is disabled
  const isDisabled = (day: number) => {
    if (!day) return true
    if (disabled) return true

    const date = new Date(currentYear, currentMonth, day)

    if (fromDate && date < fromDate) return true
    if (toDate && date > toDate) return true

    return false
  }

  // Handle date selection
  const handleSelect = (day: number) => {
    if (!onSelect || isDisabled(day)) return

    const newDate = new Date(currentYear, currentMonth, day)
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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, day: number) => {
    if (isDisabled(day)) return

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        setFocusedDay(Math.max(1, day - 1))
        break
      case "ArrowRight":
        e.preventDefault()
        setFocusedDay(Math.min(getDaysInMonth(currentYear, currentMonth), day + 1))
        break
      case "ArrowUp":
        e.preventDefault()
        setFocusedDay(Math.max(1, day - 7))
        break
      case "ArrowDown":
        e.preventDefault()
        setFocusedDay(Math.min(getDaysInMonth(currentYear, currentMonth), day + 7))
        break
      case "Enter":
      case " ":
        e.preventDefault()
        handleSelect(day)
        break
    }
  }

  // Focus on the day when it changes
  React.useEffect(() => {
    if (focusedDay !== null) {
      const element = document.getElementById(`calendar-day-${focusedDay}`)
      if (element) {
        element.focus()
      }
    }
  }, [focusedDay])

  // Set initial focus if needed
  React.useEffect(() => {
    if (initialFocus) {
      // Focus on the selected day or today
      if (selected && !Array.isArray(selected)) {
        if (selected.getMonth() === currentMonth && selected.getFullYear() === currentYear) {
          setFocusedDay(selected.getDate())
        } else {
          setFocusedDay(new Date().getDate())
        }
      } else {
        setFocusedDay(new Date().getDate())
      }
    }
  }, [initialFocus, selected, currentMonth, currentYear])

  const days = generateCalendarDays()

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          disabled={fromDate && new Date(currentYear, currentMonth, 1) <= fromDate}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="font-medium">
          {MONTHS[currentMonth]} {currentYear}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          disabled={toDate && new Date(currentYear, currentMonth + 1, 0) >= toDate}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="p-0">
            {day ? (
              <Button
                id={`calendar-day-${day}`}
                variant={isSelected(day) ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-9 w-9",
                  isSelected(day) && "bg-primary text-primary-foreground",
                  !isSelected(day) && "hover:bg-accent hover:text-accent-foreground",
                  isDisabled(day) && "opacity-50 cursor-not-allowed",
                )}
                disabled={isDisabled(day)}
                onClick={() => handleSelect(day)}
                onKeyDown={(e) => handleKeyDown(e, day)}
                tabIndex={focusedDay === day ? 0 : -1}
              >
                {day}
              </Button>
            ) : (
              <div className="h-9 w-9" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
