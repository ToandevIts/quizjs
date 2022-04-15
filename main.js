// getting all require elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_box = info_box.querySelector(".buttons .quit");
const continus_box = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".question_box");
const  question_list = document.querySelector(".question_list");
const timeCount = document.querySelector(".time_box");
const timeLine = document.querySelector(".time_line");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");// show info box
}
exit_box.onclick = ()=>{
    info_box.classList.remove("activeInfo");// hide the info box
}

continus_box.onclick = ()=>{
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(10)
    startTimerLine(0);
}


let que_count = 0;
let que_num = 1;
let counter;
let timeValue =10;
let widthValue =0;

const next_btn = quiz_box.querySelector(".next_btn");
const question_len = questions.length;//3
const complete_box = document.querySelector(".complete_box");

next_btn.onclick =()=>{
    if( que_count < question_len - 1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = 'none';
    }   else{
        console.log("Question completed");
        complete_box.classList.add("complete");
    }
   
}

// getting question and options from array 
function showQuestions(index){
    const  que_text = document.querySelector(".question_title");
   

    let que_tag = `${questions[index].num}.${questions[index].question}`;

    let len_que = questions[index].options;
    let option_tag='';
    // console.log(len_que);
    len_que.forEach( (element,i) => {
        option_tag+=`
            <div class="question_item d-flex flex-justify-between">
                <p>${questions[index].options[i]}</p>
                <p>X</p>
            </div>
        `
    });
    
    que_text.innerHTML = que_tag;
    question_list.innerHTML = option_tag;

    const option = question_list.querySelectorAll('.question_item');
    for(let i =0; i< option.length; i++){
        option[i].setAttribute("onclick", `optionSelected(this,${i})`);
    }
}

// show count bottom question 
function queCounter(index){
    const total_que= quiz_box.querySelector('.total_que');
    let total_que_html = `
            <span>${index} of ${question_len} Question</span>
        `
    total_que.innerHTML = total_que_html;
}

// choose answer and check if correct or not
function optionSelected(answer,eleindex){
    // let userAnswer =  questions[que_count].answer;
    clearInterval(counterLine);
    clearInterval(counter);
    let correctAns = questions[que_count].answer;//1
    let allOptions = question_list.children.length;
    eleindex=eleindex+1;
    userAnswer = eleindex++;

    // console.log(correctAns);
    // console.log(userAnswer);
    if(correctAns == userAnswer){
        // console.log("correct");
        answer.classList.add('correct');
    } else{
        answer.classList.add('error');

        // if answer is incorrect the automati the correct answer 
        // for(let i=0; i<allOptions; i++){
            
            // console.log(correctAns);
            // console.log(i);
            // if(correctAns == i++ ){
                question_list.children[correctAns-1].setAttribute('class','question_item d-flex flex-justify-between correct');
            // }
            
        // }
    }
    // console.log(userAnswer);

    // when user selected disable all options
    for(let i=0; i<allOptions; i++){
        question_list.children[i].classList.add('disabled');
    }
    next_btn.style.display = 'block';
}

// set Timer 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--;
        if( time<0 ){
            clearInterval(counter);
        }
    }
}

// set Timer Line
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time++;
        timeLine.style.width = time + 'px';
        if( time>460 ){
            clearInterval(counterLine);
        }
    }
}