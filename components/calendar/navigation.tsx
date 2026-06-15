'use client'

import { cn } from '@/lib/utils'
import { Calendar, List, BookOpen } from 'lucide-react'

export type TabType = 'calendar' | 'events' | 'articles'

interface NavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: 'calendar' as const, label: 'Календарь', icon: Calendar },
  { id: 'events' as const, label: 'События', icon: List },
  { id: 'articles' as const, label: 'Статьи', icon: BookOpen },
]

// Desktop top navigation
export function DesktopNav({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-medium">ཨ</span>
        </div>
        <span className="font-serif text-lg font-medium">Тибетский календарь</span>
        <span className="text-muted-foreground text-sm ml-1">2026</span>
      </div>
      
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
      
      <div className="w-[140px]" /> {/* Spacer for balance */}
    </nav>
  )
}

// Mobile bottom tab bar
export function MobileNav({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[72px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
