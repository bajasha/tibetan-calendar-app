// Tibetan Calendar Types and Data

export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water'
export type Animal = 'mouse' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake' | 'horse' | 'sheep' | 'monkey' | 'rooster' | 'dog' | 'pig'
export type AuspiciousAction = 'haircut' | 'medicine' | 'travel' | 'prayer' | 'business' | 'marriage'

export interface TibetanDay {
  gregorianDate: Date
  lunarDay: number
  element: Element
  animal: Animal
  isAuspicious: boolean
  auspiciousLevel: 1 | 2 | 3 // 1 = slightly, 2 = moderately, 3 = highly auspicious
  auspiciousActions: AuspiciousAction[]
  advice: string
  isSpecialLunarDay: boolean // 8, 10, 15, 25, 29, 30
}

export interface CalendarEvent {
  id: string
  title: string
  titleRu: string
  startDate: Date
  endDate: Date
  type: 'holiday' | 'practice' | 'lunar'
  description: string
  descriptionRu: string
  color: string
}

export interface Article {
  id: string
  title: string
  category: 'basics' | 'practice' | 'astrology'
  excerpt: string
  readTime: number
  content: string
}

// Element display info
export const elementInfo: Record<Element, { name: string; nameRu: string; color: string; symbol: string }> = {
  wood: { name: 'Wood', nameRu: 'Дерево', color: 'bg-element-wood', symbol: '木' },
  fire: { name: 'Fire', nameRu: 'Огонь', color: 'bg-element-fire', symbol: '火' },
  earth: { name: 'Earth', nameRu: 'Земля', color: 'bg-element-earth', symbol: '土' },
  metal: { name: 'Metal', nameRu: 'Металл', color: 'bg-element-metal', symbol: '金' },
  water: { name: 'Water', nameRu: 'Вода', color: 'bg-element-water', symbol: '水' },
}

export const animalInfo: Record<Animal, { name: string; nameRu: string; symbol: string }> = {
  mouse: { name: 'Mouse', nameRu: 'Мышь', symbol: '🐀' },
  ox: { name: 'Ox', nameRu: 'Бык', symbol: '🐂' },
  tiger: { name: 'Tiger', nameRu: 'Тигр', symbol: '🐅' },
  rabbit: { name: 'Rabbit', nameRu: 'Кролик', symbol: '🐇' },
  dragon: { name: 'Dragon', nameRu: 'Дракон', symbol: '🐉' },
  snake: { name: 'Snake', nameRu: 'Змея', symbol: '🐍' },
  horse: { name: 'Horse', nameRu: 'Лошадь', symbol: '🐴' },
  sheep: { name: 'Sheep', nameRu: 'Овца', symbol: '🐏' },
  monkey: { name: 'Monkey', nameRu: 'Обезьяна', symbol: '🐒' },
  rooster: { name: 'Rooster', nameRu: 'Петух', symbol: '🐓' },
  dog: { name: 'Dog', nameRu: 'Собака', symbol: '🐕' },
  pig: { name: 'Pig', nameRu: 'Свинья', symbol: '🐖' },
}

export const actionInfo: Record<AuspiciousAction, { name: string; nameRu: string; icon: string }> = {
  haircut: { name: 'Haircut', nameRu: 'Стрижка', icon: 'scissors' },
  medicine: { name: 'Medicine', nameRu: 'Лечение', icon: 'heart-pulse' },
  travel: { name: 'Travel', nameRu: 'Путешествие', icon: 'compass' },
  prayer: { name: 'Prayer', nameRu: 'Молитва', icon: 'sparkles' },
  business: { name: 'Business', nameRu: 'Дела', icon: 'briefcase' },
  marriage: { name: 'Marriage', nameRu: 'Свадьба', icon: 'heart' },
}

// Generate March 2026 demo data
const elements: Element[] = ['wood', 'fire', 'earth', 'metal', 'water']
const animals: Animal[] = ['mouse', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'sheep', 'monkey', 'rooster', 'dog', 'pig']
const specialLunarDays = [8, 10, 15, 25, 29, 30]

const advices = [
  'Благоприятный день для медитации и внутренней работы.',
  'Хороший день для начала новых дел и проектов.',
  'День подходит для завершения начатого.',
  'Уделите внимание здоровью и отдыху.',
  'Благоприятно для духовных практик и молитв.',
  'День подходит для общения с близкими.',
  'Хорошее время для планирования будущего.',
  'Избегайте конфликтов, практикуйте терпение.',
]

