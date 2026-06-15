'use client'

import { cn } from '@/lib/utils'
import { march2026Events, type CalendarEvent } from '@/lib/calendar-data'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar, Sparkles, Moon } from 'lucide-react'

const MONTHS_RU_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
]

function formatDateRange(start: Date, end: Date): string {
  const startDay = start.getDate()
  const endDay = end.getDate()
  const month = MONTHS_RU_GENITIVE[start.getMonth()]
  
  if (startDay === endDay) {
    return `${startDay} ${month}`
  }
  return `${startDay}–${endDay} ${month}`
}

function EventCard({ event }: { event: CalendarEvent }) {
  const TypeIcon = event.type === 'holiday' ? Calendar : 
                   event.type === 'practice' ? Sparkles : Moon
  
  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg shrink-0",
          event.color
        )}>
          <TypeIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs">
              {event.type === 'holiday' ? 'Праздник' :
               event.type === 'practice' ? 'Практика' : 
               'Лунный день'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDateRange(event.startDate, event.endDate)}
            </span>
          </div>
          <h3 className="font-medium text-foreground mb-1 line-clamp-2">
            {event.titleRu}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.descriptionRu}
          </p>
        </div>
      </div>
    </div>
  )
}

export function EventsList() {
  // Sort events by date
  const sortedEvents = [...march2026Events].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  )
  
  // Group events by type
  const upcomingEvents = sortedEvents.filter(e => e.startDate >= new Date())
  const pastEvents = sortedEvents.filter(e => e.endDate < new Date())
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 md:py-6 border-b border-border">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-foreground">
          События
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Значимые даты и практики
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Upcoming section */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Предстоящие события
            </h2>
            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  Все события в этом месяце уже прошли
                </p>
              )}
            </div>
          </div>
          
          {/* All events for the month */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Все события марта 2026
            </h2>
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
