import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Repli. `null` = le composant disparaît sans bruit (widgets globaux). Absent = repli de page. */
  fallback?: ReactNode;
}

/** Évite la page blanche : une erreur de rendu reste confinée à ce sous-arbre. */
export default class ErrorBoundary extends Component<Props, { erreur: boolean }> {
  state = { erreur: false };

  static getDerivedStateFromError() {
    return { erreur: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (!this.state.erreur) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <a
          href="/"
          className="mn-btn inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Accueil
        </a>
      </div>
    );
  }
}
