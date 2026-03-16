import { useState } from "react";
import { Search, Loader2, Trophy, Target, Percent, CheckCircle2, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/ErrorState";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/leetcode-api";

interface CompareResult {
  user1: { username: string; stats: LeetCodeStats };
  user2: { username: string; stats: LeetCodeStats };
}

const Compare = () => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    const u1 = username1.trim();
    const u2 = username2.trim();
    if (!u1 || !u2) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const [stats1, stats2] = await Promise.all([
        fetchLeetCodeStats(u1),
        fetchLeetCodeStats(u2),
      ]);
      setResult({
        user1: { username: u1, stats: stats1 },
        user2: { username: u2, stats: stats2 },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data for one or both users.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-3 py-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Compare <span className="text-primary">Users</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Enter two LeetCode usernames to compare their stats side by side.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleCompare} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={username1}
              onChange={(e) => setUsername1(e.target.value)}
              placeholder="First username..."
              className="pl-9 bg-secondary border-border font-mono text-sm h-11"
              disabled={isLoading}
            />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block shrink-0" />
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={username2}
              onChange={(e) => setUsername2(e.target.value)}
              placeholder="Second username..."
              className="pl-9 bg-secondary border-border font-mono text-sm h-11"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !username1.trim() || !username2.trim()}
            className="h-11 px-6 w-full sm:w-auto"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Compare"}
          </Button>
        </form>

        {error && <ErrorState message={error} />}

        {isLoading && <CompareLoadingSkeleton />}

        {result && !isLoading && (
          <div className="space-y-6">
            {/* Username badges */}
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                @{result.user1.username}
              </span>
              <span className="text-xs text-muted-foreground">vs</span>
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                @{result.user2.username}
              </span>
            </div>

            {/* Side-by-side stats */}
            <CompareStatsGrid
              user1={result.user1}
              user2={result.user2}
            />

            {/* Comparison chart */}
            <ComparisonBarChart
              user1={result.user1}
              user2={result.user2}
            />
          </div>
        )}

        {/* Empty state */}
        {!result && !isLoading && !error && (
          <div className="text-center py-16 space-y-4">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center">
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Enter two usernames to compare their stats</p>
          </div>
        )}
      </main>
    </div>
  );
};

/* ---- Sub-components ---- */

interface StatRow {
  label: string;
  val1: string | number;
  val2: string | number;
}

function CompareStatsGrid({
  user1,
  user2,
}: {
  user1: { username: string; stats: LeetCodeStats };
  user2: { username: string; stats: LeetCodeStats };
}) {
  const rows: StatRow[] = [
    { label: "Total Solved", val1: user1.stats.totalSolved, val2: user2.stats.totalSolved },
    { label: "Easy", val1: user1.stats.easySolved, val2: user2.stats.easySolved },
    { label: "Medium", val1: user1.stats.mediumSolved, val2: user2.stats.mediumSolved },
    { label: "Hard", val1: user1.stats.hardSolved, val2: user2.stats.hardSolved },
    { label: "Acceptance", val1: `${user1.stats.acceptanceRate}%`, val2: `${user2.stats.acceptanceRate}%` },
    {
      label: "Ranking",
      val1: user1.stats.ranking > 0 ? `#${user1.stats.ranking.toLocaleString()}` : "N/A",
      val2: user2.stats.ranking > 0 ? `#${user2.stats.ranking.toLocaleString()}` : "N/A",
    },
  ];

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Stats Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 text-center text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border px-4 py-3">
          <span className="text-primary">@{user1.username}</span>
          <span>Metric</span>
          <span className="text-primary">@{user2.username}</span>
        </div>
        {rows.map((row, i) => {
          const n1 = typeof row.val1 === "number" ? row.val1 : parseFloat(String(row.val1));
          const n2 = typeof row.val2 === "number" ? row.val2 : parseFloat(String(row.val2));
          const isRanking = row.label === "Ranking";
          // For ranking, lower is better
          const highlight1 = !isNaN(n1) && !isNaN(n2) && (isRanking ? n1 < n2 : n1 > n2);
          const highlight2 = !isNaN(n1) && !isNaN(n2) && (isRanking ? n2 < n1 : n2 > n1);

          return (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-center items-center px-4 py-3 ${
                i % 2 === 0 ? "bg-secondary/30" : ""
              }`}
            >
              <span className={`font-mono text-sm ${highlight1 ? "text-primary font-bold" : "text-foreground"}`}>
                {row.val1}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{row.label}</span>
              <span className={`font-mono text-sm ${highlight2 ? "text-primary font-bold" : "text-foreground"}`}>
                {row.val2}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ComparisonBarChart({
  user1,
  user2,
}: {
  user1: { username: string; stats: LeetCodeStats };
  user2: { username: string; stats: LeetCodeStats };
}) {
  const data = [
    { name: "Easy", [user1.username]: user1.stats.easySolved, [user2.username]: user2.stats.easySolved },
    { name: "Medium", [user1.username]: user1.stats.mediumSolved, [user2.username]: user2.stats.mediumSolved },
    { name: "Hard", [user1.username]: user1.stats.hardSolved, [user2.username]: user2.stats.hardSolved },
    { name: "Total", [user1.username]: user1.stats.totalSolved, [user2.username]: user2.stats.totalSolved },
  ];

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Difficulty Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 10%)",
                  border: "1px solid hsl(220, 14%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                itemStyle={{ color: "hsl(210, 20%, 90%)" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }}
              />
              <Bar dataKey={user1.username} fill="hsl(152, 60%, 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey={user2.username} fill="hsl(38, 92%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function CompareLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="rounded-lg border border-border/50 bg-card p-6 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4">
            <Skeleton className="h-6 bg-secondary" />
            <Skeleton className="h-6 bg-secondary" />
            <Skeleton className="h-6 bg-secondary" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/50 bg-card p-6">
        <Skeleton className="h-64 w-full bg-secondary" />
      </div>
    </div>
  );
}

export default Compare;
