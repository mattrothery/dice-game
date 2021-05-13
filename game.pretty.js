//Declare initial variables: array to score die values, round count, number of rounds and dice image array
var result = []
var totalScore = 0
var noRounds = 0
var diceImg = []

//Define function to validate users number of dice input
function validateInput()
{
    //Retrieve number of dice input in user form
    noOfDice = document.getElementById("dice").value

    //If statement to check if user input matches reg exp (3-6)
    if (noOfDice.match(/^[3-6]$/))
    {
        //If it does, then call the play function
        play()
    }
    else
    {
        //Otherwise, show the fail message below input form
        document.getElementById("inputFail").style.display = "block";
    }
}

//Define play function, to initiate play state and show dice
function play()
{
    //Hide the setup stage
    document.getElementById("setup").style.display = "none";
    
    //Display the play stage
    document.getElementById("play").style.display = "block";

    //Increment the number of rounds played
    noRounds++

    //For number of dice input, call dice roll
    for (i = 0; i < noOfDice; i++)
    {
        //Call dice roll for each die
        result[i] = diceRoll()

        //If there is no image file assigned to die
        if (!diceImg[i])
        {
            //Create an img element for each die
            diceImg[i] = document.createElement('img')

            //Append diceImg element to play stage
            document.getElementById("play").appendChild(diceImg[i])
        }
        //Set source, alt, title of each die image as the face value.png
        //Images were created by me using Word Objects
        diceImg[i].src = result[i] + ".png";
        diceImg[i].alt = "Image of the number " + result[i] + " side of a die";
        diceImg[i].title = "Image of the number " + result[i] + " side of a die";
    }

    //Set score of the round to the result returned from the checkScore function
    roundScore = checkScore()
    
    //Add the round score to the total game score
    totalScore += roundScore

    //Insert round score, round count and total score into html
    document.getElementById("roundScore").innerHTML = roundScore
    document.getElementById("roundsPlayed").innerHTML = noRounds
    document.getElementById("totalScore").innerHTML = totalScore
}

//Define checkScore function to determine score for each round
function checkScore()
{
    //Declare boolean to check each possible score 
    var scorePass = true

    //Set the combined score to 0 at start of each round
    var combinedScore = 0

    //Sort the result array to make score checks below easier
    result.sort()

    //Loop to sum the score for each die value and assign to combinedScore
    for (i = 0; i < result.length; i++)
    {
        combinedScore += result[i]
    }

    //--- 1st test - Run (e.g 1234) ---

    //Loop up to length of result array - 1
    for (i = 0; i < result.length - 1; i++)
    {
        //If element of index is not equal to next element + 1
        if (result[i] + 1 != result[i + 1])
        {
            //Then scorePass set to false
            scorePass = false
        }
    }

    //Otherwise if scorePass is still true, then result is a run
    if (scorePass)
    {
        return 20 + combinedScore
    }

    //--- 2nd Test - Different values ---

    //Reset scorePass to true
    scorePass = true

    //Nested loop to test if each value in result array is different to the element of array + 1
    for (i = 0; i < result.length; i++)
    {
        for (j = i + 1; j < result.length; j++)
        {
            if (result[i] == result[j])
            {
                //Then set scorePass to false
                scorePass = false
            }
        }
    }
    //Otherwise if scorePass is still true, then result is all different
    if (scorePass)
    {
        return combinedScore
    }

    //--- 3rd and 4th test - All the same and N-1 the same ---

    //If first element of array == last element (since array is sorted)
    if (result[0] == result[result.length - 1])
    {
        return 60 + combinedScore

    }
    //Otherwise, if first element is equal to second to last (or second element is equal to last)
    else if (result[0] == result[result.length - 2] || result[1] == result[result.length - 1])
    {
        return 40 + combinedScore
    }

    //--- 5th test - Any other combination

    //If reached here, return 0 points
    return 0;

}

//Define diceRoll function, using Math.random function multiplied for 6 sides. Also floored and + 1 to get whole numbers
function diceRoll()
{
    return Math.floor(Math.random() * 6) + 1
}


//Define the end function, to initiate the end stage of the game
function end()
{
    //Hide the play stage, and show the end stage
    document.getElementById("play").style.display = "none";
    document.getElementById("end").style.display = "block";

    //Insert the final scores into the final score table, round the average
    document.getElementById("finalScore").innerHTML = totalScore
    document.getElementById("finalRounds").innerHTML = noRounds
    document.getElementById("avgScore").innerHTML = (totalScore / noRounds).toFixed(1)
}

//Define the hidePlay function, which hides both the play and end stage
function hidePlay()
{
    document.getElementById("play").style.display = "none";
    document.getElementById("end").style.display = "none";
}
