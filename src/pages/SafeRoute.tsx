import { useState, useRef, useEffect } from 'react';
import { Shield, MapPin, Clock, AlertCircle, Users, Sparkles, Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { googleMapsService, type RouteData } from '@/services/googleMaps';
import { geminiService, type SafetyAnalysis } from '@/services/gemini';
import { useToast } from '@/hooks/use-toast';

export default function SafeRoute() {
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [safetyAnalyses, setSafetyAnalyses] = useState<Map<string, SafetyAnalysis>>(new Map());
  const [showSOS, setShowSOS] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [travelTime, setTravelTime] = useState('21:00');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current && !mapInitialized) {
      initializeMap();
    }
  }, [mapInitialized]);

  const initializeMap = async () => {
    if (!mapContainerRef.current) return;

    try {
      await googleMapsService.initMap(mapContainerRef.current);
      setMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to initialize map. Please refresh the page.',
        variant: 'destructive'
      });
    }
  };

  const handleGetCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const location = await googleMapsService.getCurrentLocation();
      setStartLocation(location.address);
      toast({
        title: 'Location Found',
        description: 'Current location set successfully'
      });
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: 'Location Error',
        description: 'Could not get current location. Please enter manually.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleFindRoutes = async () => {
    if (!destination.trim()) {
      toast({
        title: 'Missing Destination',
        description: 'Please enter a destination address',
        variant: 'destructive'
      });
      return;
    }

    if (!startLocation.trim()) {
      toast({
        title: 'Missing Start Location',
        description: 'Please enter a start location or use current location',
        variant: 'destructive'
      });
      return;
    }

    setIsLoadingRoutes(true);
    
    try {
      // Fetch routes from Google Maps
      const fetchedRoutes = await googleMapsService.getRoutes(
        startLocation,
        destination,
        travelTime
      );

      if (fetchedRoutes.length === 0) {
        throw new Error('No routes found');
      }

      setRoutes(fetchedRoutes);

      // Analyze routes with Gemini AI
      toast({
        title: 'Routes Found',
        description: 'Analyzing route safety with AI...'
      });

      const analyses = await geminiService.analyzeMultipleRoutes(fetchedRoutes, travelTime);
      setSafetyAnalyses(analyses);

      // Update routes with AI-enhanced safety scores
      const updatedRoutes = fetchedRoutes.map(route => {
        const analysis = analyses.get(route.id);
        if (analysis) {
          return { ...route, safetyScore: analysis.safetyScore };
        }
        return route;
      });

      setRoutes(updatedRoutes);
      setSelectedRoute(updatedRoutes[0]);

      toast({
        title: 'Analysis Complete',
        description: `Found ${fetchedRoutes.length} route${fetchedRoutes.length > 1 ? 's' : ''} with safety analysis`,
      });

    } catch (error) {
      console.error('Error finding routes:', error);
      toast({
        title: 'Route Error',
        description: error instanceof Error ? error.message : 'Failed to find routes. Please check your addresses.',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingRoutes(false);
    }
  };

  const handleRouteSelect = (route: RouteData) => {
    setSelectedRoute(route);
    const routeIndex = routes.findIndex(r => r.id === route.id);
    if (routeIndex !== -1) {
      googleMapsService.highlightRoute(routeIndex);
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

  const currentAnalysis = selectedRoute ? safetyAnalyses.get(selectedRoute.id) : null;

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
                <div className="flex gap-2">
                  <Input
                    id="start"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="Your current location"
                    className="bg-input border-border text-sm xl:text-base flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleGetCurrentLocation}
                    disabled={isLoadingLocation}
                    title="Use current location"
                  >
                    {isLoadingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                  </Button>
                </div>
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
                disabled={!destination.trim() || !startLocation.trim() || isLoadingRoutes}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm xl:text-base"
              >
                {isLoadingRoutes ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Finding Routes...
                  </>
                ) : (
                  'Find Safe Routes'
                )}
              </Button>

              {!geminiService.isConfigured() && (
                <p className="text-xs text-muted-foreground text-center">
                  ⚠️ Gemini API not configured. Using fallback analysis.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Map View */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div 
                ref={mapContainerRef}
                className="w-full h-[400px] xl:h-[500px] rounded-lg overflow-hidden"
                style={{ minHeight: '400px' }}
              >
                {!mapInitialized && (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Loader2 className="w-12 h-12 xl:w-16 xl:h-16 text-primary mx-auto animate-spin" />
                      <p className="text-muted-foreground text-sm xl:text-base">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Analysis Panel */}
      {selectedRoute && currentAnalysis && (
        <section className="container mx-auto px-4 xl:px-8 py-6 xl:py-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg xl:text-xl">Why this route is safer</CardTitle>
                  <CardDescription className="mt-2 text-sm xl:text-base">
                    {currentAnalysis.description}
                  </CardDescription>
                </div>
                <Badge className={`${getScoreBg(currentAnalysis.safetyScore)} ${getScoreColor(currentAnalysis.safetyScore)} text-xs xl:text-sm`}>
                  Safety Score: {currentAnalysis.safetyScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium text-sm xl:text-base">Key Safety Features:</h4>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {currentAnalysis.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm xl:text-base">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                
                {currentAnalysis.recommendations && currentAnalysis.recommendations.length > 0 && (
                  <>
                    <h4 className="font-medium text-sm xl:text-base mt-4">Safety Recommendations:</h4>
                    <ul className="space-y-1">
                      {currentAnalysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm xl:text-base">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs xl:text-sm text-muted-foreground">
                    {geminiService.isConfigured() 
                      ? 'Powered by Gemini AI' 
                      : 'Using enhanced safety analysis'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Route Comparison Section */}
      {routes.length > 0 && (
        <section className="container mx-auto px-4 xl:px-8 py-6 xl:py-8">
          <h3 className="text-xl xl:text-2xl font-bold text-foreground mb-4 xl:mb-6">Compare Routes</h3>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
            {routes.map((route) => {
              const analysis = safetyAnalyses.get(route.id);
              const score = analysis?.safetyScore || route.safetyScore;
              
              return (
                <Card 
                  key={route.id}
                  className={`bg-card border-2 transition-all cursor-pointer hover:shadow-lg ${
                    selectedRoute?.id === route.id ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => handleRouteSelect(route)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base xl:text-lg">{route.name}</CardTitle>
                      <Badge className={`${getScoreBg(score)} ${getScoreColor(score)} text-xs`}>
                        {score}
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
                      onClick={() => handleRouteSelect(route)}
                      variant={selectedRoute?.id === route.id ? "default" : "outline"}
                      className="w-full mt-2 text-xs xl:text-sm"
                    >
                      {selectedRoute?.id === route.id ? 'Selected' : 'Select Route'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
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
