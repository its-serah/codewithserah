
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "2024-06-15",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Hub Center",
      attendees: 45,
      type: "Workshop",
      description: "Hands-on workshop covering fundamentals of AI and ML with real-world projects.",
      price: "Free"
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      date: "2024-06-20",
      time: "9:00 AM - 5:00 PM",
      location: "Innovation Campus",
      attendees: 32,
      type: "Bootcamp",
      description: "Intensive bootcamp covering Python, statistics, and data visualization.",
      price: "$199"
    },
    {
      id: 3,
      title: "Web Development Masterclass",
      date: "2024-06-25",
      time: "2:00 PM - 6:00 PM",
      location: "Digital Learning Center",
      attendees: 28,
      type: "Masterclass",
      description: "Advanced techniques in React, Node.js, and modern web development.",
      price: "$149"
    },
    {
      id: 4,
      title: "Coding Competition",
      date: "2024-07-01",
      time: "10:00 AM - 8:00 PM",
      location: "University Campus",
      attendees: 120,
      type: "Competition",
      description: "Annual coding competition with prizes and networking opportunities.",
      price: "Free"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Workshop": return "bg-blue-100 text-blue-700";
      case "Bootcamp": return "bg-green-100 text-green-700";
      case "Masterclass": return "bg-purple-100 text-purple-700";
      case "Competition": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

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
              <Link to="/events" className="text-purple-600 font-medium">Events</Link>
              <Link to="/study" className="text-gray-600 hover:text-purple-600 transition-colors">Study Smart</Link>
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
              📅 Upcoming Events
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Join Our
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Learning Events
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow learners, attend workshops, and accelerate your growth through 
              hands-on experiences and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{event.price}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-2">{event.title}</CardTitle>
                  <p className="text-gray-600">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-3" />
                      <span>{event.attendees} attendees registered</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Suggest an event topic or request a custom workshop for your team or organization.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
            Suggest an Event
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
