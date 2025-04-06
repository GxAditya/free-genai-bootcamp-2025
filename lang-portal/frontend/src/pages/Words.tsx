import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Volume, ArrowUp, ArrowDown } from "lucide-react";
import { wordsApi } from "@/services";
import useApi from "@/hooks/useApi";
import { Word } from "@/services/wordsApi";

const Words = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("hindi");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Fetch words using API
  const { data, loading, error, execute } = useApi(
    wordsApi.getWords,
    [currentPage, 10],
    { immediate: true }
  );
  
  // Refetch when page or sort changes
  useEffect(() => {
    execute(currentPage, 10);
  }, [currentPage, execute]);
  
  const words = data?.words || [];
  const totalPages = data?.pages || 1;
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    
    // In a real implementation, we would add sort parameters to the API call
    // and refetch the data
  };
  
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
    }
    return null;
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Hindi Vocabulary</h1>
        <p className="text-muted-foreground">Loading words...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Hindi Vocabulary</h1>
        <div className="bg-card p-6 rounded-lg">
          <p className="text-muted-foreground">
            Error loading words. Please try again later.
            {error.message && <span className="block mt-2 text-sm text-red-500 dark:text-red-400">{error.message}</span>}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Hindi Vocabulary</h1>
      
      <div className="bg-card overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("hindi")}
                >
                  <div className="flex items-center gap-1">
                    Hindi {renderSortIndicator("hindi")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("transliteration")}
                >
                  <div className="flex items-center gap-1">
                    Transliteration {renderSortIndicator("transliteration")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("english")}
                >
                  <div className="flex items-center gap-1">
                    English {renderSortIndicator("english")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("correct")}
                >
                  <div className="flex items-center gap-1">
                    # Correct {renderSortIndicator("correct")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("wrong")}
                >
                  <div className="flex items-center gap-1">
                    # Wrong {renderSortIndicator("wrong")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {words.length > 0 ? (
                words.map((word) => (
                  <tr key={word.id} className="hover:bg-secondary/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link to={`/words/${word.id}`} className="text-primary hover:underline">
                          {word.hindi}
                        </Link>
                        <button 
                          className="rounded-full p-1 hover:bg-secondary"
                          title="Play pronunciation"
                          onClick={() => console.log(`Play sound for ${word.hindi}`)}
                        >
                          <Volume className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-foreground">{word.transliteration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-foreground">{word.english}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-500 dark:text-green-400">{word.correct}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-500 dark:text-red-400">{word.wrong}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                    No words found. Add some words to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
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
            disabled={currentPage === totalPages || loading}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Words;
