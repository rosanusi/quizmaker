// ToDo
// - Get value from textarea and add it to the array

var questionBtn = document.querySelector('.questionBtn');
var questionField = document.querySelector('.questionInput');
var questionBlock = document.querySelector('.quizBlock');
var questionContainer = document.querySelector('.questionWrap');
var questionTemplate = questionContainer.querySelector('.questionCard.template');
var answerTemplate = questionContainer.querySelector('.answerCard.template');
var storedQuestions;
var storedAnswers;


function main() {

	if (load()) {
		displayQuestions();
		//displayAnswers();
	}
	else {
		storedQuestions = [];
		storedAnswers = [];
	}
}

function save() {
	localStorage["questionList"] = JSON.stringify(storedQuestions);
}

function load() {
	if(!localStorage["questionList"])
	return false;

	// retrive Array
	storedQuestions = JSON.parse(localStorage["questionList"]);
		return true;
}


questionBtn.addEventListener('click', function onEvent(event){
	// prevent defualt behaviour
	event.preventDefault();
	if (questionField.value) {
		questionField.innerHTML = questionField.value;

		// Save it to the quetionField Array
		storedQuestions.push({
			question: questionField.value
		});

		// update the Array in localstorage
		save();

		//Reload and display Updated Questions
		questionContainer.innerHTML = '';
		displayQuestions();

		//Remove the value
		questionField.value = "";

	} else {

		//TODO: Feedback to be added
		console.log("it's got NO value");

	}
});



function displayQuestions() {
	storedQuestions.forEach(function(question, i) {
		// Clone the questionCard and append it in the "ul"
		var questionCard = questionTemplate.cloneNode(true);
		questionCard.classList.remove('template');
		questionContainer.appendChild(questionCard);

		//Bind the each questions in the array to their respective questioncard
		var questionText = questionCard.querySelector('.question');
		questionText.innerHTML = question.question;

		// Answer Button should open answer form
		var answerForm = questionCard.querySelector('.answerForm');
		var answerFormBtn = questionCard.querySelector('.answerBtn');

		// Initially hide the class until the button is clicked
		answerForm.classList.add('hide');

		// On the button click, reveal the answer panel
		answerFormBtn.addEventListener("click", function(){
			event.preventDefault();
			answerForm.classList.remove('hide');
		});

		// Receive new answer and add it to the list of answers
		var answerForm = questionCard.querySelector('.answerForm');
		var answerInput = answerForm.querySelector('.answerInput');
		var wrongAnswer = answerForm.querySelector('.wrongAnswer');
		var rightAnswer = answerForm.querySelector('.rightAnswer');
		var answerInputBtn = answerForm.querySelector('.priBtn');

		// when the answerBtn is clicked add the input to the array
		// answerInputBtn.addEventListener("click", function(){
		//
		// });

		answerInputBtn.addEventListener("click", e => addNewAnswer(answerInput, question, questionCard, wrongAnswer, rightAnswer, answerContainer));

		// Show Answers on the page
		if (storedQuestions[i].answers) {
			var answers = storedQuestions[i].answers;
			//console.log(storedQuestions[i].answers[i].text);
			var answerContainer = questionCard.querySelector('.answerContainer');
			answerContainer.innerHTML = "";

			question.answers.forEach(function(answer, i) {
				var answerCard = answerTemplate.cloneNode(true);
				answerCard.classList.remove('template');
				answerContainer.appendChild(answerCard);
				answerCard.innerHTML = answer.text;

				if (answer.correct == true) {
					answerCard.classList.add('right');
				}
			});
		}


	}); //End of the forEach Loop
}

function addNewAnswer(answerInput, question, questionCard, wrongAnswer, rightAnswer, answerContainer) {

	event.preventDefault();

	if(question.answers == null)
		question.answers = [];

	if (answerInput && answerInput.value) {
		if (question.answers.length < 4 ) {
			if (rightAnswer.checked) {
				// Save it to the storedAnswers Array as correct
				question.answers.push({
					text: answerInput.value,
					correct: true
				});
			} else {
				// Save it to the storedAnswers Array as wrong
				question.answers.push({
					text: answerInput.value,
					correct: false
				});
			}
			// update the Array in localstorage
			save();
			//Reload and display Updated Questions
			questionContainer.innerHTML = '';
			displayQuestions();

		} else {
			console.log('theres enough question here already. Remove one maybe.');
			answerContainer.innerHTML = "";
			displayQuestions();
		}
	} else {
		console.log('Theres no input');
	}
}

main();
