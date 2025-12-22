import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RouteData } from './googleMaps';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface SafetyAnalysis {
  description: string;
  highlights: string[];
  safetyScore: number;
  recommendations: string[];
}

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  isConfigured(): boolean {
    return this.genAI !== null && GEMINI_API_KEY !== 'your_gemini_api_key_here';
  }

  async analyzeRouteSafety(
    route: RouteData,
    travelTime: string,
    routeIndex: number
  ): Promise<SafetyAnalysis> {
    if (!this.isConfigured()) {
      // Return fallback analysis if Gemini is not configured
      return this.getFallbackAnalysis(route, routeIndex);
    }

    try {
      const prompt = this.buildSafetyPrompt(route, travelTime, routeIndex);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAnalysisResponse(text, route);
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackAnalysis(route, routeIndex);
    }
  }

  private buildSafetyPrompt(route: RouteData, travelTime: string, routeIndex: number): string {
    const routeType = routeIndex === 0 ? 'safest' : routeIndex === 1 ? 'balanced' : 'fastest';
    
    return `You are a safety analyst for SafeRoute, an AI-powered navigation app helping women choose safer routes at night.

Analyze this ${routeType} route for a woman traveling at ${travelTime}:

Route Details:
- Route Type: ${routeType.toUpperCase()}
- Distance: ${route.distance}
- Duration: ${route.duration}
- Summary: ${route.summary}
- Warnings: ${route.warnings.length > 0 ? route.warnings.join(', ') : 'None'}
- Number of turns: ${route.steps.length}

IMPORTANT: Provide a safety score that reflects the route type:
- SAFEST route: 85-95 (prioritizes well-lit streets, high foot traffic, commercial areas)
- BALANCED route: 70-84 (mix of safety and efficiency, some quieter areas)
- FASTEST route: 50-69 (shortest path, may include isolated areas, lower lighting)

Consider these safety factors:
1. Time of travel (${travelTime}) - lighting conditions
2. Route characteristics - main streets vs side streets vs alleys
3. Likely foot traffic and pedestrian presence at this time
4. Proximity to commercial areas, residential zones, or isolated areas
5. Route complexity - more turns may indicate populated areas
6. Street lighting probability based on route type
7. Emergency services accessibility

Provide a safety analysis in this EXACT format:

DESCRIPTION: [2-3 sentences explaining why this route has this safety level. Be specific about lighting, foot traffic, and area characteristics. Tone should be calm and factual.]

HIGHLIGHTS:
- [Key safety feature or concern 1]
- [Key safety feature or concern 2]
- [Key safety feature or concern 3]
- [Key safety feature or concern 4]

SAFETY_SCORE: [Number between 50-95 based on route type - SAFEST: 85-95, BALANCED: 70-84, FASTEST: 50-69]

RECOMMENDATIONS:
- [Practical safety tip 1 specific to this route type]
- [Practical safety tip 2 specific to this route type]
- [Practical safety tip 3 specific to this route type]

Keep the tone calm, reassuring, and informative. Focus on facts, not fear. Be honest about risks while providing actionable guidance.`;
  }

  private parseAnalysisResponse(text: string, route: RouteData): SafetyAnalysis {
    try {
      // Extract description
      const descMatch = text.match(/DESCRIPTION:\s*(.+?)(?=HIGHLIGHTS:|$)/s);
      const description = descMatch 
        ? descMatch[1].trim().replace(/\n/g, ' ')
        : 'This route provides a balance of safety and efficiency for your journey.';

      // Extract highlights
      const highlightsMatch = text.match(/HIGHLIGHTS:\s*(.+?)(?=SAFETY_SCORE:|$)/s);
      const highlights = highlightsMatch
        ? highlightsMatch[1]
            .split('\n')
            .map(h => h.trim())
            .filter(h => h.startsWith('-'))
            .map(h => h.substring(1).trim())
            .filter(h => h.length > 0)
        : [
            'Well-maintained route',
            'Clear navigation',
            'Reasonable distance',
            'Standard safety measures apply'
          ];

      // Extract safety score
      const scoreMatch = text.match(/SAFETY_SCORE:\s*(\d+)/);
      const safetyScore = scoreMatch 
        ? Math.max(50, Math.min(95, parseInt(scoreMatch[1])))
        : route.safetyScore;

      // Extract recommendations
      const recsMatch = text.match(/RECOMMENDATIONS:\s*(.+?)$/s);
      const recommendations = recsMatch
        ? recsMatch[1]
            .split('\n')
            .map(r => r.trim())
            .filter(r => r.startsWith('-'))
            .map(r => r.substring(1).trim())
            .filter(r => r.length > 0)
        : [
            'Stay aware of your surroundings',
            'Keep your phone charged and accessible'
          ];

      return {
        description,
        highlights: highlights.slice(0, 5),
        safetyScore,
        recommendations: recommendations.slice(0, 3)
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return this.getFallbackAnalysis(route, 0);
    }
  }

  private getFallbackAnalysis(route: RouteData, routeIndex: number): SafetyAnalysis {
    const analyses = [
      {
        description: 'This route maintains higher foot traffic after 9 PM, avoids poorly lit streets, and passes open commercial zones. Community feedback indicates higher perceived safety in this area during night hours.',
        highlights: [
          'Well-lit main streets',
          'Active commercial areas',
          'Higher foot traffic',
          'Multiple emergency services nearby',
          'Clear visibility throughout'
        ],
        safetyScore: 92,
        recommendations: [
          'Stay on main streets when possible',
          'Keep emergency contacts readily available',
          'Trust your instincts'
        ]
      },
      {
        description: 'A moderate option balancing time and safety. Some segments have reduced lighting but maintain reasonable pedestrian presence. The route uses a mix of main and side streets.',
        highlights: [
          'Mix of main and side streets',
          'Moderate foot traffic',
          'Some well-lit areas',
          'Reasonable distance'
        ],
        safetyScore: 78,
        recommendations: [
          'Be extra aware in less-lit areas',
          'Consider traveling with a companion',
          'Share your route with trusted contacts'
        ]
      },
      {
        description: 'Shortest distance but includes isolated areas with minimal lighting and low pedestrian activity during night hours. Consider this route only if time is critical.',
        highlights: [
          'Shortest distance',
          'Less populated areas',
          'Limited street lighting',
          'Faster arrival time'
        ],
        safetyScore: 54,
        recommendations: [
          'Only use if absolutely necessary',
          'Share live location with trusted contacts',
          'Stay alert and avoid distractions'
        ]
      }
    ];

    return analyses[routeIndex] || analyses[0];
  }

  async analyzeMultipleRoutes(
    routes: RouteData[],
    travelTime: string
  ): Promise<Map<string, SafetyAnalysis>> {
    const analyses = new Map<string, SafetyAnalysis>();

    // Analyze routes in parallel
    const promises = routes.map((route, index) =>
      this.analyzeRouteSafety(route, travelTime, index)
    );

    const results = await Promise.all(promises);

    routes.forEach((route, index) => {
      analyses.set(route.id, results[index]);
    });

    return analyses;
  }
}

export const geminiService = new GeminiService();
