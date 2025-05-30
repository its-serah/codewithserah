import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Brain3D from "@/components/Brain3D";
import Floating3DIcon from "@/components/Floating3DIcon";
import ParticleField from "@/components/ParticleField";
import GenZ3DElements from "@/components/GenZ3DElements";
import Interactive3DShapes from "@/components/Interactive3DShapes";
import FloatingEmojis3D from "@/components/FloatingEmojis3D";
import { 
  BookOpen, 
  Users, 
  Award, 
  Zap, 
  Star, 
  ArrowRight, 
  Play,
  CheckCircle,
  Globe,
  Clock,
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic content that adapts to your learning style and pace."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience."
    },
    {
      icon: Award,
      title: "Certified Courses",
      description: "Earn recognized certifications that boost your career prospects."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get real-time guidance and personalized recommendations as you learn."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners worldwide and build your professional network."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 access to all course materials."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content: "This platform transformed my career. The courses are incredibly well-structured and the instructors are top-notch.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      content: "The hands-on projects and real-world applications made all the difference in my learning journey.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "I loved the interactive format and the community support. Highly recommend to anyone looking to upskill!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Enrolled" },
    { number: "500+", label: "Expert Instructors" },
    { number: "1000+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Particle field background */}
      <ParticleField scrollProgress={scrollProgress} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                EduLaunch
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#courses" className="text-gray-600 hover:text-purple-600 transition-colors">Courses</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
              <Link to="/events" className="text-gray-600 hover:text-purple-600 transition-colors">Events</Link>
              <Link to="/study" className="text-gray-600 hover:text-purple-600 transition-colors">Study Smart</Link>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-purple-100 relative">
        {/* Add floating emojis to hero */}
        <FloatingEmojis3D density="low" />
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
                🚀 Transform Your Future Today
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Learn Skills That
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {" "}Matter
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of learners who are advancing their careers with our expert-led courses, 
                hands-on projects, and industry-recognized certifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-lg px-8 py-6">
                  Start Learning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free trial available
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Brain3D />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl transform rotate-6 scale-105 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Icons */}
      <section id="features" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven educational methods 
              to deliver an unparalleled learning experience.
            </p>
          </div>
          
          {/* Enhanced 3D Icons scattered around */}
          <div className="absolute top-10 left-10">
            <Floating3DIcon icon="🎓" className="w-16 h-16" color="#9333ea" />
          </div>
          <div className="absolute top-20 right-20">
            <Floating3DIcon icon="💡" className="w-20 h-20" color="#ec4899" />
          </div>
          <div className="absolute bottom-10 left-1/4">
            <Floating3DIcon icon="🚀" className="w-18 h-18" color="#06b6d4" />
          </div>
          <div className="absolute top-1/2 right-10">
            <Floating3DIcon icon="⚡" className="w-16 h-16" color="#f59e0b" />
          </div>
          <div className="absolute bottom-20 right-1/3">
            <Floating3DIcon icon="💎" className="w-20 h-20" color="#8b5cf6" />
          </div>
          <div className="absolute top-32 left-1/3">
            <Floating3DIcon icon="🔥" className="w-18 h-18" color="#ef4444" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg ${
                  hoveredFeature === index ? 'transform -translate-y-2' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Interactive 3D Shapes Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
        <FloatingEmojis3D density="normal" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              🎮 Interactive 3D World
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Touch, Click,
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Explore
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into our interactive 3D learning environment where every click unlocks new possibilities! 
              Each shape represents a different learning path - go ahead, click them! 🌟
            </p>
          </div>
          
          <Interactive3DShapes className="w-full h-80 mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                3D Learning Made
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}Simple
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Interactive 3D models for every concept</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Gamified learning with rewards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Real-time collaboration in 3D space</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Floating3DIcon icon="🎯" className="w-16 h-16 mx-auto mb-3" color="#8b5cf6" />
                  <h4 className="font-semibold text-gray-900">Precision Learning</h4>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-0 p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Floating3DIcon icon="🌊" className="w-16 h-16 mx-auto mb-3" color="#06b6d4" />
                  <h4 className="font-semibold text-gray-900">Flow State</h4>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-0 p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Floating3DIcon icon="⭐" className="w-16 h-16 mx-auto mb-3" color="#f59e0b" />
                  <h4 className="font-semibold text-gray-900">Achievement</h4>
                </Card>
                <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-0 p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Floating3DIcon icon="🎪" className="w-16 h-16 mx-auto mb-3" color="#10b981" />
                  <h4 className="font-semibold text-gray-900">Fun Learning</h4>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gen Z 3D Elements Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 relative">
        <FloatingEmojis3D density="high" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              ✨ Next-Gen Learning
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Experience Learning Like
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Never Before
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immersive, interactive, and totally fire 🔥 - our platform brings learning to life 
              with cutting-edge 3D experiences and gamified progress tracking.
            </p>
          </div>
          
          <GenZ3DElements scrollProgress={scrollProgress} />
          
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <Floating3DIcon icon="🎮" className="w-24 h-24 mx-auto" color="#f97316" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Gamified Learning</h3>
                <p className="text-gray-600">Level up your skills with XP points, achievements, and leaderboards that make learning addictive!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <Floating3DIcon icon="🤖" className="w-24 h-24 mx-auto" color="#06b6d4" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Study Buddy</h3>
                <p className="text-gray-600">Your personal AI assistant that adapts to your learning style and keeps you motivated 24/7.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <Floating3DIcon icon="🌐" className="w-24 h-24 mx-auto" color="#eab308" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Metaverse Ready</h3>
                <p className="text-gray-600">Join virtual study rooms and collaborate in immersive 3D environments with peers worldwide.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white relative">
        {/* Add subtle 3D elements */}
        <div className="absolute top-10 left-10 opacity-30">
          <Floating3DIcon icon="💬" className="w-12 h-12" color="#9333ea" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <Floating3DIcon icon="⭐" className="w-14 h-14" color="#f59e0b" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Student Success</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {" "}Thousands
              </span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-purple-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with 3D elements */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 relative overflow-hidden">
        {/* More floating 3D elements in background */}
        <div className="absolute top-10 left-10">
          <Floating3DIcon icon="⚡" className="w-16 h-16" color="#fbbf24" />
        </div>
        <div className="absolute top-20 right-20">
          <Floating3DIcon icon="💎" className="w-20 h-20" color="#06b6d4" />
        </div>
        <div className="absolute bottom-10 left-1/3">
          <Floating3DIcon icon="🔥" className="w-18 h-18" color="#f97316" />
        </div>
        <div className="absolute top-1/2 left-1/4">
          <Floating3DIcon icon="🚀" className="w-16 h-16" color="#ec4899" />
        </div>
        <div className="absolute bottom-20 right-1/4">
          <Floating3DIcon icon="✨" className="w-20 h-20" color="#8b5cf6" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful learners who have already started their journey. 
            Begin your transformation today with our free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              Start Free Trial
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">EduLaunch</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with cutting-edge education and career-focused skills.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduLaunch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
