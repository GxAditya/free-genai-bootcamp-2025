import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

const Sessions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("startTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Mock sessions data
  const sessions = [
    {
      id: 1,
      activityId: 1,
      activityName: "Adventure MUD",
      groupId: 2,
      groupName: "Core Verbs",
      startTime: "2023-10-15 02:30 PM",
      endTime: "2023-10-15 03:15 PM",
      reviewItems: 42
    },
    {
      id: 2,
      activityId: 2,
      activityName: "Typing Tutor",
      groupId: 5,
      groupName: "Common Nouns",
      startTime: "2023-10-12 10:15 AM",
      endTime: "2023-10-12 10:45 AM",
      reviewItems: 28
    },
    {
      id: 3,
      activityId: 3,
      activityName: "Flashcard Challenge",
      groupId: 1,
      groupName: "Common Greetings",
      startTime: "2023-10-10 04:20 PM",
      endTime: "2023-10-10 04:40 PM",
      reviewItems: 35
    },
    {
      id: 4,
      activityId: 1,
      activityName: "Adventure MUD",
      groupId: 3,
      groupName: "Beginner Words",
      startTime: "2023-10-08 11:30 AM",
      endTime: "2023-10-08 12:15 PM",
      reviewItems: 55
    },
    {
      id: 5,
      activityId: 4,
      activityName: "Sentence Builder",
      groupId: 2,
      groupName: "Core Verbs",
      startTime: "2023-10-05 03:10 PM",
      endTime: "2023-10-05 03:45 PM",
      reviewItems: 18
    },
    {
      id: 6,
      activityId: 2,
      activityName: "Typing Tutor",
      groupId: 4,
      groupName: "Family Members",
      startTime: "2023-10-02 09:45 AM",
      endTime: "2023-10-02 10:10 AM",
      reviewItems: 23
    },
    {
      id: 7,
      activityId: 3,
      activityName: "Flashcard Challenge",
      groupId: 5,
      groupName: "Common Nouns",
      startTime: "2023-09-28 05:30 PM",
      endTime: "2023-09-28 06:00 PM",
      reviewItems: 40
    },
    {
      id: 8,
      activityId: 1,
      activityName: "Adventure MUD",
      groupId: 1,
      groupName: "Common Greetings",
      startTime: "2023-09-25 01:15 PM",
      endTime: "2023-09-25 02:00 PM",
      reviewItems: 32
    },
    {
      id: 9,
      activityId: 4,
      activityName: "Sentence Builder",
      groupId: 3,
      groupName: "Beginner Words",
      startTime: "2023-09-22 10:20 AM",
      endTime: "2023-09-22 10:50 AM",
      reviewItems: 25
    },
    {
      id: 10,
      activityId: 2,
      activityName: "Typing Tutor",
      groupId: 2,
      groupName: "Core Verbs",
      startTime: "2023-09-18 04:00 PM",
      endTime: "2023-09-18 04:30 PM",
      reviewItems: 30
    }
  ];
  
  const totalPages = 2; // Mock total pages
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Study Sessions</h1>
      <p className="text-muted-foreground">
        View your study history across all activities and word groups.
      </p>
      
      <div className="bg-card overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("activityName")}
                >
                  <div className="flex items-center gap-1">
                    Activity {renderSortIndicator("activityName")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("groupName")}
                >
                  <div className="flex items-center gap-1">
                    Word Group {renderSortIndicator("groupName")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("startTime")}
                >
                  <div className="flex items-center gap-1">
                    Start Time {renderSortIndicator("startTime")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("endTime")}
                >
                  <div className="flex items-center gap-1">
                    End Time {renderSortIndicator("endTime")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("reviewItems")}
                >
                  <div className="flex items-center gap-1">
                    # Review Items {renderSortIndicator("reviewItems")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/study-activities/${session.activityId}`} className="text-primary hover:underline">
                      {session.activityName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/word-groups/${session.groupId}`} className="text-primary hover:underline">
                      {session.groupName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">{session.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">{session.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">{session.reviewItems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-sm text-foreground">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
