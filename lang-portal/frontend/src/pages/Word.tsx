
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume } from "lucide-react";

const Word = () => {
  const { id } = useParams();
  
  // Mock word data (in a real app, fetch this based on id)
  const word = {
    id: Number(id),
    hindi: "नमस्ते",
    transliteration: "namaste",
    english: "hello",
    partOfSpeech: "greeting",
    example: "नमस्ते, आप कैसे हैं?",
    exampleTransliteration: "Namaste, aap kaise hain?",
    exampleTranslation: "Hello, how are you?",
    notes: "Formal greeting in Hindi, often accompanied by pressing palms together.",
    correct: 12,
    wrong: 3,
    groups: [
      { id: 1, name: "Common Greetings" },
      { id: 3, name: "Beginner Words" }
    ]
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{word.hindi}</h1>
        <button 
          className="rounded-full p-2 hover:bg-gray-100"
          title="Play pronunciation"
          onClick={() => console.log(`Play sound for ${word.hindi}`)}
        >
          <Volume className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Word Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Transliteration</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{word.transliteration}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">English</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{word.english}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Part of Speech</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{word.partOfSpeech}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Word Groups</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="space-y-1">
                    {word.groups.map(group => (
                      <li key={group.id} className="text-indigo-600 hover:underline cursor-pointer">
                        {group.name}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Examples and Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Example Sentence</h3>
                <p className="mt-1">{word.example}</p>
                <p className="text-sm text-gray-500">{word.exampleTransliteration}</p>
                <p className="text-sm text-gray-600 italic">{word.exampleTranslation}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-sm text-gray-700">{word.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">{word.correct}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Incorrect Answers</p>
              <p className="text-2xl font-bold text-red-600">{word.wrong}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold text-indigo-600">
                {Math.round((word.correct / (word.correct + word.wrong)) * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Word;
