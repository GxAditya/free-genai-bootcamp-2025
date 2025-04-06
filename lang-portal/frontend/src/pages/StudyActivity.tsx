
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudyActivity = () => {
  const { id } = useParams();
  
  // Mock activity data (in a real app, fetch this based on id)
  const activity = {
    id: Number(id),
    title: id === "1" ? "Adventure MUD" : id === "2" ? "Typing Tutor" : "Study Activity",
    thumbnail: "/placeholder.svg",
    description: "This interactive learning activity helps you practice Hindi vocabulary, grammar, and comprehension in an engaging format. It adapts to your skill level and tracks your progress over time."
  };
  
  // Mock session data
  const sessions = [
    {
      id: 1,
      groupId: 2,
      groupName: "Core Verbs",
      startTime: "2023-10-15 02:30 PM",
      endTime: "2023-10-15 03:15 PM",
      reviewItems: 42
    },
    {
      id: 2,
      groupId: 5,
      groupName: "Common Nouns",
      startTime: "2023-10-12 10:15 AM",
      endTime: "2023-10-12 10:45 AM",
      reviewItems: 28
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-6">
        <div className="bg-gray-100 h-48 w-48 flex items-center justify-center rounded-lg">
          <img src={activity.thumbnail} alt={activity.title} className="h-24 w-24" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{activity.title}</h1>
          <p className="text-gray-600 mb-6">{activity.description}</p>
          
          <Button 
            size="lg"
            onClick={() => window.open(`http://localhost:8081?group_id=${activity.id}`, '_blank')}
          >
            Launch Activity
          </Button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Sessions</h2>
        
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map(session => (
              <Card key={session.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <Link 
                      to={`/word-groups/${session.groupId}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {session.groupName}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Start Time</p>
                      <p>{session.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">End Time</p>
                      <p>{session.endTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Review Items</p>
                      <p>{session.reviewItems}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-gray-500">
                No sessions recorded for this activity yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudyActivity;
