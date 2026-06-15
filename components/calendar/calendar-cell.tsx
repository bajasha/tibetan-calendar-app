'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { cn } from '@/lib/utils'
import {
  type TibetanDay,
  type CalendarEvent,
  type AuspiciousAction,
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

const MOBILE_MEDIA_QUERY = '(max-width: 767px)'
const MOBILE_MAX_VISIBLE_ITEMS = 2
const ACTION_ICON_SIZE = 10
const ACTION_ICON_GAP = 2
const ACTION_ICON_MAX_ROWS = 2

const cellSmallTextClass = 'text-[10px] md:text-[11px] lg:text-xs leading-snug'

const eventTextClass = cn(
  cellSmallTextClass,
  'px-1 py-0.5 whitespace-nowrap text-clip overflow-hidden'
)

const eventFadeStyle: CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 10px), transparent)',
  maskImage: 'linear-gradient(to right, black calc(100% - 10px), transparent)',
}

function CalendarCellEvent({
  title,
  color,
}: {
  title: string
  color: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useLayoutEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!container || !measure) return

    const checkTruncation = () => {
      setIsTruncated(measure.offsetWidth > container.clientWidth + 1)
    }

    checkTruncation()
    const observer = new ResizeObserver(checkTruncation)
    observer.observe(container)
    return () => observer.disconnect()
  }, [title])

  const fadeStyle = isTruncated ? eventFadeStyle : undefined

  return (
    <div
      ref={containerRef}
      data-event
      className="relative w-full shrink-0 overflow-hidden rounded"
    >
      <div
        className={cn('absolute inset-0', color)}
        style={fadeStyle}
        aria-hidden
      />
      <span
        ref={measureRef}
        className={cn(
          'invisible absolute whitespace-nowrap pointer-events-none',
          eventTextClass,
          'px-1 py-0.5'
        )}
        aria-hidden
      >
        {title}
      </span>
      <span
        className={cn(
          'relative block text-primary-foreground',
          eventTextClass,
          isTruncated && 'text-clip overflow-hidden'
        )}
        style={fadeStyle}
      >
        {title}
      </span>
    </div>
  )
}

function CalendarCellMore({ count }: { count: number }) {
  return (
    <div data-more className="relative shrink-0 overflow-hidden rounded">
      <div className="absolute inset-0 bg-secondary" aria-hidden />
      <span className={cn('relative block text-secondary-foreground', eventTextClass)}>
        Ещё {count}
      </span>
    </div>
  )
}

function getActionIconGridDimensions(count: number): { cols: number; rows: number } {
  if (count <= 0) return { cols: 0, rows: 0 }
  if (count === 1) return { cols: 1, rows: 1 }
  if (count === 2) return { cols: 2, rows: 1 }
  if (count === 3) return { cols: 3, rows: 1 }
  if (count === 4) return { cols: 2, rows: 2 }
  if (count === 5) return { cols: 5, rows: 1 }

  return {
    cols: Math.ceil(count / ACTION_ICON_MAX_ROWS),
    rows: ACTION_ICON_MAX_ROWS,
  }
}

function actionIconGridFits(
  cols: number,
  rows: number,
  maxWidth: number,
  maxHeight: number
): boolean {
  const width = cols * ACTION_ICON_SIZE + Math.max(cols - 1, 0) * ACTION_ICON_GAP
  const height = rows * ACTION_ICON_SIZE + Math.max(rows - 1, 0) * ACTION_ICON_GAP

  return width <= maxWidth + 0.5 && height <= maxHeight + 0.5
}

