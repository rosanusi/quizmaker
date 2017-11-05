// ToDo
// - Get value from textarea and add it to the array

var questionBtn = document.querySelector('.questionBtn');
var questionField = document.querySelector('.questionInput');
var questionBlock = document.querySelector('.quizBlock');
var questionContainer = document.querySelector('.questionWrap');
var listTemplate = questionContainer.querySelector('.questionCard.template');
var storedQuestions;


function main() {

	if (load()) {
		displayQuestions();
	}
	else {
		storedQuestions = [];
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
		var questionCard = listTemplate.cloneNode(true);
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
		var answerInputBtn = answerForm.querySelector('.priBtn');

		// when the answerBtn is clicked add the input to the array
		answerInputBtn.addEventListener("click", function(){
			event.preventDefault();

			if (answerInput && answerInput.value) {

				storedAnswers = [];

				// Save it to the storedAnswers Array
				storedAnswers.push({
					text: answerInput.value,
					correct: false
				});

				// Added the storedAnswers object inside storedQuestions
				storedQuestions[i].answers = storedAnswers;

				// update the Array in localstorage
				save();

				// Now display it on the page
				var answerList = questionCard.querySelector('.answerList');
				var answerCard = answerList.querySelector('.answerCard');

				console.log(answerList);
				// Show this on the page!
				console.log(answerInput.value);


			} else {
				console.log('Theres no input');
			}

		});

	}); //End of the forEach Loop
}

main();
