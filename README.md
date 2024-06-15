# Julink

A word game where your actions have consequences.

## TODO

- [ ] Make hard mode
  - [ ] Add goal word to game
  - [ ] Abstract out game portion to different subcomponent of game
  - [ ] Verify word through reducer
- [ ] Make normal mode
  - [ ] Hide goal word in normal mode
  - [ ] Add guess text field to normal mode
  - [ ] Add Monty Hall problem-like hints
    - Basically, if your action causes one of the 2-3 letters you mutated to become right, then inform the user of 1 wrong letter
    - It differs from the Monty Hall problem in that the letter directly mutated can also be shown to be wrong.
    - Also, unlike the Monty Hall problem, multiple letters can be right.
    - This is an issue in the case where only 2 letters are mutated, which basically gives the answer away immediately.
      - This could be fixed by just making the left/right letters mutate the other end.
    - Or, if all are right, then there's no wrong letter to point to.
      - A solution could be to just let the user know that they're all right, then set them as immutable.
      - Then, the wrapping mutation fix mentioned above would have to either be changed or not done.
- [ ] Add project dependencies and local development information to `README.md`