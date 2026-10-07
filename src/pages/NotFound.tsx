import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <SEOHead 
        title="Page non trouvée - Mare Nostrum"
        description="La page que vous recherchez n'existe pas"
        noindex={true}
      />
      <div className="mn-card w-full max-w-md px-8 py-12 text-center shadow-lift">
        <h1 className="mb-4 font-editorial text-7xl font-semibold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="mn-btn mn-btn-lift inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
