import { useState, useRef } from 'react';
import { Shield, MapPin, Clock, AlertCircle, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Mock route data
interface Route {
  id: string;
  name: string;
  type: 'safe' | 'balanced' | 'fastest';
  distance: string;
  duration: string;
  safetyScore: number;
  color: string;
  description: string;
  highlights: string[];
}

const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Safest Route',
    type: 'safe',
    distance: '2.8 km',
    duration: '12 min',
    safetyScore: 92,
    color: 'safe',
    description: 'This route maintains higher foot traffic after 9 PM, avoids poorly lit streets, and passes open commercial zones. Community feedback indicates higher perceived safety in this area during night hours.',
    highlights: [
      'Well-lit main streets',
      'Active commercial areas',
      'Higher foot traffic',
      'Multiple emergency services nearby'
    ]
  },
  {
    id: '2',
    name: 'Balanced Route',
    type: 'balanced',
    distance: '2.5 km',
    duration: '10 min',
    safetyScore: 78,
    color: 'caution',
    description: 'A moderate option balancing time and safety. Some segments have reduced lighting but maintain reasonable pedestrian presence.',
    highlights: [
      'Mix of main and side streets',
      'Moderate foot traffic',
      'Some well-lit areas'
    ]
  },
  {
    id: '3',
    name: 'Fastest Route',
    type: 'fastest',
    distance: '2.1 km',
    duration: '8 min',
    safetyScore: 54,
    color: 'unsafe',
    description: 'Shortest distance but includes isolated areas with minimal lighting and low pedestrian activity during night hours.',
    highlights: [
      'Shortest distance',
      'Less populated areas',
      'Limited street lighting'
    ]
  }
];

