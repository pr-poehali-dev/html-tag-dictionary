import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface HTMLTag {
  name: string;
  category: string;
  description: string;
  example: string;
  attributes?: string[];
}

const htmlTags: HTMLTag[] = [
  {
    name: 'div',
    category: 'Структура',
    description: 'Универсальный контейнер для группировки содержимого',
    example: '<div>Содержимое</div>',
    attributes: ['class', 'id', 'style']
  },
  {
    name: 'span',
    category: 'Текст',
    description: 'Встроенный контейнер для текста',
    example: '<span>Текст</span>',
    attributes: ['class', 'id']
  },
  {
    name: 'p',
    category: 'Текст',
    description: 'Параграф текста',
    example: '<p>Параграф</p>',
    attributes: ['class', 'id']
  },
  {
    name: 'h1',
    category: 'Текст',
    description: 'Заголовок первого уровня',
    example: '<h1>Заголовок</h1>',
    attributes: ['class', 'id']
  },
  {
    name: 'h2',
    category: 'Текст',
    description: 'Заголовок второго уровня',
    example: '<h2>Подзаголовок</h2>',
    attributes: ['class', 'id']
  },
  {
    name: 'a',
    category: 'Текст',
    description: 'Гиперссылка',
    example: '<a href="url">Ссылка</a>',
    attributes: ['href', 'target', 'rel']
  },
  {
    name: 'img',
    category: 'Медиа',
    description: 'Изображение',
    example: '<img src="image.jpg" alt="описание" />',
    attributes: ['src', 'alt', 'width', 'height']
  },
  {
    name: 'video',
    category: 'Медиа',
    description: 'Видео контент',
    example: '<video src="video.mp4" controls></video>',
    attributes: ['src', 'controls', 'autoplay', 'loop']
  },
  {
    name: 'audio',
    category: 'Медиа',
    description: 'Аудио контент',
    example: '<audio src="audio.mp3" controls></audio>',
    attributes: ['src', 'controls', 'autoplay']
  },
  {
    name: 'input',
    category: 'Формы',
    description: 'Поле ввода',
    example: '<input type="text" placeholder="Введите текст" />',
    attributes: ['type', 'name', 'placeholder', 'value']
  },
  {
    name: 'button',
    category: 'Формы',
    description: 'Кнопка',
    example: '<button>Нажми меня</button>',
    attributes: ['type', 'disabled', 'onclick']
  },
  {
    name: 'form',
    category: 'Формы',
    description: 'Форма для ввода данных',
    example: '<form action="/submit" method="post"></form>',
    attributes: ['action', 'method', 'enctype']
  },
  {
    name: 'select',
    category: 'Формы',
    description: 'Выпадающий список',
    example: '<select><option>Вариант</option></select>',
    attributes: ['name', 'multiple', 'size']
  },
  {
    name: 'textarea',
    category: 'Формы',
    description: 'Многострочное поле ввода',
    example: '<textarea rows="4"></textarea>',
    attributes: ['rows', 'cols', 'placeholder']
  },
  {
    name: 'header',
    category: 'Семантика',
    description: 'Шапка страницы или секции',
    example: '<header>Заголовок сайта</header>',
    attributes: ['class', 'id']
  },
  {
    name: 'nav',
    category: 'Семантика',
    description: 'Навигационное меню',
    example: '<nav>Меню навигации</nav>',
    attributes: ['class', 'id']
  },
  {
    name: 'main',
    category: 'Семантика',
    description: 'Основное содержимое страницы',
    example: '<main>Основной контент</main>',
    attributes: ['class', 'id']
  },
  {
    name: 'footer',
    category: 'Семантика',
    description: 'Подвал страницы',
    example: '<footer>Подвал сайта</footer>',
    attributes: ['class', 'id']
  },
  {
    name: 'article',
    category: 'Семантика',
    description: 'Самостоятельная статья',
    example: '<article>Содержимое статьи</article>',
    attributes: ['class', 'id']
  },
  {
    name: 'section',
    category: 'Семантика',
    description: 'Тематическая секция',
    example: '<section>Секция контента</section>',
    attributes: ['class', 'id']
  },
  {
    name: 'ul',
    category: 'Структура',
    description: 'Ненумерованный список',
    example: '<ul><li>Элемент</li></ul>',
    attributes: ['class', 'id']
  },
  {
    name: 'ol',
    category: 'Структура',
    description: 'Нумерованный список',
    example: '<ol><li>Элемент</li></ol>',
    attributes: ['class', 'id', 'start']
  },
  {
    name: 'li',
    category: 'Структура',
    description: 'Элемент списка',
    example: '<li>Элемент списка</li>',
    attributes: ['class', 'id']
  },
  {
    name: 'table',
    category: 'Структура',
    description: 'Таблица',
    example: '<table><tr><td>Ячейка</td></tr></table>',
    attributes: ['class', 'id']
  },
  {
    name: 'tr',
    category: 'Структура',
    description: 'Строка таблицы',
    example: '<tr><td>Ячейка</td></tr>',
    attributes: ['class', 'id']
  },
  {
    name: 'td',
    category: 'Структура',
    description: 'Ячейка таблицы',
    example: '<td>Содержимое</td>',
    attributes: ['colspan', 'rowspan']
  },
  {
    name: 'strong',
    category: 'Текст',
    description: 'Важный текст (жирный)',
    example: '<strong>Важно</strong>',
    attributes: ['class', 'id']
  },
  {
    name: 'em',
    category: 'Текст',
    description: 'Акцентированный текст (курсив)',
    example: '<em>Акцент</em>',
    attributes: ['class', 'id']
  },
  {
    name: 'br',
    category: 'Текст',
    description: 'Перенос строки',
    example: 'Текст<br>Новая строка',
    attributes: []
  },
  {
    name: 'hr',
    category: 'Структура',
    description: 'Горизонтальная линия',
    example: '<hr />',
    attributes: ['class', 'id']
  }
];

