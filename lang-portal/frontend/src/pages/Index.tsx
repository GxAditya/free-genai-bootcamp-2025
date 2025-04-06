
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to dashboard
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  // This content will only show briefly before redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 to-purple-100">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-indigo-800">
            Hindi LearnScape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Your comprehensive platform for learning Hindi language
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/dashboard")}
            >
              Enter Dashboard
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Redirecting to dashboard...
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
