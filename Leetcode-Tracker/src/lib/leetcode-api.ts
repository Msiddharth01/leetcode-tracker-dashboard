export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  totalSubmissions: number;
  submissionCalendar: Record<string, number>;
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const response = await fetch(`https://leet-scrape.vercel.app/${encodeURIComponent(username)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data. Please check the username.");
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "User not found. Please check the username.");
  }

  return {
    totalSolved: data.totalSolved ?? 0,
    totalQuestions: data.totalQuestions ?? 0,
    easySolved: data.easySolved ?? 0,
    totalEasy: data.totalEasy ?? 0,
    mediumSolved: data.mediumSolved ?? 0,
    totalMedium: data.totalMedium ?? 0,
    hardSolved: data.hardSolved ?? 0,
    totalHard: data.totalHard ?? 0,
    acceptanceRate: data.acceptanceRate ? parseFloat(data.acceptanceRate.toFixed(1)) : 0,
    ranking: data.ranking ?? 0,
    totalSubmissions: (data.totalSolved ?? 0) + Math.round((data.totalSolved ?? 0) / ((data.acceptanceRate ?? 50) / 100)) - (data.totalSolved ?? 0),
    submissionCalendar: typeof data.submissionCalendar === 'string' ? JSON.parse(data.submissionCalendar) : (data.submissionCalendar ?? {}),
  };
}
