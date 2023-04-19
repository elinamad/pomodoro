
//default values for work timer

let defaultwm = "25";
let defaultws = "00";

//default values for break timer

let defaultbm = "05";
let defaultbs = "00";

//default values for long break

defaultlongbreak = 10;
defaultcycles = 4;

//custom values for work and break timers

let wmvalue;
let bmvalue;
let longbmvalue;
let cyclesvalue;

//sound settings

let soundbtn = document.getElementById('sound-btn');
let notification = true;
let notificationsound = document.getElementById('notification');

//timer display

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

//cycle counter

let counter = document.getElementById('counter');

let breakcounter = document.getElementById('breakcounter');

let longbreakcounter = 0;

//settings apply button

let applybtn = document.getElementById('apply');



//display work / break

let workbreak = document.getElementById('workbreak');

//other variables

let settings = false;
let startTimer;
let worktime = true;
let breaktime = false;
let running;
let timerRunning = false;
let islongbreak = false;

//total timer

let totalhoursdisplay = document.getElementById('total-hours');
let totalminutesdisplay = document.getElementById('total-minutes');
let totalsecondsdisplay = document.getElementById('total-seconds');

totalhoursdisplay.innerText = "00";
totalminutesdisplay.innerText = "00";
totalsecondsdisplay.innerText = "00";

let totalhours = parseInt(totalsecondsdisplay.innerText);
let totalminutes = parseInt(totalminutesdisplay.innerText);
let totalseconds = parseInt(totalsecondsdisplay.innerText);

//total stats timer

let stotalhoursdisplay = document.getElementById('stotal-hours');
let stotalminutesdisplay = document.getElementById('stotal-minutes');
let stotalsecondsdisplay = document.getElementById('stotal-seconds');

stotalhoursdisplay.innerText = "00";
stotalminutesdisplay.innerText = "00";
stotalsecondsdisplay.innerText = "00";

let stotalhours = parseInt(totalsecondsdisplay.innerText);
let stotalminutes = parseInt(totalminutesdisplay.innerText);
let stotalseconds = parseInt(totalsecondsdisplay.innerText);


//total focus timer

let focushoursdisplay = document.getElementById('focus-hours');
let focusminutesdisplay = document.getElementById('focus-minutes');
let focussecondsdisplay = document.getElementById('focus-seconds');

focushoursdisplay.innerText = "00";
focusminutesdisplay.innerText = "00";
focussecondsdisplay.innerText = "00";

let focushours = parseInt(focushoursdisplay.innerText);
let focusminutes = parseInt(focusminutesdisplay.innerText);
let focusseconds = parseInt(focussecondsdisplay.innerText);

//total break timer

let breakhoursdisplay = document.getElementById('break-hours');
let breakminutesdisplay = document.getElementById('break-minutes');
let breaksecondsdisplay = document.getElementById('break-seconds');

breakhoursdisplay.innerText = "00";
breakminutesdisplay.innerText = "00";
breaksecondsdisplay.innerText = "00";

let breakhours = parseInt(breakhoursdisplay.innerText);
let breakminutes = parseInt(breakminutesdisplay.innerText);
let breakseconds = parseInt(breaksecondsdisplay.innerText);


//shows if currently work or break timer

if (worktime){
    workbreak.innerText = "Work";
} else {
    if(islongbreak == true){
        workbreak.innerText = "Long break"
    }else{
        workbreak.innerText = "Break";
    }
   

}


//Checks if default or custom settings and applies

if(settings == false) {
    //no settings work timer
    if (worktime) {
        minutes.innerText = defaultwm;
        seconds.innerText = defaultws;
    //no settings break timer
    } else {
        minutes.innerText = defaultbm;
        seconds.innerText = defaultbs;
    }
}else{
    //work timer with settings
    if (worktime){
        minutes.innerText = wmvalue;
        seconds.innerText = defaultws;
    //break timer with settings
    } else {
        minutes.innerText = bmvalue;
        seconds.innerText = defaultbs;
    }
}

// format number to 00:00 function




//event listeners

function toggleTimer() {
    if(!timerRunning) {
        if (startTimer == undefined) {
            startTimer =setInterval(timer,1000)
            document.title = "Work";
            timerRunning= true;
            toggle.innerText = "Stop";
            toggle.classList.toggle("active");


        }
    }else {
        stopInterval()
        startTimer = undefined;
        timerRunning = false;
        document.title = "Pomodoro";
        toggle.innerText = "Start";
        toggle.classList.toggle("active");

        
        
    }

    toggle.offsetHeight;
};

toggle.addEventListener('pointerup',toggleTimer);




applybtn.addEventListener('click',function(event){
    applySettings(event);
    applybtn.value = "Applied";
    applybtn.classList.add("active");
    setTimeout(revertapply,1000);
    
})

