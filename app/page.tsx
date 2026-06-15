'use client'

import { useState, useEffect } from 'react'
import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { DayDetailSheet, DayDetailSidebar } from '@/components/calendar/day-detail'
import { EventsList } from '@/components/calendar/events-list'
import { ArticlesList } from '@/components/calendar/articles-list'
import { DesktopNav, MobileNav, type TabType } from '@/components/calendar/navigation'
import { type TibetanDay } from '@/lib/calendar-data'

const MOBILE_BREAKPOINT = 768

export default function TibetanCalendarApp() {
  const [activeTab, setActiveTab] = useState<TabType>('calendar')
  const [selectedDay, setSelectedDay] = useState<TibetanDay | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDaySelect = (day: TibetanDay) => {
    setSelectedDay(day)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setSelectedDay(null)
    setIsDetailOpen(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Desktop Navigation */}
      <DesktopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden pb-16 md:pb-0">
        {activeTab === 'calendar' && (
          <>
            {/* Calendar Grid */}
            <div className="flex-1 overflow-auto">
              <CalendarGrid 
                onDaySelect={handleDaySelect}
                selectedDate={selectedDay?.gregorianDate}
              />
            </div>

            {/* Desktop Sidebar - only show when mounted and not mobile */}
            {mounted && !isMobile && selectedDay && (
              <div className="w-[380px] shrink-0">
                <DayDetailSidebar 
                  day={selectedDay} 
                  onClose={handleCloseDetail}
                />
              </div>
            )}

            {/* Mobile Sheet - only show when mounted and mobile */}
            {mounted && isMobile && (
              <DayDetailSheet
                day={selectedDay}
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
              />
            )}
          </>
        )}

        {activeTab === 'events' && (
          <div className="flex-1 overflow-hidden">
            <EventsList />
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="flex-1 overflow-hidden">
            <ArticlesList />
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
