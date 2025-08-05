# Julink

![Deploy to Pages](https://github.com/eoyoa/Julink/actions/workflows/main.yaml/badge.svg)

A word game where your actions have consequences.

## Rules

See [RULES.md](./RULES.md)

## Dependencies

### Frontend

- TypeScript
- React
- Vite
- Material UI

#### Testing

- Vitest
- Testing Library
- jsdom

### Backend

- TypeScript
- esbuild

### Infrastructure

- AWS
- OpenTofu
- Spacelift

## To-do

- [X] Make hard mode
- [ ] Make normal mode
  - [ ] Add guess text field to normal mode
  - [X] Add Monty Hall problem-like hints
- [ ] Add serverless function for validation
  - *Partially done.*
  - [X] Make random daily words
- [ ] Add testing