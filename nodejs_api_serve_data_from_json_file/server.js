const express = require('express')
const app = express()
const fs = require('fs');
const PORT = 5000;
// github.com/64chill
/*
To test API use browser or a tool such as POSTMAN
routes:
    localhost:5000/direct-friends?user=USER_ID_INPUT
         those people who are directly connected to the chosen user;

    localhost:5000/friends-of-friends?user=USER_ID_INPUT
         those who are two steps away from the chosen user but not directly
         connected to the chosen user;

    localhost:5000/suggested-friends?user=USER_ID_INPUT
        people in the group who know 2 or more direct friends of the chosen
        user but are not directly connected to the chosen user;
*/

function getUserDetails(element){
    let returnList = []
         DATA.forEach((elem)=>{
            if(element.indexOf(elem.id) >= 0){
              returnList.push({
                "id"        : elem.id,
                "firstName" : elem.firstName,
                "surname"   : elem.surname,
                "age"       : elem.age,
                "gender"    : elem.gender
              })
            }
          })
          return returnList
}

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// startinng server to listen on a port
app.listen(PORT, () => {console.log(`SERVER is running on ${PORT} port`)})
//load data from data.json
const rawdata = fs.readFileSync('data.json');
const DATA = JSON.parse(rawdata);

//create GET routes
app.use('/direct-friends', (req, res)=>{
    const inpt = req.query.user // we grab the input param
    if(inpt == undefined){res.status(400).send("Please specify the user!");return;}
    
    DATA.forEach(element=>{
        if(element.id == inpt ){
            let rList = getUserDetails(element.friends);
            res.status(200).send(rList);
        }
      })
})

app.use('/friends-of-friends', (req, res)=>{
    const inpt = req.query.user
    if(inpt == undefined){res.status(400).send("Please specify the user!");return;}
    chosen_user_friends = DATA[inpt-1].friends
    let friends_of_friends_list = []
    DATA.forEach(e=>{
        if (chosen_user_friends.indexOf(e.id) >= 0){
            friends_of_friends_list.push.apply(friends_of_friends_list, e.friends)
        }
    })
    // get unique values
    uniq_fofl = [...new Set(friends_of_friends_list)];
    // get only friends that are not friends with chosen user
    let differenceList = uniq_fofl.filter(x => !chosen_user_friends.includes(x) && x!=inpt);
    let rList = getUserDetails(differenceList);
    res.status(200).send(rList);
})

app.use('/suggested-friends', (req, res)=>{
    const inpt = req.query.user
    if(inpt == undefined){res.status(400).send("Please specify the user!");return;}
    chosen_user_friends = DATA[inpt-1].friends
    let friends_of_friends_list = []
    DATA.forEach(e=>{
        if (chosen_user_friends.indexOf(e.id) >= 0){
            friends_of_friends_list.push.apply(friends_of_friends_list, e.friends)
        }
    })
    // get only friends that are not friends with chosen user
    let differenceList = friends_of_friends_list.filter(x => !chosen_user_friends.includes(x) && x!=inpt);
    //find numbers that appear at least 2 times in our array (then at least 2 people know 1 person)
    differenceList.sort();
    let count = 0;
    let currentElem = null;
    lastFriendIdList = []
    for (let i = 0; i < differenceList.length; i++) {
        if(currentElem != differenceList[i]){count = 0}
        if(count == 0){currentElem = differenceList[i]}
        count++;
        if(count == 2){lastFriendIdList.push(differenceList[i])}
    }
    let rList = getUserDetails(lastFriendIdList)
    res.status(200).send(rList)
})