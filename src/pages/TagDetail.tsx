import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { htmlTags } from '@/data/htmlTags';

export default function TagDetail() {
  const { tagName } = useParams<{ tagName: string }>();
  const navigate = useNavigate();
  
  const tag = htmlTags.find(t => t.name === tagName);

  if (!tag) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" className="mx-auto mb-4 text-muted-foreground" size={64} />
          <h1 className="text-3xl font-bold mb-2">Тег не найден</h1>
          <p className="text-muted-foreground mb-6">Тег "{tagName}" не существует в справочнике</p>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к справочнику
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад к справочнику
          </Button>
          
          <div className="flex items-center gap-4 flex-wrap">
            <code className="text-4xl font-bold text-primary bg-secondary px-4 py-2 rounded-lg">
              &lt;{tag.name}&gt;
            </code>
            <Badge variant="secondary" className="text-sm">
              {tag.category}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Описание</h2>
            <p className="text-foreground leading-relaxed text-lg">
              {tag.fullDescription}
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Основной пример</h2>
            <Card className="p-6 bg-muted">
              <pre className="text-sm font-mono overflow-x-auto">
                <code>{tag.example}</code>
              </pre>
            </Card>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Примеры использования
            </h2>
            <div className="space-y-4">
              {tag.examples.map((example, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {example.title}
                  </h3>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Атрибуты</h2>
            {tag.attributes.length > 0 ? (
              <div className="space-y-3">
                {tag.attributes.map((attr, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="font-mono mt-1">
                        {attr.name}
                      </Badge>
                      <p className="text-foreground flex-1">
                        {attr.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Нет специальных атрибутов</p>
            )}
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Поддержка браузерами
            </h2>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Icon name="Globe" className="text-primary" size={24} />
                <p className="text-foreground text-lg">{tag.browserSupport}</p>
              </div>
            </Card>
          </section>

          {tag.notes && tag.notes.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Важные замечания
                </h2>
                <Card className="p-6">
                  <ul className="space-y-2">
                    {tag.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span className="text-foreground">{note}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            </>
          )}

          <div className="pt-8">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к справочнику
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
