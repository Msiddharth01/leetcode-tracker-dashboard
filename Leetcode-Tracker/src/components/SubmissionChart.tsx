import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeetCodeStats } from "@/lib/leetcode-api";

interface Props {
  stats: LeetCodeStats;
}

const SubmissionChart = ({ stats }: Props) => {
  const data = [
    { name: "Easy", solved: stats.easySolved, remaining: stats.totalEasy - stats.easySolved },
    { name: "Medium", solved: stats.mediumSolved, remaining: stats.totalMedium - stats.mediumSolved },
    { name: "Hard", solved: stats.hardSolved, remaining: stats.totalHard - stats.hardSolved },
  ];

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Submission Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
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
              <Bar dataKey="solved" fill="hsl(152, 60%, 48%)" radius={[4, 4, 0, 0]} name="Solved" />
              <Bar dataKey="remaining" fill="hsl(220, 14%, 22%)" radius={[4, 4, 0, 0]} name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionChart;
