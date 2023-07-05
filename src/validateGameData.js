/**
 * This function should return an object that looks like this:
 *
 * {
 *   isValid: true | false,
 *   reasons: [] // an array of strings
 * }
 *
 * @param initialGameData This is the same data structure passed to the iFrame using the window.CG_API.InitGame message
 * @param breadcrumbs This is an array of breadcrumb objects received from the game using the window.GC_API.BreadCrumb message
 * @param finalGameData This is the final score object sent from the game using the window.GC_API.FinalScores message
 */

const validateGameDataCode = function validateGameData(initialGameData, breadcrumbs, finalGameData) {
  
    // NOTE TO GAME DEVELOPER. All internally called functions should be scoped within
    // the validateGameData function. The only exposed function that will end up in the
    // caller's namespace should be validateGameData().
  
    // Function outputs to console if uncommented
    function validateGameDataLogger(val) {
      // console.log(val);
    }
    

    function checkCoinArray( allCoinPositions, breadCrumbCoins, reasons ){

        var badCoins = 0;

        for(var i=0; i<breadCrumbCoins.length; i++){

            var hasFound=false;

            for(var j=0; j<allCoinPositions.length; j++){

                //check to see if the z difference is within 3 which is the max difference to be logged
                //check to see if the rotation matches

                if( Math.abs(allCoinPositions[j][0] - breadCrumbCoins[i][0] < 3) && allCoinPositions[j][1]===breadCrumbCoins[i][1]){

                    hasFound=true;
                    j=10000;

                }

            }

            if(hasFound===true){
                console.log("coin ok "+i)
            }else{
                console.log("coin bad "+i)
                console.log(breadCrumbCoins[i]);
                badCoins+=1;
            }

        }

        if(badCoins>=1){
            reasons.push("FOUND "+badCoins+" BAD COINS");
            return true;
        }else{
            return false;
        }

    }

    function checkScoreArray( breadCrumbScores, finalScores, pointScore, reasons ){

        var isCheating = false;

        if(breadCrumbScores.length<10){

            //see if there is no record or improper entries of the breadCrumbScores

            reasons.push("INCORRECT NUMBER OF BREADCRUMBS "+breadCrumbScores.length);
            console.log("INCORRECT NUMBER OF BREADCRUMBS "+breadCrumbScores.length)
            isCheating=true;

        }else{

            var totalScore = 0;

            for(var i=0; i<breadCrumbScores.length; i++){

                if(breadCrumbScores[i]>2000){

                    // flag for cheating - level score too high
                    reasons.push("LEVEL "+i+" SCORE TOO HIGH "+breadCrumbScores[i]);
                    console.log("FLAG FOR CHEATING - LEVEL SCORE TOO HIGH")
                    isCheating=true;

                }

                console.log("bc score "+i+": "+breadCrumbScores[i]);
                totalScore+=breadCrumbScores[i];

            }

            // get the final score recorded at end of game and compare to all these numbers recorded along the way.
            if(totalScore!=pointScore){

                reasons.push("BREADCRUMB SCORES NOT ADDING UP "+pointScore+" / "+totalScore);
                console.log("FLAG FOR CHEATING - BREADCRUMB SCORES NOT ADDING UP "+pointScore+" / "+totalScore)
                isCheating=true;

            }

            // get the final levelScores recorded at end of game and see if they differ from the bread crumb scores
            if( breadCrumbScores[0]!==finalScores[0] || breadCrumbScores[1]!==finalScores[1] || breadCrumbScores[2]!==finalScores[2] || breadCrumbScores[3]!==finalScores[3] || breadCrumbScores[4]!==finalScores[4] || breadCrumbScores[5]!==finalScores[5] || breadCrumbScores[6]!==finalScores[6]  || breadCrumbScores[7]!==finalScores[7]  || breadCrumbScores[8]!==finalScores[8]  || breadCrumbScores[9]!==finalScores[9] ){

                console.log(breadCrumbScores[0]+" / "+finalScores[0]);
                console.log(breadCrumbScores[1]+" / "+finalScores[1]);
                console.log(breadCrumbScores[2]+" / "+finalScores[2]);
                console.log(breadCrumbScores[3]+" / "+finalScores[3]);
                console.log(breadCrumbScores[4]+" / "+finalScores[4]);
                console.log(breadCrumbScores[5]+" / "+finalScores[5]);
                console.log(breadCrumbScores[6]+" / "+finalScores[6]);
                console.log(breadCrumbScores[7]+" / "+finalScores[7]);
                console.log(breadCrumbScores[8]+" / "+finalScores[8]);
                console.log(breadCrumbScores[9]+" / "+finalScores[9]);

                reasons.push("BREADCRUMB SCORES NOT MATHCING FINAL SCORES");
                console.log("FLAG FOR CHEATING - BREADCRUMB SCORES NOT MATHCING FINAL SCORES")
                isCheating=true;

            }

        }

        return isCheating;

    }

    function otherCheatingChecks( finalGameData, reasons ){

        var score = finalGameData.score
        var pointScore = finalGameData.metadata.pointScore
        var spikePenaltyScore = finalGameData.metadata.spikePenaltyScore
        var penaltyScore = finalGameData.metadata.penaltyScore
        var levelScore1 = finalGameData.metadata.levelScore1
        var levelScore2 = finalGameData.metadata.levelScore2
        var levelScore3 = finalGameData.metadata.levelScore3
        var levelScore4 = finalGameData.metadata.levelScore4
        var levelScore5 = finalGameData.metadata.levelScore5
        var levelScore6 = finalGameData.metadata.levelScore6
        var levelScore7 = finalGameData.metadata.levelScore7
        var smallEthe = finalGameData.metadata.smallEthe
        var mediumEthe = finalGameData.metadata.mediumEthe
        var largeEthe = finalGameData.metadata.largeEthe
        var scoreLog = finalGameData.metadata.scoreLog

        var isCheating = false;

        console.log("-----------------------");

        console.log("ls1 "+levelScore1);
        console.log("ls2 "+levelScore2);
        console.log("ls3 "+levelScore3);
        console.log("ls4 "+levelScore4);
        console.log("ls5 "+levelScore5);
        console.log("ls6 "+levelScore6);
        console.log("ls7 "+levelScore7);

        console.log("-----------------------");

        console.log("large ethe "+largeEthe);
        console.log("medium ethe "+mediumEthe);
        console.log("small ethe "+smallEthe);

        console.log("-----------------------");

        console.log("pointscore "+ pointScore);
        console.log("spikePenaltyScore "+ spikePenaltyScore);
        console.log("penaltyScore "+ penaltyScore);

        console.log("-----------------------");

        console.log("Score "+ score);

        console.log("-----------------------");

        for(var i=0; i<scoreLog.length; i++){
            console.log(">>>>> "+scoreLog[i][0]+" / "+scoreLog[i][2]+" / "+scoreLog[i][3]+" / "+scoreLog[i][4]);
        }

        console.log("-----------------------");

        var maxAmount = 2000;

        //test break
        // score = 50000;

        if(score>maxAmount*10){

            // flag for cheating - impossible score, over 14000
            reasons.push("IMPOSSIBLY HIGH SCORE");
            console.log("FLAG FOR CHEATING - IMPOSSIBLY HIGH SCORE");
            isCheating=true;

        }

        console.log("-----------------------");

        //test break
        // levelScore1 = 50000;

        if(levelScore1>maxAmount || levelScore2>maxAmount || levelScore3>maxAmount || levelScore4>maxAmount || levelScore5>maxAmount || levelScore6>maxAmount || levelScore7>maxAmount){

            // flag for cheating - level score too high
            reasons.push("IMPOSSIBLY LEVEL HIGH SCORE "+levelScore1+" / "+levelScore2+" / "+levelScore3+" / "+levelScore4+" / "+levelScore5+" / "+levelScore6+" / "+levelScore7);
            console.log("FLAG FOR CHEATING - LEVEL SCORE");
            isCheating=true;

        }

        //test break
        // smallEthe = 50000;

        if( smallEthe>130 || mediumEthe>60 || largeEthe>30 ){

            // flag for cheating - tampering with ethe totals
            reasons.push("COIN TOTALS TAMPERED WITH "+smallEthe+" / "+mediumEthe+" / "+largeEthe);
            console.log("FLAG FOR CHEATING - COIN TOTALS TAMPERED WITH");
            isCheating=true;

        }

        //test break
        // penaltyScore = 0;

        if( penaltyScore===0 ){

            // flag for cheating - never went off platform - very unlikely
            reasons.push("NEVER WENT OFF PLATFORM");
            console.log("FLAG FOR CHEATING - NEVER WENT OFF PLATFORM");
            isCheating=true;

        }

        if( score != pointScore - penaltyScore - spikePenaltyScore ){

            // flag for cheating - final score variable not adding up
            reasons.push("SCORES NOT ADDING UP "+score+" NOT EUQAL TO "+pointScore+" - "+penaltyScore+" - "+spikePenaltyScore)
            console.log("FLAG FOR CHEATING - SCORES NOT ADDING UP");
            isCheating=true;

        }

        return isCheating;

    }
    
}
