# MVHS Soccer Tracker Web App

## An app allowing for ease-of-use tracking for the MVHS Girls Varsity team of 2023-2024

### DISCLAIMER: this app's proportions are only optimized to iPad Air's (since that was the device I used for tracking)

#### ...meaning that you will not be able to use most of the features on your phone or your computer without toggling settings :(

To view on the computer:

1. Right-click
2. Click "Inspect"
3. Click the button in the top right with the computer / phone
4. Select Ipad Air as the dimensions
5. Now your screen should auto-adjust zoom to fit the proportions of an iPad Air, and you'll be able to use the app!

## Completed Features

- Goal-scorer and assist selection
- Automatic file naming based on the game / team played that day
- Line-up selection
- Subs
- Pause and Unpause
  - For half-time, injuries, etc
- GK Save
  - automatic logging on click; knows who goalie is based on players subbed in
- Important actions from the opposing team
  - Like fouls against us, goals, or successful offside traps

## In-Progress Features

- Most recent actions dashboard (only sporadically updating)
  - Will looking into [localStorage hooks](https://usehooks.com/uselocalstorage)
- JV Button (only Varsity data inputted right now)
- Scaling (to auto-adjust to other device)

## Data Save Format

### JSON file that consists of a dictionary of dictionaries, of the format:

{
time: {
"Event": event,
"Description": description
}
}

### Description of each variable:

- time: String: universal standard time of an event
- event: String: the title event that passed, such as "Sub-in", "Goal", etc
- description: String, Array, or null: if an event requires a description (e.g. a goal requires a description of who scored), that is include; else, it's null

### Example of (partial) JSON:

{
"1703796712380": {
"Event": "First Half Line up",
"Description": [
"Scar W - 1",
"Juno - 16"
]
},
"1703796737829": {
"Event": "Start match",
"Description": null
}
}

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`
