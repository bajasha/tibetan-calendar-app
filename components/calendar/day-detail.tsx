'use client'

import { cn } from '@/lib/utils'
import {
  type TibetanDay,
  type CalendarEvent,
  elementInfo,
  animalInfo,
  actionInfo,
  march2026Events,
} from '@/lib/calendar-data'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Scissors,
  HeartPulse,
  Compass,
  Sparkles,
  Briefcase,
  Heart,
  X,
  Calendar,
  Moon,
  Star,
  Sun,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

const actionIcons = {
  haircut: Scissors,
  medicine: HeartPulse,
  travel: Compass,
  prayer: Sparkles,
  business: Briefcase,
  marriage: Heart,
}

interface DayDetailSheetProps {
  day: TibetanDay | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WEEKDAYS_RU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const MONTHS_RU_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
]

export function DayDetailSheet({ day, open, onOpenChange }: DayDetailSheetProps) {
  if (!day) return null
  
  const events = march2026Events.filter((event) => {
    const dateTime = day.gregorianDate.getTime()
    const startTime = new Date(event.startDate).setHours(0, 0, 0, 0)
    const endTime = new Date(event.endDate).setHours(23, 59, 59, 999)
    return dateTime >= startTime && dateTime <= endTime
  })
  
  const formattedDate = `${day.gregorianDate.getDate()} ${MONTHS_RU_GENITIVE[day.gregorianDate.getMonth()]} ${day.gregorianDate.getFullYear()}`
  const weekday = WEEKDAYS_RU[day.gregorianDate.getDay()]
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] md:h-auto md:max-h-[85vh] rounded-t-2xl md:rounded-none md:inset-y-0 md:right-0 md:left-auto md:w-[420px] md:rounded-l-2xl"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <SheetDescription className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {weekday}
              </SheetDescription>
              <SheetTitle className="text-2xl font-serif">
                {formattedDate}
              </SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 -mt-2 -mr-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Закрыть</span>
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(85vh-120px)] md:h-[calc(100vh-140px)]">
          <div className="py-6 space-y-6">
            {/* Tibetan date info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Характеристики дня
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Lunar day */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <Moon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Лунный день</p>
                    <p className={cn(
                      "text-lg font-semibold",
                      day.isSpecialLunarDay && "text-auspicious"
                    )}>
                      {day.lunarDay}
                    </p>
                  </div>
                </div>
                
                {/* Element */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    elementInfo[day.element].color
                  )}>
                    <span className="text-primary-foreground font-medium">
                      {elementInfo[day.element].symbol}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Элемент</p>
                    <p className="text-lg font-semibold">
                      {elementInfo[day.element].nameRu}
                    </p>
                  </div>
                </div>
                
                {/* Animal */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-xl">
                    {animalInfo[day.animal].symbol}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Животное</p>
                    <p className="text-lg font-semibold">
                      {animalInfo[day.animal].nameRu}
                    </p>
                  </div>
                </div>
                
                {/* Auspiciousness */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    day.isAuspicious ? "bg-auspicious/20" : "bg-background"
                  )}>
                    <Star className={cn(
                      "w-5 h-5",
                      day.isAuspicious ? "text-auspicious" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Благоприятность</p>
                    <p className="text-lg font-semibold">
                      {day.auspiciousLevel === 3 ? 'Высокая' : 
                       day.auspiciousLevel === 2 ? 'Средняя' : 
                       'Обычная'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Daily advice */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-medium text-primary">Рекомендация дня</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {day.advice}
              </p>
            </div>
            
            {/* Auspicious actions */}
            {day.auspiciousActions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Благоприятные действия
                </h3>
                <div className="flex flex-wrap gap-2">
                  {day.auspiciousActions.map((action) => {
                    const Icon = actionIcons[action]
                    return (
                      <div
                        key={action}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{actionInfo[action].nameRu}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Events */}
            {events.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  События
                </h3>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-1 h-full min-h-[40px] rounded-full shrink-0",
                          event.color
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {event.type === 'holiday' ? 'Праздник' :
                               event.type === 'practice' ? 'Практика' : 
                               'Лунный день'}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-foreground mb-1">
                            {event.titleRu}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {event.descriptionRu}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

// Desktop sidebar version
export function DayDetailSidebar({ day, onClose }: { day: TibetanDay | null; onClose: () => void }) {
  if (!day) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full p-8 text-center">
        <Calendar className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">
          Выберите день в календаре для просмотра подробной информации
        </p>
      </div>
    )
  }
  
  const events = march2026Events.filter((event) => {
    const dateTime = day.gregorianDate.getTime()
    const startTime = new Date(event.startDate).setHours(0, 0, 0, 0)
    const endTime = new Date(event.endDate).setHours(23, 59, 59, 999)
    return dateTime >= startTime && dateTime <= endTime
  })
  
  const formattedDate = `${day.gregorianDate.getDate()} ${MONTHS_RU_GENITIVE[day.gregorianDate.getMonth()]} ${day.gregorianDate.getFullYear()}`
  const weekday = WEEKDAYS_RU[day.gregorianDate.getDay()]
  
  return (
    <div className="hidden lg:flex flex-col h-full border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-border">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {weekday}
          </p>
          <h2 className="text-2xl font-serif">
            {formattedDate}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 -mt-2 -mr-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Characteristics */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Характеристики дня
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Lunar day */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Лунный день</p>
                  <p className={cn(
                    "text-lg font-semibold",
                    day.isSpecialLunarDay && "text-auspicious"
                  )}>
                    {day.lunarDay}
                  </p>
                </div>
              </div>
              
              {/* Element */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full",
                  elementInfo[day.element].color
                )}>
                  <span className="text-primary-foreground font-medium">
                    {elementInfo[day.element].symbol}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Элемент</p>
                  <p className="text-lg font-semibold">
                    {elementInfo[day.element].nameRu}
                  </p>
                </div>
              </div>
              
              {/* Animal */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-xl">
                  {animalInfo[day.animal].symbol}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Животное</p>
                  <p className="text-lg font-semibold">
                    {animalInfo[day.animal].nameRu}
                  </p>
                </div>
              </div>
              
              {/* Auspiciousness */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full",
                  day.isAuspicious ? "bg-auspicious/20" : "bg-background"
                )}>
                  <Star className={cn(
                    "w-5 h-5",
                    day.isAuspicious ? "text-auspicious" : "text-muted-foreground"
                  )} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Благоприятность</p>
                  <p className="text-lg font-semibold">
                    {day.auspiciousLevel === 3 ? 'Высокая' : 
                     day.auspiciousLevel === 2 ? 'Средняя' : 
                     'Обычная'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Daily advice */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-medium text-primary">Рекомендация дня</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {day.advice}
            </p>
          </div>
          
          {/* Auspicious actions */}
          {day.auspiciousActions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Благоприятные действия
              </h3>
              <div className="flex flex-wrap gap-2">
                {day.auspiciousActions.map((action) => {
                  const Icon = actionIcons[action]
                  return (
                    <div
                      key={action}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{actionInfo[action].nameRu}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Events */}
          {events.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                События
              </h3>
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border border-border bg-background"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-1 h-full min-h-[40px] rounded-full shrink-0",
                        event.color
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {event.type === 'holiday' ? 'Праздник' :
                             event.type === 'practice' ? 'Практика' : 
                             'Лунный день'}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground mb-1">
                          {event.titleRu}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.descriptionRu}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
