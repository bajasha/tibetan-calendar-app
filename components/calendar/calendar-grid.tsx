'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { 
  ChevronLeft, 
  ChevronRight,
  Scissors,
  HeartPulse,
  Compass,
  Sparkles,
  Briefcase,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CalendarCell,
  CalendarCellTraditional,
  CalendarCellMinimal,
} from './calendar-cell'
import {
  type TibetanDay,
  type CalendarEvent,
  generateMarch2026Data,
  march2026Events,
} from '@/lib/calendar-data'

interface CalendarGridProps {
  onDaySelect: (day: TibetanDay) => void
  selectedDate?: Date
  variant?: 'default' | 'traditional' | 'minimal'
}

const WEEKDAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const legendTextClass = 'text-[10px] md:text-[11px] lg:text-xs leading-snug text-muted-foreground'
const legendSeparatorClass = cn(legendTextClass, 'text-muted-foreground/50')

// Marquee legend content component
function MarqueeLegendContent() {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Elements */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-element-wood" />
        <span className={legendTextClass}>Дерево</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-element-fire" />
        <span className={legendTextClass}>Огонь</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-element-earth" />
        <span className={legendTextClass}>Земля</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-element-metal" />
        <span className={legendTextClass}>Металл</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-element-water" />
        <span className={legendTextClass}>Вода</span>
      </div>
      
      <span className={legendSeparatorClass}>·</span>
      
      {/* Auspicious day */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-auspicious" />
        <span className={legendTextClass}>Благоприятный</span>
      </div>
      
      <span className={legendSeparatorClass}>·</span>
      
      {/* Event */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className={legendTextClass}>Событие</span>
      </div>
      
      <span className={legendSeparatorClass}>·</span>
      
      {/* Actions */}
      <div className="flex items-center gap-1">
        <Scissors className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Стрижка</span>
      </div>
      <div className="flex items-center gap-1">
        <HeartPulse className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Лечение</span>
      </div>
      <div className="flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Молитва</span>
      </div>
      <div className="flex items-center gap-1">
        <Compass className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Путешествие</span>
      </div>
      <div className="flex items-center gap-1">
        <Briefcase className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Дела</span>
      </div>
      <div className="flex items-center gap-1">
        <Heart className="w-2.5 h-2.5 shrink-0 text-muted-foreground/70" />
        <span className={legendTextClass}>Свадьба</span>
      </div>
      
      <span className={cn(legendSeparatorClass, 'mr-4')}>·</span>
    </div>
  )
}

export function CalendarGrid({ onDaySelect, selectedDate, variant = 'default' }: CalendarGridProps) {
  // For demo, we're locked to March 2026
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1))
  
  // Generate Tibetan day data for March 2026
  const tibetanDays = useMemo(() => generateMarch2026Data(), [])
  
  // Get calendar grid data
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    let startOffset = firstDay.getDay() - 1
    if (startOffset < 0) startOffset = 6
    
    const daysInMonth = lastDay.getDate()
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
    
    const cells: (TibetanDay | null)[] = []
    
    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - startOffset
      if (dayIndex >= 0 && dayIndex < daysInMonth) {
        cells.push(tibetanDays[dayIndex])
      } else {
        cells.push(null)
      }
    }
    
    return cells
  }, [currentMonth, tibetanDays])
  
  // Get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return march2026Events.filter((event) => {
      const dateTime = date.getTime()
      const startTime = new Date(event.startDate).setHours(0, 0, 0, 0)
      const endTime = new Date(event.endDate).setHours(23, 59, 59, 999)
      return dateTime >= startTime && dateTime <= endTime
    })
  }
  
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }
  
  const CellComponent = variant === 'traditional' 
    ? CalendarCellTraditional 
    : variant === 'minimal' 
    ? CalendarCellMinimal 
    : CalendarCell

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 md:py-6">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-foreground">
            {MONTHS_RU[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Тибетский календарь
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Предыдущий месяц</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="h-9 w-9"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Следующий месяц</span>
          </Button>
        </div>
      </div>
      
      {/* Marquee legend above weekdays — pauses on hover/focus */}
      <div className="shrink-0 overflow-hidden border-y border-border/50 bg-muted/20 group">
        <div className="animate-marquee motion-reduce:animate-none group-hover:pause group-focus-within:pause flex w-max items-center gap-4 md:gap-6 py-1.5 md:py-2 whitespace-nowrap px-4">
          {/* First copy of content */}
          <MarqueeLegendContent />
          {/* Second copy for seamless loop */}
          <MarqueeLegendContent />
        </div>
      </div>
      
      {/* Weekday headers */}
      <div className={cn(
        'shrink-0 grid grid-cols-7 border-b border-border',
        variant === 'minimal' && 'border-none'
      )}>
        {WEEKDAYS_RU.map((day, index) => (
          <div
            key={day}
            className={cn(
              'py-2 md:py-3 text-center text-xs md:text-sm font-medium text-muted-foreground',
              index >= 5 && 'text-muted-foreground/70' // Weekend styling
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className={cn(
        'grid grid-cols-7 flex-1',
        variant === 'default' && 'border-l border-t border-border divide-x divide-y divide-border',
        variant === 'traditional' && 'border-l border-t border-border/50',
        variant === 'minimal' && 'gap-1 p-2'
      )}>
        {calendarData.map((day, index) => (
          <CellComponent
            key={index}
            day={day}
            isToday={day ? isToday(day.gregorianDate) : false}
            isCurrentMonth={day !== null}
            events={day ? getEventsForDate(day.gregorianDate) : []}
            onClick={day ? () => onDaySelect(day) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