// Pre-defined deterministic data for each day to avoid hydration mismatch
const dayData: Array<{ isAuspicious: boolean; auspiciousLevel: 1 | 2 | 3; actions: AuspiciousAction[] }> = [
  { isAuspicious: true, auspiciousLevel: 2, actions: ['prayer', 'medicine'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: [] },
  { isAuspicious: true, auspiciousLevel: 2, actions: ['travel', 'business'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: ['haircut'] },
  { isAuspicious: true, auspiciousLevel: 1, actions: ['prayer'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: ['medicine'] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'marriage'] }, // lunar 20
  { isAuspicious: true, auspiciousLevel: 2, actions: ['travel', 'business'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: [] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'travel', 'business'] }, // lunar 22 - Dakini Day
  { isAuspicious: false, auspiciousLevel: 1, actions: ['haircut'] },
  { isAuspicious: true, auspiciousLevel: 1, actions: ['medicine'] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'travel', 'medicine', 'business'] }, // lunar 25 - special
  { isAuspicious: true, auspiciousLevel: 2, actions: ['prayer', 'business'] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'travel', 'marriage'] }, // lunar 27 - Full Moon
  { isAuspicious: false, auspiciousLevel: 1, actions: [] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'business', 'travel'] }, // lunar 29 - special
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'travel', 'marriage', 'business'] }, // lunar 30 - special
  { isAuspicious: true, auspiciousLevel: 2, actions: ['travel', 'prayer'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: ['medicine'] },
  { isAuspicious: true, auspiciousLevel: 1, actions: ['business'] },
  { isAuspicious: true, auspiciousLevel: 2, actions: ['prayer', 'travel'] }, // Guru Rinpoche Day
  { isAuspicious: false, auspiciousLevel: 1, actions: ['haircut'] },
  { isAuspicious: true, auspiciousLevel: 1, actions: ['medicine', 'prayer'] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'travel'] }, // lunar 8 - special
  { isAuspicious: false, auspiciousLevel: 1, actions: [] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'business', 'travel'] }, // lunar 10 - special
  { isAuspicious: true, auspiciousLevel: 2, actions: ['travel', 'business'] },
  { isAuspicious: true, auspiciousLevel: 3, actions: ['prayer', 'medicine', 'travel'] }, // New Moon
  { isAuspicious: true, auspiciousLevel: 2, actions: ['business', 'prayer'] },
  { isAuspicious: false, auspiciousLevel: 1, actions: ['haircut'] },
]

export function generateMarch2026Data(): TibetanDay[] {
  const days: TibetanDay[] = []
  const startDate = new Date(2026, 2, 1) // March 1, 2026
  
  for (let i = 0; i < 31; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    const lunarDay = ((i + 12) % 30) + 1 // Starting from lunar day 13
    const elementIndex = (i + 2) % 5
    const animalIndex = i % 12
    const isSpecialLunarDay = specialLunarDays.includes(lunarDay)
    
    const data = dayData[i]
    
    days.push({
      gregorianDate: date,
      lunarDay,
      element: elements[elementIndex],
      animal: animals[animalIndex],
      isAuspicious: isSpecialLunarDay || data.isAuspicious,
      auspiciousLevel: isSpecialLunarDay ? 3 : data.auspiciousLevel,
      auspiciousActions: data.actions,
      advice: advices[i % advices.length],
      isSpecialLunarDay,
    })
  }
  
  return days
}