export default function SafeRoute() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showSOS, setShowSOS] = useState(false);
  const [startLocation, setStartLocation] = useState('123 Main Street, Downtown');
  const [destination, setDestination] = useState('');
  const [travelTime, setTravelTime] = useState('21:00');
  const [showFeedback, setShowFeedback] = useState(false);
  const [routesGenerated, setRoutesGenerated] = useState(false);
  
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleFindRoutes = () => {
    if (destination.trim()) {
      setRoutesGenerated(true);
      setSelectedRoute(mockRoutes[0]);
    }
  };

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-safe';
    if (score >= 60) return 'text-caution';
    return 'text-unsafe';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-safe/10 border-safe';
    if (score >= 60) return 'bg-caution/10 border-caution';
    return 'bg-unsafe/10 border-unsafe';
  };

  return (
    <div className="min-h-screen bg-gradient-navy">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 xl:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
            <h1 className="text-xl xl:text-2xl font-bold text-foreground">SafeRoute</h1>
          </div>
          <div className="flex items-center gap-2 xl:gap-4">
            <Button variant="outline" size="sm" onClick={scrollToMap} className="text-xs xl:text-sm">
              Try Demo
            </Button>
            {selectedRoute && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setShowSOS(true)}
                className="text-xs xl:text-sm"
              >
                SOS
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto px-4 xl:px-8 py-12 xl:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4 xl:space-y-6">
          <h2 className="text-3xl xl:text-5xl font-bold text-foreground">
            Travel Safer at Night
          </h2>
          <p className="text-base xl:text-xl text-muted-foreground">
            AI-powered route guidance designed with women's safety first.
          </p>
          <p className="text-sm xl:text-base text-primary font-medium">
            Not the fastest route. The safest one.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToMap}
            className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 xl:mt-6 text-sm xl:text-base"
          >
            Start Safe Navigation
          </Button>
        </div>
      </section>

      {/* Route Selection & Map Section */}
      <section ref={mapSectionRef} className="container mx-auto px-4 xl:px-8 py-8 xl:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {/* Left Panel - Route Input */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg xl:text-xl">Plan Your Safe Journey</CardTitle>
              <CardDescription>Enter your destination to find the safest route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="start" className="flex items-center gap-2 text-sm xl:text-base">
                  <MapPin className="w-4 h-4" />
                  Start Location
                </Label>
                <Input
                  id="start"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="Your current location"
                  className="bg-input border-border text-sm xl:text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2 text-sm xl:text-base">
                  <MapPin className="w-4 h-4" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="bg-input border-border text-sm xl:text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2 text-sm xl:text-base">
                  <Clock className="w-4 h-4" />
                  Travel Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  className="bg-input border-border text-sm xl:text-base"
                />
              </div>
              
              <Button 
                onClick={handleFindRoutes}
                disabled={!destination.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm xl:text-base"
              >
                Find Safe Routes
              </Button>
            </CardContent>
          </Card>

          {/* Right Panel - Map View */}
          <Card className="bg-card border-border">
            <CardContent className="p-4 xl:p-6">
              <div className="aspect-square xl:aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {!routesGenerated ? (
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 xl:w-16 xl:h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground text-sm xl:text-base">Enter destination to view routes</p>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    {/* Mock Map with Routes */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted">
                      {/* Route indicators */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-safe rounded-full animate-pulse" />
                      <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-caution rounded-full animate-pulse" />
                      <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-unsafe rounded-full animate-pulse" />
                      
                      {/* Route lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <path d="M 25% 25% Q 40% 40%, 75% 75%" stroke="hsl(var(--safe))" strokeWidth="3" fill="none" opacity="0.8" />
                        <path d="M 25% 25% Q 50% 35%, 75% 75%" stroke="hsl(var(--caution))" strokeWidth="3" fill="none" opacity="0.6" />
                        <path d="M 25% 25% Q 60% 30%, 75% 75%" stroke="hsl(var(--unsafe))" strokeWidth="3" fill="none" opacity="0.4" />
                      </svg>
                      
                      {/* Start and End markers */}
                      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          Start
                        </div>
                      </div>
                      <div className="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          End
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Analysis Panel */}
      {selectedRoute && (
        <section className="container mx-auto px-4 xl:px-8 py-6 xl:py-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg xl:text-xl">Why this route is safer</CardTitle>
                  <CardDescription className="mt-2 text-sm xl:text-base">{selectedRoute.description}</CardDescription>
                </div>
                <Badge className={`${getScoreBg(selectedRoute.safetyScore)} ${getScoreColor(selectedRoute.safetyScore)} text-xs xl:text-sm`}>
                  Safety Score: {selectedRoute.safetyScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium text-sm xl:text-base">Key Safety Features:</h4>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {selectedRoute.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm xl:text-base">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs xl:text-sm text-muted-foreground">Powered by Gemini AI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Route Comparison Section */}
      {routesGenerated && (
        <section className="container mx-auto px-4 xl:px-8 py-6 xl:py-8">
          <h3 className="text-xl xl:text-2xl font-bold text-foreground mb-4 xl:mb-6">Compare Routes</h3>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
            {mockRoutes.map((route) => (
              <Card 
                key={route.id}
                className={`bg-card border-2 transition-all cursor-pointer hover:shadow-lg ${
                  selectedRoute?.id === route.id ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedRoute(route)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base xl:text-lg">{route.name}</CardTitle>
                    <Badge className={`${getScoreBg(route.safetyScore)} ${getScoreColor(route.safetyScore)} text-xs`}>
                      {route.safetyScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm xl:text-base">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex justify-between text-sm xl:text-base">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{route.duration}</span>
                  </div>
                  <Button 
                    onClick={() => setSelectedRoute(route)}
                    variant={selectedRoute?.id === route.id ? "default" : "outline"}
                    className="w-full mt-2 text-xs xl:text-sm"
                  >
                    {selectedRoute?.id === route.id ? 'Selected' : 'Select Route'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Community Safety Feedback Section */}
      <section className="container mx-auto px-4 xl:px-8 py-6 xl:py-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg xl:text-xl">
              <Users className="w-5 h-5" />
              Community Safety Feedback
            </CardTitle>
            <CardDescription className="text-sm xl:text-base">
              Help others by sharing your experience. All reports are anonymous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xl:flex-row gap-3 xl:gap-4">
              <Button 
                onClick={() => setShowFeedback(true)}
                variant="outline"
                className="flex-1 text-sm xl:text-base"
              >
                Mark Area Safe
              </Button>
              <Button 
                onClick={() => setShowFeedback(true)}
                variant="outline"
                className="flex-1 text-sm xl:text-base"
              >
                Report Unsafe Area
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 xl:px-8 py-8 xl:py-12 border-t border-border mt-8 xl:mt-12">
        <div className="text-center space-y-2">
          <p className="text-foreground font-semibold text-sm xl:text-base">SafeRoute</p>
          <p className="text-muted-foreground text-xs xl:text-sm">Hackathon Prototype 2025</p>
          <p className="text-muted-foreground text-xs">Prototype for demonstration only</p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={scrollToTop}
            className="mt-4 text-xs xl:text-sm"
          >
            Back to Top
          </Button>
        </div>
      </footer>

      {/* SOS Emergency Modal */}
      <Dialog open={showSOS} onOpenChange={setShowSOS}>
        <DialogContent className="bg-card border-destructive border-2">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2 text-lg xl:text-xl">
              <AlertCircle className="w-6 h-6" />
              Emergency Alert Triggered
            </DialogTitle>
            <DialogDescription className="text-sm xl:text-base">
              Your emergency contacts have been notified with your live location.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm xl:text-base">Current Location:</p>
              <p className="text-muted-foreground text-xs xl:text-sm">{startLocation}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm xl:text-base">Selected Route:</p>
              <p className="text-muted-foreground text-xs xl:text-sm">{selectedRoute?.name}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary">
              <p className="text-primary font-medium text-center text-sm xl:text-base">
                Help has been notified. Stay where you are. We're with you.
              </p>
            </div>
          </div>
          <Button onClick={() => setShowSOS(false)} className="w-full text-sm xl:text-base">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Community Feedback Modal */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-lg xl:text-xl">Submit Safety Feedback</DialogTitle>
            <DialogDescription className="text-sm xl:text-base">
              Your anonymous feedback helps keep the community safe.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm xl:text-base">Location</Label>
              <Input 
                id="location"
                placeholder="Street name or area"
                className="bg-input border-border text-sm xl:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm xl:text-base">Details</Label>
              <Textarea 
                id="feedback"
                placeholder="Describe what you observed..."
                className="bg-input border-border min-h-[100px] text-sm xl:text-base"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Reports are anonymous and weighted by recency.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowFeedback(false)} className="flex-1 text-sm xl:text-base">
              Cancel
            </Button>
            <Button onClick={() => setShowFeedback(false)} className="flex-1 text-sm xl:text-base">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
