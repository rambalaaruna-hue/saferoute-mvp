# SafeRoute Prototype Website Requirements Document

## 1. Website Overview

### 1.1 Website Name
SafeRoute

### 1.2 Website Description
SafeRoute is a hackathon prototype website designed to demonstrate an AI-powered navigation system that helps women choose safer routes when traveling at night. This is not a marketing site or final product, but a functional demonstration meant to convince judges and showcase the core safety analysis logic within3-5 minutes.
\n### 1.3 Core Purpose
- Demonstrate how SafeRoute helps women choose safer routes at night using AI-powered safety analysis\n- Visually explain the problem → solution → impact flow
- Prove that the core logic works
- Show product thinking and protective design philosophy

## 2. Target Users\n
### 2.1 Primary Users
- Women traveling after sunset in urban and semi-urban areas
- Users concerned about isolation, poor lighting, empty streets, and delayed help
\n### 2.2 Secondary Viewers
- Hackathon judges, mentors, and tech reviewers
\n## 3. Website Structure

### 3.1 Page Type
Single-page scrollable website with clear sections\n
### 3.2 Section Layout (Top to Bottom)
\n#### 3.2.1 Top Bar (Sticky Header)
- Left side: SafeRoute logo text with optional small shield or location icon
- Right side: 'Try Demo' button and 'SOS' button (hidden until route is selected)
\n#### 3.2.2 Hero Section\n- Large heading: 'Travel Safer at Night'
- Subheading: 'AI-powered route guidance designed with women's safety first.'
- CTA button: 'Start Safe Navigation' (teal color, rounded corners, scrolls to Map section on click)
- Supporting line: 'Not the fastest route. The safest one.'\n- Centered content on dark background

#### 3.2.3 Route Selection & Map Section (Core Feature)
**Left Panel - Route Input:**
- Start Location input field (placeholder: 'Your current location', auto-filled mock value)
- Destination input field (placeholder: 'Enter destination')
- Time Selector (default: current time, label: 'Travel Time')
- 'Find Safe Routes' button (teal color, primary action)
\n**Right Panel - Map View:**
- Google Map embed showing 2-3 routes:\n  - Green route: Safer route
  - Yellow route: Medium risk
  - Grey route: Fastest but unsafe
- Each route displays: estimated time, distance, Safety/Confidence Index (0-100)
- Markers highlighting unsafe segments subtly
\n#### 3.2.4 Safety Analysis Panel\n- Heading: 'Why this route is safer'
- Natural language explanation in calm tone
- Example text: 'This route maintains higher foot traffic after 9 PM, avoids poorly lit streets, and passes open commercial zones. Community feedback indicates higher perceived safety in this area during night hours.'
- Small Gemini icon with label: 'Powered by Gemini AI'
- Positioned below map or as collapsible side panel
\n#### 3.2.5 Route Comparison Section
- Card-based comparison layout
- Each card contains: route name, time, distance, Confidence Index,'Select Route' button
- Cards ordered by: Safest, Balanced, Fastest
- Selecting a route highlights it on map

#### 3.2.6 SOS Emergency Section
- Floating red button (visible only after route selection)
- Label: 'SOS'
- On click: Modal opens showing'Emergency Alert Triggered' with live location, selected route, and mock trusted contacts notification
- Reassuring message: 'Help has been notified. Stay where you are. We're with you.'

#### 3.2.7 Community Safety Feedback Section
- Two simple buttons: 'Mark Area Safe' and 'Report Unsafe Area'
- Opens small form for anonymous submission (no login required for demo)
- Note: 'Reports are anonymous and weighted by recency.'

#### 3.2.8 Footer (Minimal)
- Project name\n- Hackathon name\n- 'Prototype for demonstration only'\n- Team name
\n### 3.3 Optional Demo Mode Toggle
- Small toggle: 'Demo Mode: ON'\n- When enabled: pre-filled locations, fast response, mock data\n\n## 4. Design Style

### 4.1 Design Theme
'Calm Night Safety' - inspired by night city lights, police dashboard interfaces, emergency systems, and Google Material calmness

### 4.2 Emotional Tone
Reassuring, non-alarming, protective, empowering, serious, trustworthy, calm, purpose-driven

### 4.3 Color Palette\n- Primary colors: Deep Navy Blue (#0B1C2D), Midnight Blue (#12263A)\n- Secondary colors: Soft Teal/Cyan (#2EC4B6) for safe indicators, Muted Yellow (#F4D35E) for caution
- Accent color: Red (#E63946) used only for SOS button
- Background: Dark gradient (navy to black, avoiding pure black for softness)

### 4.4 Typography
- Font family: Inter, Poppins, or Roboto (sans-serif, clean, modern)
- Headings: Semi-bold\n- Body text: Regular
- Prioritize readability over style
\n### 4.5 Visual Details
- Rounded corners on buttons
- Smooth transitions between sections
- Responsive button feedback
- Text readable in low brightness
- Minimal animations, no flashy effects
- Sticky top bar\n- Floating SOS button

### 4.6 Layout Approach
- Single-page scrollable layout
- Split-screen design for map section (left controls, right map)
- Card-based comparison layout
- Centered hero content
- Clear visual hierarchy with no distractions

## 5. UX Principles

### 5.1 Core Rules
- No page reloads
- Smooth transitions
- Responsive button interactions
- Text readable in low brightness (night-use product)
- Avoid long paragraphs
- Every element must answer: 'Does this help a woman feel safer while traveling at night?'

### 5.2 Exclusions
- No ads, sign-up walls, fake statistics, exaggerated AI claims
- No 'crime prediction' wording (use 'risk context', 'safety indicators', 'community feedback' instead)
- No flashy animations or unnecessary pages
- No red panic colors by default (red only for SOS)

## 6. Technical Notes

### 6.1 Map Integration
- Google Map embed with route visualization
- Dynamic route highlighting based on safety analysis
- Interactive route selection\n
### 6.2 AI Integration
- Gemini AI powers safety analysis
- Natural language explanations of route safety factors
- Confidence Index calculation (0-100 scale)

### 6.3 Emergency Features
- SOS button triggers mock emergency alert
- Displays live location and selected route
- Simulates trusted contact notification
\n### 6.4 Community Features
- Anonymous safety feedback submission
- Area marking system (safe/unsafe)
- Recency-weighted reporting
\n## 7. Design Philosophy

The website should feel like 'a quiet, reliable companion walking beside you at night' - not a flashy startup or panic app, but a calm guardian that is serious, trustworthy, protective, minimal, and purpose-driven.