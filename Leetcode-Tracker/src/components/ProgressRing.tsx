import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeetCodeStats } from "@/lib/leetcode-api";

interface Props {
  stats: LeetCodeStats;
}

const ProgressRing = ({ stats }: Props) => {
  const percentage = stats.totalQuestions > 0
    ? Math.round((stats.totalSolved / stats.totalQuestions) * 100)
    : 0;

  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Overall Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70" cy="70" r="60"
              fill="none"
              stroke="hsl(220, 14%, 18%)"
              strokeWidth="10"
            />
            <circle
              cx="70" cy="70" r="60"
              fill="none"
              stroke="hsl(152, 60%, 48%)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-mono text-foreground">{percentage}%</span>
            <span className="text-xs text-muted-foreground">completed</span>
          </div>
        </div>
        <p className="text-sm font-mono text-muted-foreground mt-3">
          {stats.totalSolved}<span className="text-foreground/30"> / </span>{stats.totalQuestions}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressRing;
