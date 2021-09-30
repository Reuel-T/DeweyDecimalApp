console.log("JS LOADED");

//https://sixthformstudyskills.ncl.ac.uk/libraries/game-dewey-decimal/#hidden_nav_top
//Game code adapted from here

//BASE URL FOR MAKING HTTP REQUESTS - Reduces unnecessary Page Loads
let baseURL;

//sorted array  get requests made to MVC server
let sortedArray = Array();

//amount of time (seconds) that a round lasts
let game_time = 45;

//value used to check if this is the first play
let first_play = true;

//score
let score = 0;

//level counter
let level = 0;

//flag used for score updates
let passed = false;

//tracks streak of passed levels
let streak = 0;

//https://sixthformstudyskills.ncl.ac.uk/libraries/game-dewey-decimal/#hidden_nav_top
//remove html entities in the string
function cleanString(stringIn)
{   
    return stringIn.replaceAll('&quot', '"');
}

//sets the base url of the app
function setBaseURL(URLin)
{
    baseURL = URLin;
    console.log(URLin);
}

function hideStuff() {
    $("#info").hide();
    $("#dewey_decimal_game_container").hide();
}


//https://stackoverflow.com/questions/37663674/using-fetch-api-to-access-json
//gets the books from server, then inits the stage area
async function start_game()
{
    $("#instructions").hide();

    $("#info").fadeIn();
    $("#dewey_decimal_game_container").show();

    let url = `${baseURL}/home/GenerateCallNos`;
    //let response = await fetch(url);
    //clear the array before getting new stuff
    sortedArray = []

    await fetch(url)
        .then(function (response) {
            // response.json() returns a promise, use the same .then syntax to work with the results
            response.json().then(function (books) {
                //pushes the books to the sorted array
                books.forEach(function (book) {
                    sortedArray.push(book);
                });//foreach
                console.log("GOT BOOKS");
                console.log(sortedArray);
                //once we have our sorted array, set the stage and start the game
                init_stage(false);                
            });//response json. then
        })//fn response
        .catch(err => console.error(err));
}

//https://www.tutorialrepublic.com/faq/how-to-display-all-items-in-array-using-loop-in-jquery.php
//display the books in the two arrays
function displayBooks(json)
{
    $(document).ready(function () {
        $("#_booklist").empty();
        $("#_shuffle").empty();
        console.log(json);
        $.each(json, function (index, value) {
            $("#_booklist").append(value + '<br>');
        });

        $.each(shuffle(json), function (index, value) {
            $("#_shuffle").append(value + '<br>');
        });
    });
}


//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//shuffles the array
function shuffle(array) {

    sArray = array;

    let currentIndex = sArray.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [sArray[currentIndex], sArray[randomIndex]] = [sArray[randomIndex], sArray[currentIndex]];
    }

    return sArray;
}

async function init_stage(autoplay)
{
    if (passed == false) {
        score = 0;
    }

    //clear the stage before game start
    $("#dewey_decimal_game_stage").empty();
    $("#game_over_success").fadeOut();
    $("#game_over_fail").fadeOut();
    $("#dewey_decimal_game_stage").removeClass("game_over");
    $("#start_game_button").fadeOut();

    console.log("Sorted Array");
    console.log(sortedArray);

    //set the correct order to the sorted array
    let correctOrder = Array();
    //set the current order to shuffled array
    let currentOrder = Array();

    let newArr = [...sortedArray];
    console.log("New Array");
    console.log(newArr);

    correctOrder = [...sortedArray];
    currentOrder = shuffle(newArr);

    console.log("CO");
    console.log(correctOrder);

    console.log("SL");
    console.log(currentOrder);

    //compares the current order to the correct order
    function orderCorrect()
    {
        console.log("correct");
        console.log(correctOrder);
        console.log("current");
        console.log(currentOrder);

        if (currentOrder.join(",") == correctOrder.join(","))
        {
            console.log(true);
            return true;
        }
        else
        {
            console.log(false);
            return false;
        }
    }

    //if the order is correct before the game starts, shuffle again
    while (orderCorrect()) {
        shuffle(currentOrder);
    }

    //when the view is ready, 
    $(document).ready(() =>
    {
        console.log("document ready");
        $("#countdown_span").text(game_time);

        var colours = Array("red1", "blue1", "green1", "orange1", "black1");

        //create list items within the game area
        for (var i = 0; i < currentOrder.length; i++) {

            $("#dewey_decimal_game_stage")
                .append("" +
                "<li><div class=\"book " + colours[Math.floor(Math.random() * colours.length)] + "\">" +
                    "<div class=\"spine_text\"><strong>" + "TITLE" + "</strong><br /><em>" + "AUTHOR" + "</em></div>" +
                    "<div class=\"spine_shelfmark\">" + currentOrder[i] + "</div>" +
                    "</div></li>" +
            "");
        }

        //wrap the list items within a ul
        $("#dewey_decimal_game_stage").wrapInner("<ul></ul>");

        $("#dewey_decimal_game_stage").append("<div class=\"clear_fix\"></div>");

        //disable text selection in the following elements
        //$(function()
        //{
        $("#dewey_decimal_game_stage ul,#countdown, #score").disableSelection();
        //});


        //enable the drag and drop feature on the game stage ul
        $("#dewey_decimal_game_stage ul").sortable({
            placeholder: "book_placeholder",
            //what happens when the ul is updated
            update: function () {

                currentOrder = []; // clear current order

                //push the Dewey decimal text to the current order array
                $(".book").each(function () {
                    currentOrder.push($(".spine_shelfmark", this).text());
                });

                //if the order is correct, the game is won 
                if (orderCorrect()) {
                    //stop the timer
                    clearInterval(counter);

                    //reset the UI
                    passed = true;
                    $("#start_game_button").fadeIn();
                    $("#dewey_decimal_game_stage ul").sortable({ disabled: true });
                    $("#game_over_success").fadeIn();
                    $("#dewey_decimal_game_stage").addClass("game_over");
                    $("#start_game_button").fadeIn();

                    streak++;

                    score += ((count * 100) * (streak));

                    if (game_time > 15)
                    {
                        game_time-=5;
                    }
                    $("#streak").show();

                    $("#score").show();

                    $("#streak span").text(streak);
                    $("#score span").text(score);
                    $("#frm_score").attr('value', score);
                }
            }
        });// sortable ul

        $("#score span").text(score);

        // begin timer
        var count = game_time;

        //runs the timer function every second
        counter = setInterval(timer, 1000);

        function timer() {
            count = count - 1;
            //update countdown timer element
            $("#countdown span").text(count);

            //what happens when time expires
            if (count <= 0) {
                passed = false;
                console.log("timer done");
                clearInterval(counter);
                $("#start_game_button").fadeIn();
                $("#dewey_decimal_game_stage ul").sortable({ disabled: true });
                $("#game_over_fail").fadeIn();
                $("#dewey_decimal_game_stage").addClass("game_over");
                if (score < 1) {
                    $("#score_submit").hide();
                }
                else
                {
                    $("#score_submit").show();
                }                
                //setTimeout(function () { $("#game_over_fail, .book").click(function () { $(".book").off("click"); init_stage(true); }) }, 500);
            }
        }//timer

    })//document ready

}//init stage