function revertapply(){
    applybtn.value="Apply changes"
    applybtn.classList.remove("active");
}


reset.addEventListener('click',function(){
    stopInterval()
    startTimer = undefined;
    timerRunning = false;
    breaktime = false;
    toggle.innerText = "start";
    workbreak.innerText ="Work";
    counter.innerText = "0";
    longbreakcounter = 0;
    breakcounter.innerText = "0";

    if (settings == false) {
        minutes.innerText = defaultwm;
        seconds.innerText = defaultws;
    } else {
        minutes.innerText = formatNumber(wmvalue);
        seconds.innerText = defaultws;
    }

    totalhoursdisplay.innerText = "00";
    totalminutesdisplay.innerText ="00";
    totalsecondsdisplay.innerText = "00";

    focussecondsdisplay.innerText ="00";
    focusminutesdisplay.innerText ="00";
    focushoursdisplay.innerText = "00";

    reset.classList.add("active");
    setTimeout(revertreset,300);

});

function revertreset(){
    reset.classList.remove("active");
}

//timer function

function timer() {

    //if work timer
    if (worktime) {
        workbreak.innerText = "Work"
        document.title = "Work";
        breaktime = false;
        //decrement seconds if not 0
        if (seconds.innerText != 0) {
            seconds.innerText = formatNumber(seconds.innerText - 1);
        //decrement minute after seconds are 0 and reset the seconds timer
        } else if (minutes.innerText != 0 && seconds.innerText == 0){
            seconds.innerText = 59;
            minutes.innerText = formatNumber(minutes.innerText - 1);
        }

        //format the minutes to display as 00 instead of 0 on the last minute

        if(minutes.innerText == 0 && seconds.innerText != 0){
            minutes.innerText = "00";
        }

        //work timer completion
        if (minutes.innerText == 0 && seconds.innerText == 0) {
            if (islongbreak == true){
                workbreak.innerText = "Long Break"
                document.title = "Long Break"
            }else{
                workbreak.innerText = "Break"
                document.title = "Break";
            }
            //toggle off worktime
            if (notification == true){
                notificationsound.play();
            }
            worktime = false;
            breaktime = true;
            counter.innerText ++;
            longbreakcounter ++;
            //set to break values
           
            if (settings == false) {
                if(longbreakcounter == defaultcycles){
                    islongbreak = true;
                    minutes.innerText = formatNumber(defaultlongbreak - 1);
                    seconds.innerText = "59";
                }else{
                    islongbreak = false;
                    minutes.innerText = formatNumber(defaultbm - 1);
                    seconds.innerText = "59";
                    
                }

                if (longbreakcounter > defaultcycles){
                    islongbreak = false;
                    longbreakcounter = 0;
                    
                }

            }else {
                if(longbreakcounter == cyclesvalue){
                    islongbreak = true;
                    minutes.innerText = formatNumber(longbmvalue -1);
                    seconds.innerText = "59";  
                    
                }else{
                    islongbreak = false;
                    minutes.innerText = formatNumber(bmvalue -1);
                    seconds.innerText = "59";
                    
                }

                if (longbreakcounter > cyclesvalue){
                    islongbreak = false;
                    longbreakcounter = 0;
                    
                }
            }

            

            
        }

    //if break timer
    } else {
        if (islongbreak == true){
            workbreak.innerText = "Long Break"
            document.title = "Long Break"
        }else{
            workbreak.innerText = "Break"
            document.title = "Break"
        }
        
        if (seconds.innerText != 0) {
            seconds.innerText = formatNumber(seconds.innerText - 1);
        } else if (minutes.innerText != 0 && seconds.innerText == 0){
            seconds.innerText = "59";
            minutes.innerText = formatNumber(minutes.innerText - 1);
        }

        if (minutes.innerText == 0 && seconds.innerText == 0) {
            breakcounter.innerText ++;
            workbreak.innerText ="Work";
            document.title = "Work"
            if (notification == true){
                notificationsound.play();
            }
            worktime = true;
            breaktime = false;
            if (settings == false){
                minutes.innerText = formatnumber(defaultwm - 1);
                seconds.innerText = "59";
            } else {
                minutes.innerText = formatNumber(wmvalue - 1);
                seconds.innerText = "59";
            }
        }
    }

    //update total timer

    totalseconds ++;

    if (totalseconds >= 60){
        totalseconds = 0;
        totalminutes++;

        if (totalminutes >= 60 ){
            totalminutes = 0;
            totalhours++;
        }
    }

    //update total stats timer

    stotalseconds ++;

    if (stotalseconds >= 60){
        stotalseconds = 0;
        stotalminutes++;

        if (stotalminutes >= 60 ){
            stotalminutes = 0;
            stotalhours++;
        }
    }

    //update focus timer

    if (breaktime == false){

        focusseconds++;

        if (focusseconds >= 60){
            focusseconds = 0;
            focusminutes ++;

            if (focusminutes >= 60){
                focusminutes = 0;
                focushours++;
            }
        }

    }

    //update break timer

    if (breaktime == true){

        breakseconds++;
        
        if (breakseconds >= 60){
            breakseconds = 0;
            breakminutes ++;

            if (breakminutes >= 60){
                breakminutes = 0;
                breakhours++;
            }
        }

    }

    //update timers text

    stotalhoursdisplay.innerText = formatNumber(stotalhours);
    stotalminutesdisplay.innerText = formatNumber(stotalminutes);
    stotalsecondsdisplay.innerText = formatNumber(stotalseconds);

    totalhoursdisplay.innerText = formatNumber(totalhours);
    totalminutesdisplay.innerText = formatNumber(totalminutes);
    totalsecondsdisplay.innerText = formatNumber(totalseconds);

    focushoursdisplay.innerText = formatNumber(focushours);
    focusminutesdisplay.innerText = formatNumber(focusminutes);
    focussecondsdisplay.innerText = formatNumber(focusseconds);

    breakhoursdisplay.innerText = formatNumber(breakhours);
    breakminutesdisplay.innerText = formatNumber(breakminutes);
    breaksecondsdisplay.innerText = formatNumber(breakseconds);
    
    //show timer on title tag
    

    document.title = `${workbreak.innerText}  (${minutes.innerText}:${seconds.innerText})`;
}

