//selected Variables

//splash screen

let controlButton = document.querySelector(".control-button span"),
    playerName = document.querySelector(".name span"),
    splashScreen = document.querySelector(".control-button"),
    gameOverButton= document.querySelector(".game-over-button"),
    counterDown = document.querySelector(".countdown span"),
    seconds = 75;
    

    // main variables

    let duration = 500;
    let blocksContainer = document.querySelector(".memory-game-blocks");
    let goodPlayer = document.querySelector(".well-done");
    let blocks = Array.from(blocksContainer.children);
    let orderRange = [...Array(blocks.length).keys()];
    shuffle(orderRange);
    
    blocks.forEach((block,index) =>{

        block.style.order = orderRange[index];

        //add click event 
        block.addEventListener('click',function(){
            flipBlock(block);


        });


    });


    function flipBlock(selectedBlock){
        //add class is-flipped
        selectedBlock.classList.add("is-flipped");

     //collect all flipped cards
     let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

     //if there's two blocks opened
     if (allFlippedBlocks.length == 2){

        //stop clicking function 
        stopClicking();

        //check matched blocks
        checkBlocksMatched(allFlippedBlocks[0],allFlippedBlocks[1]);
     }

    
     

    }
        //stop clicking function 

    function stopClicking(){
        blocksContainer.classList.add('no-clicking');

        //remove no clicking & wait duration
        setTimeout(() =>{
            blocksContainer.classList.remove('no-clicking');
  
        },duration);
    }


            //check matched blocks
    function checkBlocksMatched(firstBlock,secondBlock){

        let triesElement = document .querySelector('.tries span');
        let rightElement = document .querySelector('.right span');


        if (firstBlock.dataset.animal === secondBlock.dataset.animal){

      
                //remove is flipped class
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
    
                //add has matched class
    
                firstBlock.classList.add('has-match');
                secondBlock.classList.add('has-match');

                rightElement.innerHTML = parseInt(rightElement.innerHTML) + 1;

                if(rightElement.innerHTML === '10'){
                    clearInterval(countDown);
                    goodPlayer.classList.add("show");
                goodPlayer.onclick=() =>{
                    window.location.reload(true);

                 };
                }

    
            document.getElementById ("success").play();
           
        
        }else{
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

            setTimeout(() =>{
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');

            },duration);

            document.getElementById ("fail").play();

         
        }


    }

    function shuffle(array){
        let current = array.length,
            stash,
            random;


        while(current >0){
            
            //get random number
            random = Math.floor(Math.random() * current);

            //decrease current number
            current--;

            //save current element in stash
            stash = array[current];

            //current element = random element
            array[current] = array[random];

            //random element = element from stash
            array[random] = stash;
        }

        return array;
        

    }

//start span function 

controlButton.onclick = () =>{

    let yourName = prompt("What's Your Name?");

    //check player name

    if( yourName == null || yourName == ""){

        playerName.innerHTML = "UNKNOWN";

    }else{

        playerName.innerHTML = yourName;
      
    }
    
    splashScreen.remove();
    setInterval(countDown);

    document.getElementById("start").play();

}

countDown = setInterval(() =>{
     secondPass();
},1000);

function secondPass(){

    let minutes = Math.floor(seconds / 60),
        remSeconds = seconds % 60;

        if(remSeconds < 10){
            remSeconds = `0${remSeconds}`
        };

        counterDown.innerHTML = ` 0${minutes} : ${remSeconds}` ; 

        if(seconds > 0){
            seconds = seconds -1; 
        }
        
        else{
            clearInterval(countDown);
            gameOverButton.classList.add("show");
           gameOverButton.onclick= () =>{
                window.location.reload(true);

             };       
             }

}




