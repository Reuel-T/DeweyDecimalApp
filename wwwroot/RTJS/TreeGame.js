console.log("Tree Game Script Loaded");

// Tooltips Initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

let baseURL;

//correct objects -> used for debugging
let answerPath = Array();

//objects for each level
let level1;
let level2;
let level3;

//cards for game
let level1Cards = Array();
let level2Cards = Array();
let level3Cards = Array();

//level flag
let passed = false

//streak of correct answers the user is on
let streak = 0;

//user score
let score = 0;

//amount of seconds that a round lasts
let game_time = 30;

//timer value
let time_left = 0;

//timer interval
var game_timer;

//sets the base url of the app
function setBaseURL(URLin) {
    baseURL = URLin;
    console.log(URLin);
}

function hideStuff()
{
    $("#info").hide();
    $("#game_container").hide();

}

function kill()
{
    time_left = 10;
}

function pass()
{
    passed = true;
    end_game();
}

function fail()
{
    passed = false;
    end_game();
}

async function start_game() {
    console.log("START GAME");

    //info spans
    $("#score_info span").text(score);
    $("#streak_info span").text(streak);

    $("#instructions").hide();
    $("#info").fadeIn();

    $("#game_over_fail").hide();
    $("#game_over_success").hide();

    $("#game_container").fadeIn();

    remove_cards();
    level1 = [];
    level2 = [];
    level3 = [];
    answerPath = [];

    passed = false;


    //request url for call num pairs
    let url = `${baseURL}/FindingCallNumbers/GetLevel`;

    await fetch(url)
        .then(function (response) {
            // response.json() returns a promise, use the same .then syntax to work with the results
            response.json().then(function (resobj) {
                console.log(resobj);
                console.log(resobj.answerPath);

                //answers for external use
                answerPath = resobj.answerPath;

                //dewey objects
                level1 = resobj.level1Options;
                level2 = resobj.level2Options;
                level3 = resobj.level3Options;

                printLevels();
                create_cards();
            });//response json. then
        })//fn response
        .catch(err => console.error(err));
}

function printLevels()
{
    console.log("ANSWERS");

    answerPath.forEach((x) => {
        console.log(`${x.number} == ${x.description}`);
    })
}

function create_cards()
{
    level1Cards = [];
    level2Cards = [];
    level3Cards = [];

    //cards for level 1
    for (let i = 0; i < level1.length; i++) {
        let oCard = document.createElement("div");
        oCard.id = 'l1option';
        oCard.classList.add("card");

        let oHeader = document.createElement("h3");
        oHeader.innerText = level1[i].number;
        oHeader.classList.add("biggun");
        oHeader.classList.add("tac");

        let oText = document.createElement("h5");
        oText.innerText = level1[i].description;
        oText.classList.add("tac");

        oCard.VALUE = level1[i].correct;
        oCard.LEVEL = 1;

        oCard.appendChild(oHeader);
        oCard.appendChild(oText);

        oCard.onclick = function () { check_card(oCard) }
        level1Cards.push(oCard);
    }

    //cards for level 2
    for (var i = 0; i < level2.length; i++) {
        let oCard = document.createElement("div");
        oCard.id = 'l2option';
        oCard.classList.add("card");

        let oHeader = document.createElement("h3");
        oHeader.innerText = level2[i].number;
        oHeader.classList.add("biggun");
        oHeader.classList.add("tac");

        let oText = document.createElement("h5");
        oText.innerText = level2[i].description;
        oText.classList.add("tac");


        oCard.VALUE = level2[i].correct;
        oCard.LEVEL = 2;

        oCard.appendChild(oHeader);
        oCard.appendChild(oText);

        oCard.onclick = function () { check_card(oCard) }
        level2Cards.push(oCard);
    }

    //cards for level 3
    for (var i = 0; i < level3.length; i++) {
        let oCard = document.createElement("div");
        oCard.id = 'l2option';
        oCard.classList.add("card");

        let oHeader = document.createElement("h1");
        oHeader.innerText = level3[i].number;
        oHeader.classList.add("biggun");
        oHeader.classList.add("tac");

        oCard.VALUE = level3[i].correct;
        oCard.LEVEL = 3;

        oCard.appendChild(oHeader);

        oCard.onclick = function () { check_card(oCard) }
        level3Cards.push(oCard);
    }

    add_cards();
}

function add_cards() {

    //display correct option to user
    ans = document.getElementById("Answer");
    ans.innerText = answerPath[2].description;

    //get each row div
    div1 = document.getElementById('l1Row');
    div2 = document.getElementById('l2Row');
    div3 = document.getElementById('l3Row');

    //add the cards to each row
    level1Cards.forEach((card) => { div1.appendChild(card) });
    level2Cards.forEach((card) => { div2.appendChild(card) });
    level3Cards.forEach((card) => { div3.appendChild(card) });

    //show the first row
    $("#l1Row").show();
    //hide the second and third rows
    $("#l2Row").hide();
    $("#l3Row").hide();

    start_timer();
}

function check_card(card)
{
    console.log();
    //if a correct card
    if (card.VALUE)
    {
        switch (card.LEVEL)
        {
            case 1: { $("#l2Row").show(); $("#l1Row").hide(); } break;  
            case 2: { $("#l3Row").show(); $("#l2Row").hide(); } break;
            case 3: { passed = true; end_game(); } break;
            default:
        }
    }
    else //else incorrect
    {
        passed = false;
        end_game();
    }
}

//removes cards from stage
function remove_cards()
{
    let l1cards = [...document.getElementById('l1Row').children];
    l1cards.forEach((card) => { card.remove() })

    let l2cards = [...document.getElementById('l2Row').children];
    l2cards.forEach((card) => { card.remove() })

    let l3cards = [...document.getElementById('l3Row').children];
    l3cards.forEach((card) => { card.remove() })
}

function end_game()
{
    if (passed)
    {
        console.log("level passed");

        clearInterval(game_timer);

        streak++;

        score += ((time_left * 100) * (streak));

        if (game_time > 10) {
            game_time -= 5;
        }
        if (game_time <= 5) {
            game_time = 5;
        }

        //form spans
        $("#streak_go_pass span").text(streak);
        $("#score_go_pass span").text(score);

        //info spans
        $("#score_info span").text(score);
        $("#streak_info span").text(streak);



        //set form value
        $("#frm_score").attr('value', score);

        //show pass screen
        $("#game_over_success").fadeIn();

        if (score < 1) {
            $("#score_submit").hide();
        }
        else {
            $("#score_submit").show();
        }

        remove_cards();
    }
    else
    {
        console.log("level failed");
        clearInterval(game_timer)
        remove_cards();

        $("#frm_score_fail").attr('value', score);

        $("#start_game_button").fadeIn();
        $("#game_over_fail").fadeIn();
        //$("#game_stage").addClass("game_over");

        if (score < 1) {
            $("#score_submit_fail").hide();
        }
        else {
            $("#score_submit_fail").show();
        }

        //form spans
        $("#streak_go_fail span").text(streak);
        $("#score_go_fail span").text(score);

        //info spans
        $("#score_info span").text(score);
        $("#streak_info span").text(streak);

        //reset score, streak and game time in case retry
        score = 0;
        streak = 0;
        game_time = 30;



        console.log("awaiting input");
    }
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
            clearInterval(game_time);
            passed = false;
            end_game();
        }
    }, 1000);
}