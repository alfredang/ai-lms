import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star, Target, Trophy, Zap } from "lucide-react";

export default function GamificationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-4">
          Engagement
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Gamification System</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LearnHub uses gamification to increase learner engagement through XP points,
          levels, badges, and learning streaks.
        </p>
      </div>

      {/* XP System */}
      <section id="xp">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          XP Points System
        </h2>
        <p className="mt-2 text-muted-foreground">
          Experience points (XP) are earned by completing learning activities.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">XP Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { action: "Complete a lesson", xp: 50 },
                { action: "Submit an assignment", xp: 25 },
                { action: "Pass assignment (>70%)", xp: 100 },
                { action: "Perfect score (100%)", xp: 200 },
                { action: "Daily login", xp: 10 },
                { action: "7-day streak bonus", xp: 100 },
                { action: "30-day streak bonus", xp: 500 },
                { action: "First discussion post", xp: 15 },
                { action: "Help another learner", xp: 20 },
                { action: "Complete a course", xp: 500 },
              ].map((item) => (
                <tr key={item.action}>
                  <td className="px-4 py-3 text-sm">{item.action}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="secondary">+{item.xp} XP</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">XP Award Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`// src/services/gamification.service.ts
await gamificationService.awardXP(userId, {
  amount: 50,
  reason: 'Completed lesson: Introduction to Next.js',
  metadata: { lessonId, courseId },
});`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Levels */}
      <section id="levels">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-500" />
          Level Progression
        </h2>
        <p className="mt-2 text-muted-foreground">
          As learners accumulate XP, they advance through levels with unique titles.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { level: 1, xp: 0, title: "Novice", color: "bg-gray-100 dark:bg-gray-800" },
            { level: 2, xp: 500, title: "Beginner", color: "bg-green-100 dark:bg-green-900/30" },
            { level: 3, xp: 1500, title: "Apprentice", color: "bg-blue-100 dark:bg-blue-900/30" },
            { level: 4, xp: 3500, title: "Intermediate", color: "bg-yellow-100 dark:bg-yellow-900/30" },
            { level: 5, xp: 7000, title: "Advanced", color: "bg-orange-100 dark:bg-orange-900/30" },
            { level: 6, xp: 12000, title: "Expert", color: "bg-red-100 dark:bg-red-900/30" },
            { level: 7, xp: 20000, title: "Master", color: "bg-purple-100 dark:bg-purple-900/30" },
            { level: 8, xp: 35000, title: "Grandmaster", color: "bg-pink-100 dark:bg-pink-900/30" },
            { level: 9, xp: 60000, title: "Legend", color: "bg-indigo-100 dark:bg-indigo-900/30" },
            { level: 10, xp: 100000, title: "Sage", color: "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30" },
          ].map((level) => (
            <div
              key={level.level}
              className={`flex items-center justify-between rounded-lg border p-4 ${level.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background font-bold">
                  {level.level}
                </div>
                <div>
                  <p className="font-semibold">{level.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {level.xp.toLocaleString()} XP required
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section id="badges">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Badges & Achievements
        </h2>
        <p className="mt-2 text-muted-foreground">
          Badges are awarded for specific accomplishments across different categories.
        </p>

        <div className="mt-6 space-y-6">
          {/* Badge Rarities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badge Rarities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-500">Common</Badge>
                <Badge className="bg-green-500">Uncommon</Badge>
                <Badge className="bg-blue-500">Rare</Badge>
                <Badge className="bg-purple-500">Epic</Badge>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">Legendary</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Badge Categories */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Completion Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>First Steps - Complete your first lesson</li>
                  <li>Quick Learner - Complete 10 lessons</li>
                  <li>Course Conqueror - Complete a full course</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Excellence Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>Perfectionist - Get 100% on an assignment</li>
                  <li>Overachiever - Score above 90% consistently</li>
                  <li>Top Student - Highest score in a class</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Dedication Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>Consistent - 7-day learning streak</li>
                  <li>Dedicated - 30-day learning streak</li>
                  <li>Unstoppable - 100-day learning streak</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Special Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>XP Hunter - Earn 1,000 total XP</li>
                  <li>Rising Star - Reach level 5</li>
                  <li>Elite - Reach level 10</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Streaks */}
      <section id="streaks">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-500" />
          Learning Streaks
        </h2>
        <p className="mt-2 text-muted-foreground">
          Streaks encourage daily learning habits and provide bonus XP rewards.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How Streaks Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Building a Streak</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Complete at least one learning activity each day to maintain your streak.
                Activities include completing lessons, submitting assignments, or logging in.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Streak Bonuses</h4>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>7-day streak: +100 XP bonus</li>
                <li>30-day streak: +500 XP bonus</li>
                <li>100-day streak: +2,000 XP bonus</li>
                <li>365-day streak: +10,000 XP bonus + Legendary badge</li>
              </ul>
            </div>

            <div className="rounded-lg border border-orange-500/50 bg-orange-500/10 p-4">
              <h4 className="font-semibold text-orange-500">Streak Freeze</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Learners can use streak freezes to protect their streak during busy days.
                Freeze tokens are earned through achievements or can be purchased.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
