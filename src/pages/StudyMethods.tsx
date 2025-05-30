
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Pause, RotateCcw, Timer, Brain, Coffee, Target } from "lucide-react";
import { Link } from "react-router-dom";

const StudyMethods = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Session completed
      setCompletedSessions(prev => prev + 1);
      if (isBreak) {
        setTime(25 * 60); // Back to work session
        setIsBreak(false);
      } else {
        setTime(5 * 60); // 5 minute break
        setIsBreak(true);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, time, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(25 * 60);
    setIsBreak(false);
  };

  const techniques = [
    {
      title: "Pomodoro Technique",
      description: "Work for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer break.",
      icon: Timer,
      color: "bg-red-500"
    },
    {
      title: "Active Recall",
      description: "Test yourself frequently instead of just re-reading notes. Quiz yourself on key concepts.",
      icon: Brain,
      color: "bg-blue-500"
    },
    {
      title: "Spaced Repetition",
      description: "Review material at increasing intervals to improve long-term retention.",
      icon: RotateCcw,
      color: "bg-green-500"
    },
    {
      title: "Feynman Technique",
      description: "Explain concepts in simple terms as if teaching someone else to identify knowledge gaps.",
      icon: Target,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                EduLaunch
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/events" className="text-gray-600 hover:text-purple-600 transition-colors">Events</Link>
              <Link to="/study" className="text-purple-600 font-medium">Study Smart</Link>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              🧠 Study Smarter
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Master Your
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Study Sessions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use proven techniques and tools to maximize your learning efficiency and retention.
            </p>
          </div>
        </div>
      </section>

      {/* Pomodoro Timer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Pomodoro Timer
                </CardTitle>
                <Badge className={isBreak ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {isBreak ? "Break Time" : "Focus Time"}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-8">
                  <div className="text-8xl font-bold text-purple-600 mb-4">
                    {formatTime(time)}
                  </div>
                  <div className="text-lg text-gray-600 mb-6">
                    Sessions Completed: {completedSessions}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 mb-8">
                  <Button
                    onClick={startTimer}
                    disabled={isActive && !isPaused}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </Button>
                  <Button
                    onClick={pauseTimer}
                    disabled={!isActive}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  {isBreak 
                    ? "Take a break! Relax and recharge for the next session."
                    : "Focus on your task. Avoid distractions and stay productive!"
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Study Techniques */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Study
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Techniques
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover scientifically-backed methods to enhance your learning and memory retention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {techniques.map((technique, index) => (
              <Card key={index} className="border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${technique.color} rounded-lg flex items-center justify-center mr-4`}>
                      <technique.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{technique.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{technique.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Study Tips for Success
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Hydrated</h3>
                <p className="text-gray-600">Drink plenty of water to keep your brain functioning at its best.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Breaks</h3>
                <p className="text-gray-600">Regular breaks help maintain focus and prevent mental fatigue.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Goals</h3>
                <p className="text-gray-600">Clear objectives help maintain motivation and track progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyMethods;