// Calendar events for March 2026
export const march2026Events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Losar (Tibetan New Year)',
    titleRu: 'Лосар (Тибетский Новый год)',
    startDate: new Date(2026, 2, 3),
    endDate: new Date(2026, 2, 17),
    type: 'holiday',
    description: 'The most important Tibetan holiday, celebrating the new year with rituals, prayers, and family gatherings.',
    descriptionRu: 'Главный тибетский праздник — встреча нового года с ритуалами, молитвами и семейными собраниями.',
    color: 'bg-primary',
  },
  {
    id: '2',
    title: 'Dakini Day',
    titleRu: 'День Дакини',
    startDate: new Date(2026, 2, 10),
    endDate: new Date(2026, 2, 10),
    type: 'practice',
    description: 'Special day for Vajrayogini practice and offerings to dakinis.',
    descriptionRu: 'Особый день для практики Ваджрайогини и подношений дакиням.',
    color: 'bg-element-fire',
  },
  {
    id: '3',
    title: 'Full Moon (Chotrul Duchen)',
    titleRu: 'Полнолуние (Чотрул Дюйчен)',
    startDate: new Date(2026, 2, 15),
    endDate: new Date(2026, 2, 15),
    type: 'lunar',
    description: 'Day of Miracles — commemorating Buddha displaying miracles. Merit multiplied 100 million times.',
    descriptionRu: 'День Чудес — в память о чудесах Будды. Заслуги умножаются в 100 миллионов раз.',
    color: 'bg-auspicious',
  },
  {
    id: '4',
    title: 'Guru Rinpoche Day',
    titleRu: 'День Гуру Ринпоче',
    startDate: new Date(2026, 2, 22),
    endDate: new Date(2026, 2, 22),
    type: 'practice',
    description: 'Auspicious day for Guru Rinpoche practices and tsok offerings.',
    descriptionRu: 'Благоприятный день для практик Гуру Ринпоче и подношений цог.',
    color: 'bg-element-earth',
  },
  {
    id: '5',
    title: 'Tara Day',
    titleRu: 'День Тары',
    startDate: new Date(2026, 2, 8),
    endDate: new Date(2026, 2, 8),
    type: 'practice',
    description: 'Special day for Green Tara practice and reciting the 21 Praises.',
    descriptionRu: 'Особый день для практики Зелёной Тары и чтения 21 Восхваления.',
    color: 'bg-element-wood',
  },
  {
    id: '6',
    title: 'New Moon',
    titleRu: 'Новолуние',
    startDate: new Date(2026, 2, 29),
    endDate: new Date(2026, 2, 29),
    type: 'lunar',
    description: 'New moon day — powerful time for purification practices and new beginnings.',
    descriptionRu: 'День новолуния — мощное время для практик очищения и новых начинаний.',
    color: 'bg-element-water',
  },
  {
    id: '7',
    title: 'Medicine Buddha Day',
    titleRu: 'День Будды Медицины',
    startDate: new Date(2026, 2, 18),
    endDate: new Date(2026, 2, 18),
    type: 'practice',
    description: 'Auspicious day for healing practices and Medicine Buddha puja.',
    descriptionRu: 'Благоприятный день для практик исцеления и пуджи Будды Медицины.',
    color: 'bg-element-metal',
  },
]

// Articles data
export const articles: Article[] = [
  {
    id: '1',
    title: 'Введение в тибетский календарь',
    category: 'basics',
    excerpt: 'Основы лунно-солнечной системы исчисления времени в тибетской традиции.',
    readTime: 8,
    content: 'Тибетский календарь — это сложная лунно-солнечная система...',
  },
  {
    id: '2',
    title: 'Пять элементов в тибетской астрологии',
    category: 'astrology',
    excerpt: 'Дерево, Огонь, Земля, Металл и Вода — как они влияют на каждый день.',
    readTime: 12,
    content: 'Система пяти элементов пришла из китайской традиции...',
  },
  {
    id: '3',
    title: 'Особые лунные дни',
    category: 'practice',
    excerpt: 'Почему 8-й, 10-й, 15-й, 25-й, 29-й и 30-й лунные дни особенно важны.',
    readTime: 6,
    content: 'В тибетской традиции определённые лунные дни считаются особенно благоприятными...',
  },
  {
    id: '4',
    title: 'Дакини и защитники',
    category: 'practice',
    excerpt: 'Дни практики дакинь и защитников в тибетском календаре.',
    readTime: 10,
    content: 'Каждый месяц в тибетском календаре есть особые дни...',
  },
  {
    id: '5',
    title: 'Благоприятные действия',
    category: 'astrology',
    excerpt: 'Как выбрать правильный день для важных дел согласно тибетской астрологии.',
    readTime: 15,
    content: 'Тибетская астрология предлагает систему определения благоприятности...',
  },
  {
    id: '6',
    title: 'Лосар — Тибетский Новый год',
    category: 'basics',
    excerpt: 'История и традиции главного праздника тибетского календаря.',
    readTime: 7,
    content: 'Лосар — это самый важный праздник в тибетской культуре...',
  },
]
