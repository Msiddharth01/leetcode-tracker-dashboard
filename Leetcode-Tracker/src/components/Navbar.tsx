import { Code2, Terminal } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <span className="font-mono text-sm font-semibold text-foreground">
              LeetCode Tracker
            </span>
          </div>
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className="text-xs font-mono px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="bg-secondary text-foreground"
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/compare"
              className="text-xs font-mono px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="bg-secondary text-foreground"
            >
              Compare
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-mono hidden sm:inline">v1.1.0</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
