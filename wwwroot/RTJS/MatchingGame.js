//array of call number key value pairs
let callNumPairs = Array();

//array of question divs
let arrayQuestions = Array();

//array of answer divs
let arrayAnswers = Array();

//array of selected cards
let selectedCards = Array();

//amount of time (seconds) that a round lasts
let game_time = 60;

//tracks progress in level
let matches = 0;

//internal round counter
let round = 1;

//timer counter value
let time_left = 0;

//number of streaks
let streak = 0;

//interval thingy
var game_timer;

//flag used for score updates
let passed = false;

let score = 0;

function hideStuff() {
    $("#info").hide();
}

//sets the base url of the app
function setBaseURL(URLin) {
    baseURL = URLin;
    console.log(URLin);
}

async function load_books()
{
    $("#instructions").hide();
    $("#info").fadeIn();
    $("#game_over_fail").hide();
    $("#game_over_success").hide();

    console.log("LOAD BOOKS");

    //request url for call num pairs
    let url = `${baseURL}/IdentifyingAreas/GetCallNums`;

    //empty arrays
    callNumPairs = [];
    selectedCards = [];
    arrayQuestions = [];
    arrayAnswers = [];

    matches = 0;

    await fetch(url)
        .then(function (response) {
            // response.json() returns a promise, use the same .then syntax to work with the results
            response.json().then(function (pairs) {
                //pushes the books to the sorted array
                pairs.forEach(function (pair) {
                    callNumPairs.push(pair);
                });//foreach
                console.log("GOT PAIRS");
                console.log(callNumPairs);
                create_cards();
            });//response json. then
        })//fn response
        .catch(err => console.error(err));
}

function create_cards()
{
    //loop through returned pairs
    for (let i = 0; i < callNumPairs.length; i++)
    {
        if (i < 4)
        {
            //https://www.w3schools.com/jsref/met_document_createelement.asp
            //create a new div
            let qCard = document.createElement("div");
            qCard.id = 'qCard';
            qCard.classList.add("card");

            //https://www.w3schools.com/howto/howto_js_add_class.asp
            //create a p with text
            let pText = document.createElement("p");
            pText.id = "text-c";

            //swap depending on round
            if (round % 2 == 0)
            {
                pText.innerText = callNumPairs[i].value;
            }
            else
            {
                pText.innerText = callNumPairs[i].key;
            }

            
            pText.classList.add("card_text");
            //append p to new div
            qCard.appendChild(pText);

            //https://www.w3schools.com/js/js_object_properties.asp
            qCard.KEY = callNumPairs[i].key;
            qCard.CLICKABLE = true;

            //call the match card function whenever the card is clicked
            //https://stackoverflow.com/questions/3316207/add-onclick-event-to-newly-added-element-in-javascript
            qCard.onclick = function () { match_cards(qCard) }

            //save card object for later?
            arrayQuestions.push(qCard);
        }

        //create answer card
        let aCard = document.createElement("div");
        aCard.id = 'aCard';
        aCard.classList.add("card");

        //create answer text
        let pText = document.createElement("p");
        pText.id = "text-c";

        //swap depending on round
        if (round % 2 == 0) {
            pText.innerText = callNumPairs[i].key;
        }
        else {
            pText.innerText = callNumPairs[i].value;
        }

        pText.classList.add("card_text");

        //append text to answer card
        aCard.appendChild(pText);

        aCard.onclick = function () { match_cards(aCard); }

        //https://www.w3schools.com/js/js_object_properties.asp
        aCard.KEY = callNumPairs[i].key;
        aCard.CLICKABLE = true;

        arrayAnswers.push(aCard);
    } 

    add_cards();
}

//add cards to divs
function add_cards() {

    //shuffle cards first
    shuffle(arrayQuestions);
    shuffle(arrayAnswers);

    qDiv = document.getElementById("QuestionRow");
    aDiv = document.getElementById("AnswerRow");

    //append questions and answers to their divs
    arrayQuestions.forEach((card) => { qDiv.appendChild(card) });
    arrayAnswers.forEach((card) => { aDiv.appendChild(card) });

    start_timer();
}


function start_timer()
{
    //set time left to game time
    time_left = game_time;

    //timer interval
    game_timer = setInterval(() => {
        time_left = time_left - 1;
        $("#countdown span").text(time_left);
        if (time_left <= 0) {
            clearInterval(game_timer);
            passed = false;
            end_game();
        }
    }
        , 1000);
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}


function match_cards(card) {
    console.log(arrayQuestions.length);
    console.log(matches);

    //checks if the user can click on the card
    if (card.CLICKABLE === true)
    {
        card.CLICKABLE = false;
        card.classList.toggle('highlighted');
        console.log(arrayQuestions.length);
        card.firstChild.classList.toggle('biggun');
        card.firstChild.classList.toggle('cw');

        //no selected cards
        if (selectedCards.length === 0) {
            selectedCards.push(card);

            return;
        }

        //1 selected card
        if (selectedCards.length === 1) {
            selectedCards.push(card);

            //if cards match
            if (selectedCards[0].KEY === selectedCards[1].KEY) {
                //alert('match');
                selectedCards[0].remove();
                selectedCards[1].remove();

                selectedCards[0].firstChild.classList.toggle('biggun');
                selectedCards[1].firstChild.classList.toggle('biggun');
                selectedCards[0].firstChild.classList.toggle('cw');
                selectedCards[1].firstChild.classList.toggle('cw');
                

                matches++;
                console.log(matches);
                //round win
                if (matches === arrayQuestions.length) {

                    //holy crap spread operators are cool when you know how they work
                    //https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
                    let answerCards = [...document.getElementById("AnswerRow").children];

                    answerCards.forEach((card) => { card.remove() })

                    round++;
                    passed = true;
                    end_game();
                    return;
                }
            }
            else
            {
                selectedCards[0].classList.toggle('highlighted');
                selectedCards[1].classList.toggle('highlighted');

                selectedCards[0].firstChild.classList.toggle('biggun');
                selectedCards[1].firstChild.classList.toggle('biggun');

                selectedCards[0].firstChild.classList.toggle('cw');
                selectedCards[1].firstChild.classList.toggle('cw');

                selectedCards[0].CLICKABLE = true;
                selectedCards[1].CLICKABLE = true;

                //alert('no match');
            }

            selectedCards = Array();
            return;
        }
    }    
}

function end_game() {
    console.log('Game Ended');

    //show level passed screen
    if (passed === true)
    {
        console.log('level passed');
        //stop the timer
        clearInterval(game_timer);

        streak++;

        score += ((time_left * 100) * (streak));

        if (game_time > 15) {
            game_time -= 5;
        }
        if (game_time <= 15) {
            game_time = 15
        }

        $("#streak").show();

        $("#score").show();

        $("#streak span").text(streak);
        $("#score span").text(score);
        $("#frm_score").attr('value', score);

        $("#start_game_button").fadeIn();
        $("#game_over_success").fadeIn();


    } else
    //show level failed screen
    {
        console.log('level failed');

        let answerCards = [...document.getElementById("AnswerRow").children];
        answerCards.forEach((card) => { card.remove() });

        let questionCards = [...document.getElementById("QuestionRow").children];
        questionCards.forEach((card) => { card.remove() });

        $("#start_game_button").fadeIn();
        $("#game_over_fail").fadeIn();
        //$("#game_stage").addClass("game_over");

        if (score < 1) {
            $("#score_submit").hide();
        }
        else {
            $("#score_submit").show();
        }
        streak = 0;
        game_time = 45;
    }
}

