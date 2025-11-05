import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { htmlTags, categories } from '@/data/htmlTags';

export default function Index() {
  const navigate = useNavigate();
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
                  onClick={() => navigate(`/tag/${tag.name}`)}
                  className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-border hover:border-primary"
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

                  <div className="bg-muted p-3 rounded-md mb-3">
                    <code className="text-xs text-muted-foreground font-mono break-all">
                      {tag.example}
                    </code>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span>Подробнее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
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
                    onClick={() => navigate(`/tag/${tag.name}`)}
                    className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-border hover:border-primary"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <code className="text-2xl font-bold text-primary bg-secondary px-3 py-1 rounded">
                        &lt;{tag.name}&gt;
                      </code>
                    </div>

                    <p className="text-foreground mb-4 text-sm leading-relaxed">
                      {tag.description}
                    </p>

                    <div className="bg-muted p-3 rounded-md mb-3">
                      <code className="text-xs text-muted-foreground font-mono break-all">
                        {tag.example}
                      </code>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-primary">
                      <span>Подробнее</span>
                      <Icon name="ArrowRight" size={14} />
                    </div>
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