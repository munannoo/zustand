# Tic-Tac-Toe with Zustand

A simple tic-tac-toe game built to learn Zustand state management in React.

## What I Learned

- **Zustand basics**: Creating stores with `create()`
- **State management**: Moving from `useState` to global state
- **Actions**: Creating functions that update state
- **Store organization**: Keeping game logic in the store, UI logic in components
- **Best practices**:
  - Thin components, fat stores
  - Single actions for complex operations (`makeMove`)
  - Proper state immutability

## Features

- ✅ Classic 3x3 tic-tac-toe gameplay
- ✅ Win detection (rows, columns, diagonals)
- ✅ Draw/tie detection
- ✅ Game reset functionality
- ✅ All game logic managed by Zustand store

## Project Structure

```
src/
├── components/
│   └── tictactoe.jsx        # UI component (presentational)
└── store/
    └── tictactoe-store.js   # Zustand store (game logic)
```

## Run the Project

```bash
npm install
npm run dev
```
