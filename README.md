# Trivia Game

A fun browser-based trivia game where two teams take turns answering questions for points!

## Features

- **Two-team gameplay**: Teams take turns answering questions
- **Point system**: 
  - Easy questions: 100 points
  - Medium questions: 300 points
  - Hard questions: 500 points
- **Custom UI**: Built with React and Chakra UI
- **Progress tracking**: Visual progress bar and scoreboard
- **Custom modals**: No browser alerts - all interactions are in-site
- **Beautiful design**: Modern UI with Readex Pro font

## How to Play

1. Enter custom names for both teams
2. Select exactly 6 categories to include in the game
3. Click "Start Game" to begin
4. Teams take turns clicking "Get Question"
5. Answer the question in the modal
6. Correct answers earn points based on difficulty
7. Game ends after 10 questions
8. Team with the most points wins!

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

- Teams can enter custom names at the start
- Players must select exactly 6 categories from 32 available options
- Each team gets a turn to answer a question
- Questions are randomly selected from chosen categories
- Points are awarded based on question difficulty
- Teams can skip questions if needed
- Game automatically tracks progress and scores
- No duplicate questions in a single game

## Technologies Used

- React 18
- Chakra UI for components
- Custom CSS with Readex Pro font
- Responsive design for all screen sizes

## Project Structure

```
src/
├── components/
│   ├── GameModal.js         # Question modal component
│   ├── ScoreBoard.js        # Score display component
│   ├── TeamSetup.js         # Team name input component
│   └── CategorySelection.js # Category selection component
├── data/
│   ├── questions.js         # Trivia questions database
│   └── categories.js        # Categories configuration
├── App.js                  # Main game logic
└── index.js                # App entry point
```

Enjoy playing the trivia game! 