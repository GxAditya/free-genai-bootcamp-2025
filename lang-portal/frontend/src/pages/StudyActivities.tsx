import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudyActivities = () => {
  // Mock data for study activities
  const activities = [
    {
      id: 1,
      title: "Adventure MUD",
      thumbnail: "/placeholder.svg",
      description: "An interactive text adventure to practice Hindi vocabulary and comprehension."
    },
    {
      id: 2,
      title: "Typing Tutor",
      thumbnail: "/placeholder.svg",
      description: "Practice typing in Hindi and improve your keyboard skills."
    },
    {
      id: 3,
      title: "Flashcard Challenge",
      thumbnail: "/placeholder.svg",
      description: "Traditional flashcard review with spaced repetition."
    },
    {
      id: 4,
      title: "Sentence Builder",
      thumbnail: "/placeholder.svg",
      description: "Construct Hindi sentences from word components."
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Study Activities</h1>
      <p className="text-muted-foreground">
        Choose an activity to practice your Hindi language skills. Each activity focuses on different aspects of language learning.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-secondary flex items-center justify-center">
              <img 
                src={activity.thumbnail} 
                alt={activity.title} 
                className="h-24 w-24 object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => window.open(`http://localhost:8081?group_id=${activity.id}`, '_blank')}
              >
                Launch
              </Button>
              <Link to={`/study-activities/${activity.id}`}>
                <Button variant="ghost">View</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyActivities;
