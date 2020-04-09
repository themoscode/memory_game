

$( document ).ready(function() {

    var timerInterval;

    function timer(action){

        console.log("in timer");
        
        var minutesLabel = $("#minutes");
        var secondsLabel = $("#seconds");
        var totalSeconds = 0;


        function setTime() {
            ++totalSeconds;
            secondsLabel.html(pad(totalSeconds % 60));
            minutesLabel.html(pad(parseInt(totalSeconds / 60)));
            
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }

        if (action=="start"){
            timerInterval = setInterval(setTime, 1000); 
        }

        else {

            console.log("stop timer");
            clearInterval(timerInterval);

        }
    
    }

    function init(){

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
    
        function cardClick(){
            
            if (!$(this)[0].frozen){
        
                $(this).toggleClass("is-flipped");
                console.log("pickedCards",pickedCards);
                pickedArray[pickedCards] = $(this);
        
                console.log("pickedArray",pickedArray);
                pickedCards++;
                if (pickedCards == 2) {
                    $(".card").off("click", cardClick );
                    pickedCards=0;
                    
                    if (pickedArray[0][0].innerHTML !== pickedArray[1][0].innerHTML) {
        
                        setTimeout(function(){  
                            pickedArray[0].toggleClass("is-flipped");pickedArray[0] = false 
                            pickedArray[1].toggleClass("is-flipped");pickedArray[1] = false; 
                            $(".card").one("click", cardClick );
                        }, 1000);
        
                    } else {
                        pickedArray[0].prop("frozen",true);
                        pickedArray[1].prop("frozen",true);
        
                        pickedArray = [false,false];
                        $(".card").one("click", cardClick );
                        matches = matches + 1;
                        if (matches == matches_to_win) {
                            
                            $("#winMsg").html("Bravo!!! du hast es geschaft in:<br> "+$("#minutes").html()+" min und "+$("#seconds").html()+" sec!!!");
                            timer("stop");
                            $("#winDiv").show(1000);
                           
                        }
                    }
        
                } 
        
            }
        
        }

        timer("stop");
        timer("start");
        $("#winDiv").hide(1000);
        $("#tableDiv").hide();
            
        console.log("select value",$("#selGrid").val());

        var res = $("#selGrid").val().split("X");

        var number_of_rows = parseInt(res[0]);
        var number_of_cols = parseInt(res[1]);
        var matches_to_win = (number_of_rows*number_of_cols)/2;
        var matches = 0;

        console.log("matches_to_win",matches_to_win);

        var counter = 0;

        var table_body = '<table>';
        for(var i=0;i<number_of_rows;i++){
            table_body+='<tr>';
            for(var j=0;j<number_of_cols;j++){

                table_body +='<td id="a'+(j+counter)+'">';
                table_body +='</td>';
                
            }
            table_body+='</tr>';
            counter=counter+number_of_cols;
            console.log("counter",counter);
        }
            table_body+='</table>';
            $('#tableDiv').html(table_body);
        
        
        //images array
        var arr = [];

        var endLength = (number_of_rows*number_of_cols)/2;

        console.log("endLength",endLength);

        for (i = 0; i < endLength; i++) {
            arr.push(i);
            arr.push(i);
        }
    
        var pickedCards = 0;
        var pickedArray = [false,false];
        
        shuffle(arr);
        console.log(arr);
    
    
        $("td").html("<div class='scene scene--card'><div class='card'><div class='card__face card__face--front'></div><div class='card__face card__face--back'></div></div></div>");
    
        for (i = 0; i < arr.length; i++) {
            $("td#a"+i+" .card__face--back").html("<img src='images/"+arr[i]+".png'>");
        }
        
        
        $("#tableDiv").show(1000);
        
        $(".card").one("click", cardClick );

         
    }

    /////////////////////////////////////////////////////////////////

    init();
    $("#btnInit").on("click", init );
   

    /////////////////////////////////////////////////////////////////
});


  
 