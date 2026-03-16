import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  calendar: Record<string, number>;
}

const ActivityHeatmap = ({ calendar }: Props) => {
  const { weeks, months } = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: { date: Date; count: number }[][] = [];
    let currentWeek: { date: Date; count: number }[] = [];
    const months: { label: string; col: number }[] = [];
    let lastMonth = -1;

    const cursor = new Date(startDate);
    let col = 0;

    while (cursor <= today) {
      const ts = Math.floor(cursor.getTime() / 1000).toString();
      const count = calendar[ts] || 0;
      currentWeek.push({ date: new Date(cursor), count });

      const month = cursor.getMonth();
      if (month !== lastMonth) {
        months.push({
          label: cursor.toLocaleString("en", { month: "short" }),
          col,
        });
        lastMonth = month;
      }

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        col++;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    if (currentWeek.length) weeks.push(currentWeek);

    return { weeks, months };
  }, [calendar]);

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-secondary";
    if (count <= 2) return "bg-primary/25";
    if (count <= 5) return "bg-primary/50";
    if (count <= 10) return "bg-primary/75";
    return "bg-primary";
  };

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Activity (Past Year)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-[700px]">
            {/* Month labels */}
            <div className="flex mb-1 ml-8">
              {months.map((m, i) => (
                <span
                  key={i}
                  className="text-[10px] text-muted-foreground font-mono"
                  style={{ position: "relative", left: `${m.col * 14}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div className="flex gap-[2px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[2px] mr-1 justify-center">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <span key={i} className="text-[10px] text-muted-foreground font-mono h-[12px] leading-[12px]">
                    {d}
                  </span>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.map((day, di) => (
                    <Tooltip key={di}>
                      <TooltipTrigger asChild>
                        <div
                          className={`h-[12px] w-[12px] rounded-[2px] ${getIntensity(day.count)} transition-colors`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs font-mono">
                        {day.count} submission{day.count !== 1 ? "s" : ""} on{" "}
                        {day.date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-1 mt-3 justify-end">
              <span className="text-[10px] text-muted-foreground font-mono mr-1">Less</span>
              {[0, 1, 3, 6, 11].map((count) => (
                <div key={count} className={`h-[12px] w-[12px] rounded-[2px] ${getIntensity(count)}`} />
              ))}
              <span className="text-[10px] text-muted-foreground font-mono ml-1">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
