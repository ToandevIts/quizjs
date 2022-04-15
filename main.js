// getting all require elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_box = info_box.querySelector(".buttons .quit");
const continus_box = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".question_box");


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
}


let que_count = 0;
let que_num = 1;

const next_btn = quiz_box.querySelector(".next_btn");
const question_len = questions.length;//3
next_btn.onclick =()=>{
    if( que_count < question_len - 1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        
    }   else{
        console.log("Question completed");
    }
   
}

// getting question and options from array 
function showQuestions(index){
    const  que_text = document.querySelector(".question_title");
    const  question_list = document.querySelector(".question_list");

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
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function queCounter(index){
    const total_que= quiz_box.querySelector('.total_que');
    let total_que_html = `
            <span>${index} of ${question_len} Question</span>
        `
    total_que.innerHTML = total_que_html;
}

function optionSelected(index){
   
}