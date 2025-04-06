import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { dashboardApi } from "@/services";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Fetch dashboard statistics
  const { data: stats, loading, error } = useApi(
    dashboardApi.getStats,
    [],
    { immediate: true }
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Error loading dashboard data. Please try again later.
              {error.message && <span className="block mt-2 text-sm text-red-500 dark:text-red-400">{error.message}</span>}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Words Learned</CardTitle>
              <CardDescription>Total words mastered</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats?.wordsLearned || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Sessions</CardTitle>
              <CardDescription>Total completed sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats?.totalSessions || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Time</CardTitle>
              <CardDescription>Total hours spent learning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats?.studyHours || 0}</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Last Session</h2>
        <Card>
          {stats?.lastSession ? (
            <>
              <CardHeader>
                <CardTitle>{stats.lastSession.activityName}</CardTitle>
                <CardDescription>
                  {stats.lastSession.groupName} • {new Date(stats.lastSession.startTime).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Items reviewed: {stats.lastSession.reviewItems} • 
                  Duration: {calculateDuration(stats.lastSession.startTime, stats.lastSession.endTime)}
                </p>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>No recent sessions</CardTitle>
                <CardDescription>Your study session history will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start a study activity to begin tracking your progress!
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/study-activities">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>Study Activities</CardTitle>
                <CardDescription>Launch a learning activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from various interactive activities to practice your Hindi skills.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/word-groups">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>Word Groups</CardTitle>
                <CardDescription>Explore vocabulary collections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse through categorized Hindi word collections to expand your vocabulary.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Helper function to calculate duration between two timestamps
function calculateDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();
  
  const minutes = Math.floor(durationMs / (1000 * 60));
  
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export default Dashboard;
