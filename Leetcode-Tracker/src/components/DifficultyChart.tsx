import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeetCodeStats } from "@/lib/leetcode-api";

interface Props {
  stats: LeetCodeStats;
}

const COLORS = [
  "hsl(172, 66%, 50%)",  // easy
  "hsl(38, 92%, 55%)",   // medium
  "hsl(0, 72%, 55%)",    // hard
];

const DifficultyChart = ({ stats }: Props) => {
  const data = [
    { name: "Easy", value: stats.easySolved, total: stats.totalEasy },
    { name: "Medium", value: stats.mediumSolved, total: stats.totalMedium },
    { name: "Hard", value: stats.hardSolved, total: stats.totalHard },
  ];

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Difficulty Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
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
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 flex-1">
            {data.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono text-sm text-foreground">
                  {item.value}<span className="text-muted-foreground">/{item.total}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultyChart;
