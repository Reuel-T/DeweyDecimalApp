let callNumPairs = Array();

//array of question divs
let arrayQuestions = Array();

//array of answer divs
let arrayAnswers = Array();

//array of selected cards
let selectedCards = Array();

let matches = 0;

let round = 1;

//sets the base url of the app
function setBaseURL(URLin) {
    baseURL = URLin;
    console.log(URLin);
}

async function load_books()
{
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

        add_cards();
    } 
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

    //checks if the user can click on the card
    if (card.CLICKABLE === true)
    {
        card.CLICKABLE = false;
        console.log(arrayQuestions.length);
        card.firstChild.classList.toggle('biggun');

        if (selectedCards.length === 0) {
            selectedCards.push(card);

            return;
        }

        if (selectedCards.length === 1) {
            selectedCards.push(card);

            if (selectedCards[0].KEY === selectedCards[1].KEY) {
                //alert('match');
                selectedCards[0].remove();
                selectedCards[1].remove();

                selectedCards[0].firstChild.classList.toggle('biggun');
                selectedCards[1].firstChild.classList.toggle('biggun');

                matches++;
                console.log(matches);

                if (matches === arrayQuestions.length) {

                    //holy crap spread operators are cool when you know how they work
                    //https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
                    let answerCards = [...document.getElementById("AnswerRow").children];

                    answerCards.forEach((card) => { card.remove() })

                    round++;
                }
            }
            else {
                selectedCards[0].firstChild.classList.toggle('biggun');
                selectedCards[1].firstChild.classList.toggle('biggun');

                selectedCards[0].CLICKABLE = true;
                selectedCards[1].CLICKABLE = true;

                //alert('no match');
            }

            selectedCards = Array();
            return;
        }
    }

    
}