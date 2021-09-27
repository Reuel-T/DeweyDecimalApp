console.log("JS LOADED");

//BASE URL FOR MAKING HTTP REQUESTS - Reduces unnecessary Page Loads
let baseURL;

//sorted array - passed in from view on first run, get requests made afterward
let sortedArray = Array();

let game_time = 30

//value used to check if this is the first play
let first_play = true;

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

//https://stackoverflow.com/questions/37663674/using-fetch-api-to-access-json
//gets the books from server, then inits the stage area
async function start_game()
{
    let url = `${baseURL}/home/GenerateCallNos`;
    //let response = await fetch(url);

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


////https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
////Gets the books from the MVC App
//async function getBooks() {
//    let url = `${baseURL}/home/GenerateCallNos`;
//    //let response = await fetch(url);

//    console.log("Getting Books");

//    await fetch(url)
//        .then(function (response) {
//            // response.json() returns a promise, use the same .then syntax to work with the results
//            response.json().then(function (books) {
//                console.log("Got books");
//                books.forEach(function (book) {
//                    sortedArray.push(book);
//                });//foreach
//                console.log("SA");
//                console.log(sortedArray);

                

//                return;
//            });//response json. then
//        })//fn response
//        .catch(err => console.error(err));
//}

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
    //clear the stage before game start
    $("#game_stage").empty();
    $("#game_success").fadeOut();
    $("#game_fail").fadeOut();
    $("#game_stage").removeClass("game_over");

    //remove undefined values from array if they show up
    //sortedArray = sortedArray.filter(function (x) {
    //    return x !== undefined;
    //});

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
        console.log("current_order:");
        console.log(currentOrder);
        console.log("correct_order:");
        console.log(correctOrder);

        console.log("+ JOIN");
        console.log(currentOrder.join(","));
        console.log(correctOrder.join(","));

        if (currentOrder.join(",") == correctOrder.join(","))
        {
            return true;
        }
        else
        {
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

        //create list items within the game area
        for (var i = 0; i < 10; i++) {

            $("#game_stage")
                .append("" +
                    "<li><div class=\"book " + colours[0] + "\">" +
                    //"<div class=\"spine_text\"><strong>" + books[i][1] + "</strong><br /><em>" + books[i][2] + "</em></div>" +
                    "<div class=\"spine_shelfmark\">" + currentOrder[i] + "</div>" +
                    "</div></li>" +
            "");
        }

        //wrap the list items within a ul
        $("#game_stage").wrapInner("<ul></ul>");

        //disable text selection on these elements
        $("#game_stage ul,#countdown").disableSelection();

        //begins gameplay
        function play_game()
        {
            first_play = false

            //shows the book labels
            $(".spine_shelfmark").removeClass("hidden");

            //hides the start button
            $("#start_game_button").fadeOut();
        }

        //enable the drag and drop feature on the game stage ul
        $("#game_stage ul").sortable({
            placeholder: "book_placeholder",
            //what happens when the ul is updated
            update: function () {

                current_order = []; // clear current order

                //push the Dewey decimal text to the current order array
                $(".book").each(function () {
                    current_order.push($(".spine_shelfmark", this).text());
                });

                //if the order is correct, the game is won 
                if (is_correct_order()) {
                    //stop the timer
                    clearInterval(counter);

                    //reset the UI
                    $("#start_game_button").fadeIn();
                    $("#game_stage ul").sortable({ disabled: true });
                    $("#game_success").fadeIn();
                    $("#game_stage").addClass("game_over");

                    //resets the stage and starts the game after half a second when the user clicks on the stage or book
                    //change to start game
                    setTimeout(function () {
                        $("#game_success, .book")
                        .click(function () {
                            $(".book").off("click");
                            init_stage(true);
                        })
                    }, 500);
                }
            }
        });// sortable ul

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
                clearInterval(counter);
                $("#start_game_button").fadeIn();
                $("#game_stage ul").sortable({ disabled: true });
                $("#game_fail").fadeIn();
                $("#game_stage").addClass("game_over");
                setTimeout(function () { $("#game_fail, .book").click(function () { $(".book").off("click"); init_stage(true); }) }, 500);
            }
        }//timer

        if (autoplay) {
            start_game();
        } else {
            //hides the text on the books
            $(".spine_shelfmark").addClass("hidden");

            //if start game or a book is clicked, start the game
            $("#start_game, .book").click(function () {
                $(".book").off("click");

                //if it is the first play of the level, start the game
                if (first_play) {
                    startGame();
                } else {
                    //set the stage
                    init_stage(true);
                }
            });

        }

    })//document ready

}//init stage
