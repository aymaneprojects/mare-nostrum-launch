import { Link, useLocation } from "react-router-dom";
import { lienActif } from "@/lib/nav";
import { Home, GraduationCap, Users, BookOpen, Mail } from "lucide-react";

const tabs = [
  { to: "/",          label: "Accueil",   Icon: Home           },
  { to: "/education", label: "Éducation", Icon: GraduationCap  },
  { to: "/club",      label: "Club",      Icon: Users          },
  { to: "/blog",      label: "Blog",      Icon: BookOpen       },
  { to: "/contact",   label: "Contact",   Icon: Mail           },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  const isActive = (to: string) => lienActif(pathname, to, true);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden
          bg-background/95 backdrop-blur-xl border-t border-border
          flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Navigation mobile"
      >
        {tabs.map(({ to, label, Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] min-w-11
                transition-colors duration-200 active:scale-95 motion-reduce:active:scale-100
                ${active ? "text-primary" : "text-muted-foreground"}`}
              aria-current={active ? "page" : undefined}
            >
              <div className={`relative flex items-center justify-center w-10 h-6 rounded-lg transition-colors duration-200
                ${active ? "bg-primary/10" : ""}`}>
                <Icon className={`h-5 w-5 ${active ? "stroke-[2.2]" : "stroke-[1.6]"}`} />
              </div>
              <span className={`text-[13px] font-medium ${active ? "font-semibold" : ""}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BottomNav;