function stopInterval(){
    clearInterval(startTimer);
    requestAnimationFrame(() => {
        toggle.innerText = "Start";
        toggle.classList.remove("active");
    });
}

//setting apply function

function applySettings(event) {
    event.preventDefault();

    let workinput = document.getElementById('workinput').value;
    let breakinput = document.getElementById('breakinput').value;
    let longbreakinput = document.getElementById('longbreakinput').value;
    let cyclesinput = document.getElementById('cyclesinput').value;

    if (workinput) {
        wmvalue = parseInt(workinput);
        settings = true;
    }

    if (breakinput) {
        bmvalue = parseInt(breakinput);
        settings = true;
    }

    if (longbreakinput) {
        longbmvalue = parseInt(longbreakinput);
        settings = true;
    }

    if (cyclesinput) {
        cyclesvalue = parseInt(cyclesinput);
        settings = true;
    }

    if(worktime){
        if(settings) {
            minutes.innerText = formatNumber(wmvalue);
            seconds.innerText = "00";
        }else{
            minutes.innerText = defaultwm;
            seconds.innerText = "00";
        }
    }else{
        if(settings){
            minutes.innerText = formatNumber(bmvalue);
            seconds.innerText = "00";
        } else{
            minutes.innerText = defaultbm;
            seconds.innerText = "00";
        }
    }


}


function formatNumber(number){
    return number.toString().padStart(2,'0');
}


//sound settings

soundbtn.addEventListener('click',function(){
    if( notification == true){
        soundbtn.classList.toggle("disabled")
        notification = false;
    }else{
        soundbtn.classList.toggle("disabled")
        notification = true;
    }
})

//show stats

let statbtn = document.getElementById("stats-btn");
let statshow = false;
let statwindow = document.getElementById('stats')

statbtn.addEventListener('click',function(){
    if(statshow == false){
        statbtn.classList.remove('disabled');
        statwindow.classList.remove("hide");
        statshow = true;
    }else{
        statbtn.classList.add('disabled');
        statwindow.classList.add("hide");
        statshow = false;
    }
})

//dark light mode toggle

let darkbtn = document.getElementById("dark-btn");
let darkmode = false;

const root = document.documentElement;


darkbtn.addEventListener('click',function(){
    if (darkmode == false){
        darkbtn.classList.remove('disabled');
        darkmode = true;
        root.style.setProperty('--dark','#ededed');
        root.style.setProperty('--light','#2E2E2E');
        
    }else{
        darkbtn.classList.add('disabled');
        darkmode = false;
        root.style.setProperty('--dark','#3c3c3c');
        root.style.setProperty('--light','#ffffff');
    }
})

//settings toggle menu

let settingtoggle = document.getElementById("settingstoggle");
let settingmenu = document.getElementById("settings");
let settingopen = false;
let menubox = document.getElementById("setmenu");


settingtoggle.addEventListener("click",function(){
    if(settingopen == true){
        settingmenu.classList.add("hide");
        menubox.classList.add("hide");
        settingtoggle.innerText = "Settings";
        settingopen = false;
    }else{
        settingmenu.classList.remove("hide");
        menubox.classList.remove("hide");
        settingtoggle.innerText = "Close";
        settingopen = true;
    }
})


