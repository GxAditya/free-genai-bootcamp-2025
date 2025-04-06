
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Volume, ArrowUp, ArrowDown } from "lucide-react";

const WordGroup = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("hindi");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Mock group data (in a real app, fetch this based on id)
  const group = {
    id: Number(id),
    name: id === "2" ? "Core Verbs" : id === "5" ? "Common Nouns" : "Word Group",
    description: "This collection contains essential Hindi words that are frequently used in everyday conversations. Mastering these words will provide a strong foundation for language fluency.",
    totalWords: 25
  };
  
  // Mock words in this group
  const words = [
    { id: 11, hindi: "जाना", transliteration: "jaana", english: "to go", correct: 8, wrong: 2 },
    { id: 12, hindi: "आना", transliteration: "aana", english: "to come", correct: 10, wrong: 1 },
    { id: 13, hindi: "खाना", transliteration: "khaana", english: "to eat", correct: 12, wrong: 0 },
    { id: 14, hindi: "पीना", transliteration: "peena", english: "to drink", correct: 7, wrong: 3 },
    { id: 15, hindi: "सोना", transliteration: "sona", english: "to sleep", correct: 9, wrong: 1 },
    { id: 16, hindi: "देखना", transliteration: "dekhna", english: "to see", correct: 11, wrong: 2 },
    { id: 17, hindi: "सुनना", transliteration: "sunna", english: "to hear", correct: 8, wrong: 4 },
    { id: 18, hindi: "बोलना", transliteration: "bolna", english: "to speak", correct: 14, wrong: 1 },
    { id: 19, hindi: "करना", transliteration: "karna", english: "to do", correct: 15, wrong: 0 },
    { id: 20, hindi: "देना", transliteration: "dena", english: "to give", correct: 6, wrong: 2 },
  ];
  
  const totalPages = 3; // Mock total pages
  
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
        <p className="text-gray-600 mt-2">{group.description}</p>
        <p className="text-sm text-gray-500 mt-1">Total words: {group.totalWords}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Study This Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">
              Flashcards
            </Button>
            <Button variant="outline" className="w-full">
              Typing Practice
            </Button>
            <Button variant="secondary" className="w-full">
              Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("hindi")}
                >
                  <div className="flex items-center gap-1">
                    Hindi {renderSortIndicator("hindi")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("transliteration")}
                >
                  <div className="flex items-center gap-1">
                    Transliteration {renderSortIndicator("transliteration")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("english")}
                >
                  <div className="flex items-center gap-1">
                    English {renderSortIndicator("english")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("correct")}
                >
                  <div className="flex items-center gap-1">
                    # Correct {renderSortIndicator("correct")}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("wrong")}
                >
                  <div className="flex items-center gap-1">
                    # Wrong {renderSortIndicator("wrong")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {words.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link to={`/words/${word.id}`} className="text-indigo-600 hover:underline">
                        {word.hindi}
                      </Link>
                      <button 
                        className="rounded-full p-1 hover:bg-gray-100"
                        title="Play pronunciation"
                        onClick={() => console.log(`Play sound for ${word.hindi}`)}
                      >
                        <Volume className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{word.transliteration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{word.english}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">{word.correct}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">{word.wrong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-700">
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

export default WordGroup;
