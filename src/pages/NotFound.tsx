import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Meta } from '@/components/seo/Meta';

const NotFound = () => {
  return (
    <>
      <Meta
        title="Página no encontrada"
        description="La página que buscas no existe o ha sido movida."
      />
      
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-serif font-bold text-primary mb-4">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Página no encontrada
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Ir al inicio
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  Contactar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
