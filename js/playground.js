var listContainer = document.getElementById('cloneContainer');
var template = document.querySelector('.card.template');


var family = [
	{name: 'ridwan', role: 'father'},
	{name: 'galibat', role: 'mother'},
	{name: 'dayyan', role: 'son'},
	{name: 'zahra', role: 'daughter'}
];

var extFamily = [
	{name: 'shakiti', role: 'stepfather'}
];


var storedQuestions = [{question: 'who is the president of the USA?'}];


var storedAnswers =  [
	{ text: "Obama", isCorrect: false },
	{ text: "Trump", isCorrect: true },
	{ text: "babangida", isCorrect: false },
	{ text: "Netanyahu", isCorrect: false },
]

storedQuestions.push(storedAnswers);


family.forEach(function(name, i) {
	var listCard = template.cloneNode(true);
	listCard.classList.remove('template');
	listContainer.appendChild(listCard);

	var title = listCard.querySelector('.card-title');
	var title = listCard.querySelector('.card-title');


	title.innerText = name.name;

	//Remove the list template

	//console.log(name.name);
});


//console.log(listTemplate);