function CalendarCellActionIconGrid({ actions }: { actions: AuspiciousAction[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(actions.length)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || actions.length === 0) return

    const calculateVisibleCount = () => {
      const row = container.parentElement?.parentElement
      if (!row) return

      const lunarDay = row.firstElementChild as HTMLElement | null
      const rowStyles = getComputedStyle(row)
      const gap = Number.parseFloat(rowStyles.columnGap || rowStyles.gap) || 4
      const maxWidth = row.clientWidth - (lunarDay?.offsetWidth ?? 0) - gap

      if (maxWidth <= 0) return

      const maxHeight =
        ACTION_ICON_MAX_ROWS * ACTION_ICON_SIZE +
        (ACTION_ICON_MAX_ROWS - 1) * ACTION_ICON_GAP

      let count = actions.length

      while (count >= 1) {
        const { cols, rows } = getActionIconGridDimensions(count)

        if (actionIconGridFits(cols, rows, maxWidth, maxHeight)) {
          setVisibleCount(count)
          return
        }

        count--
      }

      setVisibleCount(1)
    }

    calculateVisibleCount()
    const row = container.parentElement?.parentElement
    const observer = new ResizeObserver(calculateVisibleCount)
    if (row) observer.observe(row)
    return () => observer.disconnect()
  }, [actions.length])

  const { cols } = getActionIconGridDimensions(visibleCount)
  const visibleActions = actions.slice(0, visibleCount)

  return (
    <div ref={containerRef} className="shrink-0 ml-auto">
      <div
        className="grid shrink-0 gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${ACTION_ICON_SIZE}px)`,
        }}
      >
        {visibleActions.map((action) => {
          const Icon = actionIcons[action]

          return (
            <div
              key={action}
              className="flex items-center justify-center shrink-0 text-muted-foreground/70"
              style={{ width: ACTION_ICON_SIZE, height: ACTION_ICON_SIZE }}
              title={actionInfo[action].nameRu}
            >
              <Icon className="w-2.5 h-2.5 shrink-0" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function useCalendarCellVisibleCount(
  wrapperRef: RefObject<HTMLDivElement | null>,
  measureRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
  itemSelector: string,
  mobileMax?: number
) {
  const [visibleCount, setVisibleCount] = useState(itemCount)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const measure = measureRef.current
    if (!wrapper || !measure || itemCount === 0) return

    const calculateVisibleCount = () => {
      const button = wrapper.closest('button')
      if (!button) return

      const buttonStyles = getComputedStyle(button)
      const paddingBottom = Number.parseFloat(buttonStyles.paddingBottom) || 0
      const limitBottom = button.getBoundingClientRect().bottom - paddingBottom

      const itemElements = measure.querySelectorAll<HTMLElement>(itemSelector)
      const moreElement = measure.querySelector<HTMLElement>('[data-more]')
      const moreHeight = moreElement?.offsetHeight ?? 0
      const gap = 2

      let count = 0

      for (let i = 0; i < itemElements.length; i++) {
        const itemBottom = itemElements[i].getBoundingClientRect().bottom
        const remaining = itemElements.length - count - 1
        const limit = limitBottom - (remaining > 0 ? moreHeight + gap : 0)

        if (itemBottom <= limit + 0.5) {
          count++
        } else {
          break
        }
      }

      if (mobileMax !== undefined && window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
        count = Math.min(count, mobileMax)
      }

      setVisibleCount(count)
    }

    calculateVisibleCount()
    const button = wrapper.closest('button')
    const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
    const observer = new ResizeObserver(calculateVisibleCount)
    observer.observe(wrapper)
    observer.observe(measure)
    if (button) observer.observe(button)
    mobileQuery.addEventListener('change', calculateVisibleCount)
    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener('change', calculateVisibleCount)
    }
  }, [itemCount, itemSelector, measureRef, mobileMax, wrapperRef])

  return visibleCount
}

function CalendarCellOverflowList({
  wrapperClassName,
  itemSelector,
  itemCount,
  mobileMax,
  measureItems,
  visibleItems,
}: {
  wrapperClassName: string
  itemSelector: string
  itemCount: number
  mobileMax?: number
  measureItems: ReactNode
  visibleItems: (visibleCount: number) => ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const visibleCount = useCalendarCellVisibleCount(
    wrapperRef,
    measureRef,
    itemCount,
    itemSelector,
    mobileMax
  )

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div
        ref={measureRef}
        className="absolute inset-x-0 top-0 flex flex-col gap-0.5 opacity-0 pointer-events-none"
        aria-hidden
      >
        {measureItems}
        <CalendarCellMore count={99} />
      </div>

      <div className="flex flex-col gap-0.5">{visibleItems(visibleCount)}</div>
    </div>
  )
}

function CalendarCellEvents({ events }: { events: CalendarEvent[] }) {
  return (
    <CalendarCellOverflowList
      wrapperClassName="relative flex flex-col md:flex-1 min-h-0 mt-1 overflow-hidden"
      itemSelector="[data-event]"
      itemCount={events.length}
      mobileMax={MOBILE_MAX_VISIBLE_ITEMS}
      measureItems={events.map((event) => (
        <CalendarCellEvent
          key={event.id}
          title={event.titleRu}
          color={event.color}
        />
      ))}
      visibleItems={(visibleCount) => {
        const hiddenCount = events.length - visibleCount

        return (
          <>
            {events.slice(0, visibleCount).map((event) => (
              <CalendarCellEvent
                key={event.id}
                title={event.titleRu}
                color={event.color}
              />
            ))}
            {hiddenCount > 0 && <CalendarCellMore count={hiddenCount} />}
          </>
        )
      }}
    />
  )
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
        'relative flex flex-col text-left transition-all duration-200 overflow-hidden h-full',
        'min-h-[80px] md:min-h-[100px] lg:min-h-[120px] p-1.5 md:p-2',
        'hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
        isCurrentMonth ? 'bg-card' : 'bg-muted/30',
        isToday && 'ring-2 ring-primary ring-inset bg-primary/5',
        day.isSpecialLunarDay && !isToday && 'bg-auspicious/5'
      )}
    >
      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Dates block — consistent gap between gregorian and lunar rows */}
        <div className="flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between gap-1">
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
                'w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0',
                elementColor
              )}
              title={elementInfo[day.element].nameRu}
            />
          </div>

          {/* Lunar day with action icons on same row */}
          <div className="flex items-center justify-between gap-1 min-w-0">
            <span
              className={cn(
                'text-[10px] md:text-xs leading-none text-muted-foreground shrink-0',
                day.isSpecialLunarDay && 'text-auspicious font-medium',
                !isCurrentMonth && 'text-muted-foreground/40'
              )}
            >
              ☽ {day.lunarDay}
            </span>

            {day.auspiciousActions.length > 0 && (
              <div className="shrink-0 ml-auto">
                <CalendarCellActionIconGrid actions={day.auspiciousActions} />
              </div>
            )}
          </div>
        </div>

        {/* Events with background fill, up to available space */}
        {events.length > 0 && <CalendarCellEvents events={events} />}

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
