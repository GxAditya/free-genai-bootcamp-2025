import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

const WordGroups = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Mock word groups data
  const wordGroups = [
    { id: 1, name: "Common Greetings", wordCount: 10 },
    { id: 2, name: "Core Verbs", wordCount: 25 },
    { id: 3, name: "Beginner Words", wordCount: 50 },
    { id: 4, name: "Family Members", wordCount: 15 },
    { id: 5, name: "Common Nouns", wordCount: 30 },
    { id: 6, name: "Travel Phrases", wordCount: 20 },
    { id: 7, name: "Food and Dining", wordCount: 35 },
    { id: 8, name: "Numbers and Counting", wordCount: 30 },
    { id: 9, name: "Time and Calendar", wordCount: 25 },
    { id: 10, name: "Adjectives", wordCount: 40 },
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
      <h1 className="text-3xl font-bold text-foreground">Word Groups</h1>
      <p className="text-muted-foreground">
        Word groups organize vocabulary by themes and categories. 
        Click on a group to view all words within it.
      </p>
      
      <div className="bg-card overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Group Name {renderSortIndicator("name")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("wordCount")}
                >
                  <div className="flex items-center gap-1">
                    # Words {renderSortIndicator("wordCount")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {wordGroups.map((group) => (
                <tr key={group.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/word-groups/${group.id}`} className="text-primary hover:underline">
                      {group.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">{group.wordCount}</td>
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

export default WordGroups;
