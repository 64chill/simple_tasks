Task Requirements
--
Create a method of examining a Social Network. You are given dataset (data.json) representing a group of people, in the form of a social graph. Each person listed has one or more connections to the group.

Use dataset provided and develop a Web app or an API, which provides functionality to choose a person within the group stored in the database and display the following information about this person:

- **Direct friends**: those people who are directly connected to the chosen user;
- **Friends of friends**: those who are two steps away from the chosen user but not directly connected to the chosen user;
- **Suggested friends**: people in the group who know 2 or more direct friends of the chosen user but are not directly connected to the chosen user;

How to run the app locally?
--
1. Install Node on your local machine
2. Open the root app folder in terminal
3. run `npm install` to install node modules
4. run `npm start` to start the app

How to test the app?
--
You can test the REST API routes via some tool such as Postman or via some browser.
To do so the API routes are the following:
1. localhost:5000/direct-friends?user=_USER_ID_INPUT_ 
2. localhost:5000/friends-of-friends?user=_USER_ID_INPUT_
3. localhost:5000/suggested-friends?user=_USER_ID_INPUT_
Where the USER_ID_INPUT is the number between 1 and 20, since these are userIDs found in the data.json file