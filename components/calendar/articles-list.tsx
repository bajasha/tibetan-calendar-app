'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { articles, type Article } from '@/lib/calendar-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'

const categoryLabels = {
  basics: 'Основы',
  practice: 'Практика',
  astrology: 'Астрология',
}

const categoryColors = {
  basics: 'bg-element-earth text-primary-foreground',
  practice: 'bg-element-fire text-primary-foreground',
  astrology: 'bg-element-water text-primary-foreground',
}

function ArticleCard({ 
  article, 
  onClick 
}: { 
  article: Article
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge className={cn('text-xs', categoryColors[article.category])}>
            {categoryLabels[article.category]}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} мин
          </span>
        </div>
        <h3 className="font-medium text-foreground text-lg leading-tight">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </button>
  )
}

function ArticleDetail({ 
  article, 
  onBack 
}: { 
  article: Article
  onBack: () => void 
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к статьям
        </Button>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn('text-xs', categoryColors[article.category])}>
            {categoryLabels[article.category]}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} мин чтения
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-foreground leading-tight">
          {article.title}
        </h1>
      </div>
      
      <ScrollArea className="flex-1">
        <article className="p-4 md:p-6 max-w-2xl">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          
          {/* Demo content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="leading-relaxed">
              {article.content}
            </p>
            
            <p className="leading-relaxed mt-4">
              Тибетский календарь представляет собой уникальную систему, объединяющую лунные циклы, 
              пятиэлементную астрологию и духовные практики буддийской традиции. Каждый день в этом 
              календаре несёт особую энергию, определяемую сочетанием лунного дня, элемента и животного года.
            </p>
            
            <h2 className="text-xl font-serif font-medium mt-6 mb-3">Лунный цикл</h2>
            <p className="leading-relaxed">
              Лунный месяц в тибетском календаре состоит из 30 дней, причём некоторые из них 
              считаются особенно благоприятными для духовных практик. Это 8-й, 10-й, 15-й, 
              25-й, 29-й и 30-й лунные дни.
            </p>
            
            <h2 className="text-xl font-serif font-medium mt-6 mb-3">Пять элементов</h2>
            <p className="leading-relaxed">
              Система пяти элементов — Дерево, Огонь, Земля, Металл и Вода — пришла из китайской 
              традиции и глубоко интегрирована в тибетскую астрологию. Каждый элемент связан 
              с определёнными качествами и влияет на характер дня.
            </p>
            
            <div className="p-4 rounded-lg bg-secondary/50 mt-6">
              <p className="text-sm text-muted-foreground italic">
                Это демонстрационный контент. В полной версии приложения здесь будет 
                развёрнутая статья с иллюстрациями и примерами.
              </p>
            </div>
          </div>
        </article>
      </ScrollArea>
    </div>
  )
}

export function ArticlesList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  
  if (selectedArticle) {
    return (
      <ArticleDetail 
        article={selectedArticle} 
        onBack={() => setSelectedArticle(null)} 
      />
    )
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 md:py-6 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-foreground">
            Статьи
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          База знаний о тибетской астрологии и практиках
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="secondary" size="sm" className="rounded-full">
              Все статьи
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Основы
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Практика
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Астрология
            </Button>
          </div>
          
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
