// ToDo 
// - Get value from textarea and add it to the array

var questionBtn = document.querySelector('.questionBtn');
var questionField = document.querySelector('.questionInput');
var questionBlock = document.querySelector('.quizBlock');
var storedQuestions;


function main() {

	if (load()) {
		displayQuestions();
	}
	else {
		storedQuestions = [];
	}
}


main();


function save() {
	localStorage["questionList"] = JSON.stringify(storedQuestions);
}

function load() {
	if(!localStorage["questionList"]) {
		return false;
	} else {
	// retrive Array
		storedQuestions = JSON.parse(localStorage["questionList"]);
	return true;
	}
}





questionBtn.addEventListener('click', function onEvent(event){
	// prevent defualt behaviour
	event.preventDefault();

	if (questionField.value) {
		questionField.innerHTML = questionField.value;

		// Save it to the quetionField Array

		storedQuestions.push({
			question: questionField.value,
			answerA: "",
			answerB: "",
			answerC: "",
			answerD: ""
		});

		// update the Array in localstorage
		save();
		
		//TODO: Feedback to be added
		console.log("Saved the value to the array");

		//Remove the value
		questionField.value = "";

		//Reload and display Updated Questions
		displayQuestions();

	} else {
		//TODO: Feedback to be added
		console.log("it's got NO value");
	}


});

function displayQuestions() {
	var questionContainer = document.querySelector('.questionWrap');
	var listTemplate = questionContainer.querySelector('.questionCard.template');

	storedQuestions.forEach(function(question, i) { 
		

		// Clone the questionCard and append it in the "ul"
		var questionCard = listTemplate.cloneNode(true);
		questionCard.classList.remove('template');
		questionContainer.appendChild(questionCard);

		//Bind the each questions in the array to their respective questioncard

		var questionText = questionCard.querySelector('.questionText');
		questionText.innerHTML = question.question;

	});
}