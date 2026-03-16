import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter LeetCode username..."
          className="pl-9 bg-secondary border-border font-mono text-sm h-11"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading || !username.trim()} className="h-11 px-6">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
      </Button>
    </form>
  );
};

export default SearchBar;
