import { useState } from "react";
import { Trophy, Target, Percent, Hash, Zap, BarChart3, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import StatsCard from "@/components/StatsCard";
import DifficultyChart from "@/components/DifficultyChart";
import SubmissionChart from "@/components/SubmissionChart";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import ProgressRing from "@/components/ProgressRing";
import ErrorState from "@/components/ErrorState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/leetcode-api";

const Index = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("");

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setStats(null);
    try {
      const data = await fetchLeetCodeStats(username);
      setStats(data);
      setCurrentUser(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3 py-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            LeetCode Tracker <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Search any LeetCode username to visualize their coding progress, stats, and activity.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && <ErrorState message={error} />}

        {isLoading && <LoadingSkeleton />}

        {stats && !isLoading && (
          <div className="space-y-6">
            {/* Username badge */}
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                @{currentUser}
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Solved"
                value={stats.totalSolved}
                subtitle={`out of ${stats.totalQuestions}`}
                icon={CheckCircle2}
                glowClass="glow-primary"
                delay={0}
              />
              <StatsCard
                title="Acceptance Rate"
                value={`${stats.acceptanceRate}%`}
                subtitle="submission success"
                icon={Percent}
                delay={50}
              />
              <StatsCard
                title="Ranking"
                value={stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : "N/A"}
                subtitle="global rank"
                icon={Trophy}
                delay={100}
              />
              <StatsCard
                title="Problems"
                value={`${stats.easySolved + stats.mediumSolved + stats.hardSolved}`}
                subtitle={`E:${stats.easySolved} M:${stats.mediumSolved} H:${stats.hardSolved}`}
                icon={Target}
                delay={150}
              />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <DifficultyChart stats={stats} />
              <SubmissionChart stats={stats} />
              <ProgressRing stats={stats} />
            </div>

            {/* Heatmap */}
            <ActivityHeatmap calendar={stats.submissionCalendar} />
          </div>
        )}

        {/* Empty state */}
        {!stats && !isLoading && !error && (
          <div className="text-center py-16 space-y-4">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Enter a username to get started</p>
              <p className="text-xs text-muted-foreground/60">
                Try <button onClick={() => handleSearch("neal_wu")} className="text-primary hover:underline font-mono">neal_wu</button> or{" "}
                <button onClick={() => handleSearch("lee215")} className="text-primary hover:underline font-mono">lee215</button>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
