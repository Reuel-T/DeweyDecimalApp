# DeweyDecimalApp
PROG Y3 S2 POE. MVC Web app with minigames used to demonstrate knowledge of Data Structures

## Custom Data structures used:
- Tree
- Linked List

# Running the app

## Home Page

![image](https://user-images.githubusercontent.com/69512501/162480088-de4d5c9a-f58c-4cc3-8df6-2be40a3fc404.png)

This allows the user to select a game or view the high scores for each game.

## Replacing Books

![image](https://user-images.githubusercontent.com/69512501/162480313-67117ab2-bcce-4249-8d38-d81bf478170b.png)

Use your mouse to rearrange the books before the timer runs out. You earn points for how quickly you arrange the books.

Points for a round are calculated as follows:

```js 
Round_Score = ((Time_Left * 100) * Current_Streak)
```

Minigame code adapted from [here](https://sixthformstudyskills.ncl.ac.uk/libraries/game-dewey-decimal/#hidden_nav_top)

## Identifying Areas

![image](https://user-images.githubusercontent.com/69512501/162480960-c8521ea4-a418-48c1-9c76-8035489c9a92.png)

Click on a card in one column and then on a related card in the other. Matching the correct cards removes them from the round. The round ends once all cards in the left column have been removed or if the time runs out. You earn points for how quickly you remove all the cards and the number of points you earn increases with every level. However, the amount of time for each round decreases as you progress.

Points for a round are calculated as follows:

```js 
Round_Score = ((Time_Left * 100) * Current_Streak)
```

### Dev stuff

This minigame has some "cheats" that you can access by using your browser console

```js
kill()
```
Sets the remaining time to 10 seconds

```js
pass()
```
Instantly passes the level

```js
fail()
```
Instantly fails the level

## Finding Call Numbers

![image](https://user-images.githubusercontent.com/69512501/162482055-99b4405a-b129-4e1d-b96e-d96f811a6d4a.png)

You will be shown a topic and 4 cards. Select the card that best matches the topic. Once you select a wrong card, the run ends. You earn points for how quickly you progress through a level as well as how many levels you pass in a row. The amount of time you have will decrease as you progress though.

![image](https://user-images.githubusercontent.com/69512501/162482196-975e2777-89f4-4bd5-983f-84f6b9c85108.png)

On the last round for a level, you will only be shown call numbers of the selected topic. You have to select a call number that matches the selected topic.

Points for a round are calculated as follows:

```js 
Round_Score = ((Time_Left * 100) * Current_Streak)
```

### Dev stuff

This minigame has some "cheats" that you can access by using your browser console

```js
kill()
```
Sets the remaining time to 10 seconds

```js
pass()
```
Instantly passes the level

```js
fail()
```
Instantly fails the level

