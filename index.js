//
// Duplicated Work
//
function DeleteElement(event) {
	var groceries = localStorage.getItem('grocery_list');
	groceries = JSON.parse(groceries);

	var Item = event.target.parentElement;
	Item.remove();
	groceries = groceries.filter((items) => {
		return items[0].id !== Item.id;
	});
	localStorage.setItem('grocery_list', JSON.stringify(groceries));
}
function ListDisplay(id) {
	var newItemBox = document.createElement('li'),
		checkItem = document.createElement('input'),
		deleteItem = document.createElement('button');

	newItemBox.classList.add('list_display_box');
	newItemBox.setAttribute('id', id);
	checkItem.setAttribute('type', 'checkbox');
	checkItem.classList.add('list_display_checkbox');
	deleteItem.innerText = 'Delete';
	deleteItem.classList.add('list_display_delete');

	deleteItem.addEventListener('click', DeleteElement);

	return [newItemBox, checkItem, deleteItem];
}
//
// LocalStorage
//
var groceries = localStorage.getItem('grocery_list'),
	list_display = document.querySelector('.list_display');
if (!!groceries) {
	groceries = JSON.parse(groceries);

	for (var i = 0; i < groceries.length; i++) {
		var groceriesID = groceries[i][0].id;
		var [newItemBox, checkItem, deleteItem] = ListDisplay(groceriesID);

		newItemBox.appendChild(checkItem);

		for (var j = 0; j < groceries[i].length; j++) {
			var box = document.createElement('p');
			var input = groceries[i][j].value;
			box.innerText = input;
			box.classList.add(groceries[i][j].class);

			newItemBox.appendChild(box);
		}

		newItemBox.appendChild(deleteItem);
		list_display.appendChild(newItemBox);
	}
}
//
// Load JSON data for inputs
//
var arrInput = [],
	formInput = document.querySelector('.form_input'),
	formErrors = document.querySelector('.form_errors');

fetch('./input.json')
	.then((res) => res.json())
	.then((data) =>
		data.map((item) => {
			var input = (newItemBox = document.createElement('input'));

			arrInput.push(item.id);
			input.setAttribute('id', item.id);
			newItemBox.classList.add(item.class);
			input.setAttribute('type', item.type);
			input.setAttribute('placeholder', item.placeholder);

			formInput.appendChild(input);
		})
	);
//
// Create elements for data from form
//
var button = document.querySelector('.form_submit');

button.addEventListener('click', function (event) {
	// Stop refreshing on submit
	event.preventDefault();
	// VALIDATE
	if (document.querySelector('.form_errors_passage')) {
		formErrors.innerHTML = '';
	}
	var empty = false;
	for (var i = 0; i < arrInput.length; i++) {
		var input = document.querySelector(`#${arrInput[i]}`).value.trim();
		if (input === '') {
			var error = document.createElement('p');
			error.classList.add('form_errors_passage');
			error.setAttribute('id', `${arrInput[i]}Errors`);
			error.innerText = `ERROR: Input of ${arrInput[i]} is required!`;
			formErrors.appendChild(error);
			empty = true;
		} else {
			var error = document.querySelector(`#${arrInput[i]}Errors`);
			if (error) {
				error.remove();
			}
		}
	}
	if (empty === true) {
		return null;
	} else {
		formErrors.innerHTML = '';
	}
	// Create Elements

	const uuid = (Math.random() * Math.random()).toString(36).substring(2);
	var [newItemBox, checkItem, deleteItem] = ListDisplay(uuid);
	var LocalStorageItems = [];

	newItemBox.appendChild(checkItem);

	for (var i = 0; i < arrInput.length; i++) {
		var box = document.createElement('p');
		var input = document.querySelector(`#${arrInput[i]}`).value.trim();
		box.innerText = input;
		box.classList.add('list_display_items');

		LocalStorageItems = [
			...LocalStorageItems,
			{ id: uuid, value: input, class: 'list_display_items' },
		];
		newItemBox.appendChild(box);
	}

	newItemBox.appendChild(deleteItem);
	list_display.appendChild(newItemBox);
	formInput.reset();

	// Store in LocalStorage

	if (!localStorage.getItem('grocery_list')) {
		localStorage.setItem('grocery_list', JSON.stringify([LocalStorageItems]));
	} else if (!!localStorage.getItem('grocery_list')) {
		var groceries = JSON.parse(localStorage.getItem('grocery_list'));

		localStorage.setItem(
			'grocery_list',
			JSON.stringify([...groceries, LocalStorageItems])
		);
	}
});
