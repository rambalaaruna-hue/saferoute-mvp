# SafeRoute - Travel Safer at Night

## Project Overview

SafeRoute is a hackathon prototype website designed to demonstrate an AI-powered navigation system that helps women choose safer routes when traveling at night. This is a functional demonstration meant to showcase the core safety analysis logic and protective design philosophy.

### Core Features

- **AI-Powered Route Analysis**: Demonstrates how AI evaluates route safety based on multiple factors
- **Route Comparison**: Compare three route options (Safest, Balanced, Fastest) with safety scores
- **Safety Analysis Panel**: Natural language explanations powered by Gemini AI
- **SOS Emergency System**: Quick access to emergency alerts with location sharing
- **Community Feedback**: Anonymous safety reporting system
- **Calm Night Safety Design**: Reassuring, non-alarming interface optimized for night use

### Design Philosophy

The website embodies a "Calm Night Safety" theme - designed to feel like a quiet, reliable companion walking beside you at night. It's serious, trustworthy, protective, minimal, and purpose-driven.

**Color Palette:**
- Deep Navy Blue (#0B1C2D) - Primary background
- Midnight Blue (#12263A) - Secondary elements
- Soft Teal/Cyan (#2EC4B6) - Safe route indicators
- Muted Yellow (#F4D35E) - Caution indicators
- Red (#E63946) - SOS button only

## Project Info

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

Vite, TypeScript, React, shadcn/ui, Tailwind CSS

## How to Use SafeRoute

### Demo Mode

The prototype comes with pre-configured demo data. To experience the full demonstration:

1. **Start the application** (see Development Guidelines below)
2. **Click "Start Safe Navigation"** on the hero section to scroll to the route planner
3. **Enter a destination** in the destination field (start location is pre-filled)
4. **Click "Find Safe Routes"** to generate three route options
5. **Compare routes** by clicking on different route cards to see safety analysis
6. **Try the SOS button** (appears after selecting a route) to see the emergency alert system
7. **Submit feedback** using the Community Safety Feedback section

### Key Interactions

- **Smooth Scrolling**: Click "Try Demo" in the header to jump to the map section
- **Route Selection**: Click any route card to view detailed safety analysis
- **SOS Emergency**: The red SOS button appears after route selection
- **Community Feedback**: Submit anonymous safety reports for areas

## Development Guidelines

### How to edit code locally?

You can choose [VSCode](https://code.visualstudio.com/Download) or any IDE you prefer. The only requirement is to have Node.js and npm installed.

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### After installation, follow these steps:

```
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies: npm i
# Step 5: In the IDE terminal, run the command to start the development server: npm run dev -- --host 127.0.0.1
# Step 6: if step 5 failed, try this command to start the development server: npx vite --host 127.0.0.1
```

### How to develop backend services?

This is a prototype demonstration with mock data. No backend services are required for the demo functionality.

## Important Notes

**This is a hackathon prototype for demonstration purposes only.**

- All route data and safety scores are mock data
- No actual GPS or mapping services are integrated
- No real emergency services are contacted
- Community feedback is not stored or processed
- Designed to demonstrate concept and user experience

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.

---

**© 2025 SafeRoute** - Hackathon Prototype