const categories = ['Все теги', 'Структура', 'Текст', 'Формы', 'Медиа', 'Семантика'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все теги');

  const filteredTags = useMemo(() => {
    let filtered = htmlTags;

    if (selectedCategory !== 'Все теги') {
      filtered = filtered.filter(tag => tag.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tag =>
          tag.name.toLowerCase().includes(query) ||
          tag.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const tagsByCategory = useMemo(() => {
    const grouped: Record<string, HTMLTag[]> = {};
    categories.slice(1).forEach(cat => {
      grouped[cat] = htmlTags.filter(tag => tag.category === cat);
    });
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Code2" className="text-primary-foreground" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-foreground">HTML Справочник</h1>
          </div>

          <div className="relative max-w-2xl">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию тега..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="w-full justify-start gap-2 h-auto flex-wrap bg-transparent border-b border-border rounded-none pb-2">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Все теги" className="mt-8">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Найдено тегов: <span className="font-semibold text-foreground">{filteredTags.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map(tag => (
                <Card
                  key={tag.name}
                  className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border-border"
                >
                  <div className="flex items-start justify-between mb-3">
                    <code className="text-2xl font-bold text-primary bg-secondary px-3 py-1 rounded">
                      &lt;{tag.name}&gt;
                    </code>
                    <Badge variant="secondary" className="text-xs">
                      {tag.category}
                    </Badge>
                  </div>

                  <p className="text-foreground mb-4 text-sm leading-relaxed">
                    {tag.description}
                  </p>

                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-xs text-muted-foreground font-mono break-all">
                      {tag.example}
                    </code>
                  </div>

                  {tag.attributes && tag.attributes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tag.attributes.map(attr => (
                        <Badge key={attr} variant="outline" className="text-xs">
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredTags.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-xl font-semibold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            )}
          </TabsContent>

          {categories.slice(1).map(category => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{category}</h2>
                <p className="text-muted-foreground">
                  Теги в категории: <span className="font-semibold text-foreground">{filteredTags.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTags.map(tag => (
                  <Card
                    key={tag.name}
                    className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <code className="text-2xl font-bold text-primary bg-secondary px-3 py-1 rounded">
                        &lt;{tag.name}&gt;
                      </code>
                    </div>

                    <p className="text-foreground mb-4 text-sm leading-relaxed">
                      {tag.description}
                    </p>

                    <div className="bg-muted p-3 rounded-md">
                      <code className="text-xs text-muted-foreground font-mono break-all">
                        {tag.example}
                      </code>
                    </div>

                    {tag.attributes && tag.attributes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {tag.attributes.map(attr => (
                          <Badge key={attr} variant="outline" className="text-xs">
                            {attr}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
