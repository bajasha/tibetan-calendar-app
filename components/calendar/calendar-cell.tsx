'use client'

import { cn } from '@/lib/utils'
import {
  type TibetanDay,
  type CalendarEvent,
  elementInfo,
  actionInfo,
} from '@/lib/calendar-data'
import {
  Scissors,
  HeartPulse,
  Compass,
  Sparkles,
  Briefcase,
  Heart,
} from 'lucide-react'

interface CalendarCellProps {
  day: TibetanDay | null
  isToday: boolean
  isCurrentMonth: boolean
  events: CalendarEvent[]
  onClick?: () => void
  variant?: 'default' | 'compact' | 'minimal'
}

const actionIcons = {
  haircut: Scissors,
  medicine: HeartPulse,
  travel: Compass,
  prayer: Sparkles,
  business: Briefcase,
  marriage: Heart,
}

export function CalendarCell({
  day,
  isToday,
  isCurrentMonth,
  events,
  onClick,
  variant = 'default',
}: CalendarCellProps) {
  if (!day) {
    return (
      <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] bg-muted/30" />
    )
  }

  const elementColor = elementInfo[day.element].color
  const gregorianDay = day.gregorianDate.getDate()

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col text-left transition-all duration-200',
        'min-h-[80px] md:min-h-[100px] lg:min-h-[120px] p-1.5 md:p-2',
        'hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
        isCurrentMonth ? 'bg-card' : 'bg-muted/30',
        isToday && 'ring-2 ring-primary ring-inset bg-primary/5',
        day.isSpecialLunarDay && !isToday && 'bg-auspicious/5'
      )}
    >
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Gregorian date - primary */}
        <div className="flex items-start justify-between gap-1">
          <span
            className={cn(
              'text-base md:text-lg lg:text-xl font-semibold leading-none',
              isToday && 'text-primary',
              !isCurrentMonth && 'text-muted-foreground/50'
            )}
          >
            {gregorianDay}
          </span>

          {/* Element indicator */}
          <div
            className={cn(
              'w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0',
              elementColor
            )}
            title={elementInfo[day.element].nameRu}
          />
        </div>

        {/* Lunar day with action icons on same row */}
        <div className="flex items-center justify-between mt-0.5 gap-1">
          <span
            className={cn(
              'text-[10px] md:text-xs text-muted-foreground shrink-0',
              day.isSpecialLunarDay && 'text-auspicious font-medium',
              !isCurrentMonth && 'text-muted-foreground/40'
            )}
          >
            ☽ {day.lunarDay}
          </span>
          
          {/* Auspicious actions - right aligned on lunar day row */}
          {day.auspiciousActions.length > 0 && (
            <div className="flex flex-wrap justify-end gap-0.5">
              {day.auspiciousActions.slice(0, 4).map((action) => {
                const Icon = actionIcons[action]
                return (
                  <div
                    key={action}
                    className="text-muted-foreground/70 hover:text-foreground transition-colors"
                    title={actionInfo[action].nameRu}
                  >
                    <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* All events (single-day and multi-day) as pills with text wrapping */}
        {events.length > 0 && (
          <div className="flex flex-col gap-0.5 mt-1">
            {events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={cn(
                  'text-[8px] md:text-[9px] leading-tight px-1 py-0.5 rounded',
                  event.color,
                  'text-primary-foreground'
                )}
              >
                {event.titleRu}
              </div>
            ))}
            {events.length > 2 && (
              <span className="text-[8px] text-muted-foreground">+{events.length - 2}</span>
            )}
          </div>
        )}

        {/* Mobile: dot indicators for auspicious days (no event dots - events shown as pills) */}
        {day.isAuspicious && day.auspiciousLevel >= 2 && events.length === 0 && (
          <div className="flex md:hidden gap-1 mt-auto pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-auspicious" />
          </div>
        )}
      </div>
    </button>
  )
}

// Variant 2: More traditional styling
export function CalendarCellTraditional({
  day,
  isToday,
  isCurrentMonth,
  events,
  onClick,
}: CalendarCellProps) {
  if (!day) {
    return (
      <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] bg-muted/20 border-r border-b border-border/50" />
    )
  }

  const elementColor = elementInfo[day.element].color
  const gregorianDay = day.gregorianDate.getDate()

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col text-left transition-all duration-200',
        'min-h-[80px] md:min-h-[100px] lg:min-h-[120px] p-2 md:p-3',
        'border-r border-b border-border/50',
        'hover:bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
        isCurrentMonth ? 'bg-card' : 'bg-muted/20',
        isToday && 'bg-primary/10',
        day.isSpecialLunarDay && !isToday && 'bg-auspicious/8'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Date header with element badge */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-sm md:text-base font-medium',
              isToday && 'bg-primary text-primary-foreground',
              !isToday && day.isSpecialLunarDay && 'bg-auspicious/20 text-foreground',
              !isToday && !day.isSpecialLunarDay && 'text-foreground',
              !isCurrentMonth && 'text-muted-foreground/50'
            )}
          >
            {gregorianDay}
          </span>
          
          <div
            className={cn(
              'px-1.5 py-0.5 rounded text-[10px] font-medium',
              elementColor,
              'text-primary-foreground'
            )}
          >
            {elementInfo[day.element].nameRu}
          </div>
        </div>

        {/* Lunar day with decorative element */}
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <span className="opacity-60">лунный</span>
          <span className={cn(
            'font-medium',
            day.isSpecialLunarDay && 'text-auspicious'
          )}>
            {day.lunarDay}
          </span>
        </div>

        {/* Auspicious actions */}
        {day.auspiciousActions.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1 mt-auto pt-2">
            {day.auspiciousActions.slice(0, 3).map((action) => {
              const Icon = actionIcons[action]
              return (
                <div
                  key={action}
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-md',
                    'bg-secondary text-muted-foreground',
                    'hover:bg-accent hover:text-accent-foreground transition-colors'
                  )}
                  title={actionInfo[action].nameRu}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </button>
  )
}

// Variant 3: Minimalist modern
export function CalendarCellMinimal({
  day,
  isToday,
  isCurrentMonth,
  events,
  onClick,
}: CalendarCellProps) {
  if (!day) {
    return (
      <div className="aspect-square bg-transparent" />
    )
  }

  const gregorianDay = day.gregorianDate.getDate()
  const hasEvents = events.length > 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative aspect-square flex flex-col items-center justify-center',
        'transition-all duration-200 rounded-lg',
        'hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring',
        !isCurrentMonth && 'opacity-30'
      )}
    >
      {/* Gregorian date */}
      <span
        className={cn(
          'text-lg md:text-xl lg:text-2xl font-light',
          isToday && 'font-semibold text-primary',
          day.isSpecialLunarDay && !isToday && 'text-auspicious'
        )}
      >
        {gregorianDay}
      </span>

      {/* Lunar day */}
      <span className="text-[10px] md:text-xs text-muted-foreground">
        {day.lunarDay}
      </span>

      {/* Element dot */}
      <div
        className={cn(
          'absolute top-1 right-1 w-1.5 h-1.5 rounded-full',
          elementInfo[day.element].color
        )}
      />

      {/* Event/auspicious indicator */}
      {(hasEvents || day.isAuspicious) && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          {hasEvents && <div className="w-1 h-1 rounded-full bg-primary" />}
          {day.isAuspicious && day.auspiciousLevel >= 2 && (
            <div className="w-1 h-1 rounded-full bg-auspicious" />
          )}
        </div>
      )}

      {/* Today ring */}
      {isToday && (
        <div className="absolute inset-1 rounded-lg ring-2 ring-primary pointer-events-none" />
      )}
    </button>
  )
}
