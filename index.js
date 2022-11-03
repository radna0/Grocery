var arrInput = ['Name', 'Amount'],
	button = document.querySelector('.form_submit'),
	form = document.querySelector('.form'),
	list_display = document.querySelector('.list_display');

button.addEventListener('click', function (event) {
	event.preventDefault();

	const uuid = (Math.random() + 1).toString(36).substring(2);

	let newItemBox = document.createElement('li'),
		checkItem = document.createElement('input'),
		deleteItem = document.createElement('button');

	newItemBox.classList.add('list_display_box');
	newItemBox.setAttribute('id', uuid);
	checkItem.setAttribute('type', 'checkbox');
	checkItem.classList.add('list_display_checkbox');
	deleteItem.innerText = 'Delete';
	deleteItem.classList.add('list_display_delete');

	deleteItem.addEventListener('click', function (event) {
		newItemBox.remove();
	});

	newItemBox.appendChild(checkItem);

	for (var i = 0; i < arrInput.length; i++) {
		let box = document.createElement('p');
		let input = document.querySelector(`#input${arrInput[i]}`).value;
		if (input.value === '') {
			break;
		}
		box.innerText = input;
		box.classList.add('list_display_items');
		newItemBox.appendChild(box);
	}

	newItemBox.appendChild(deleteItem);

	list_display.appendChild(newItemBox);
	form.reset();
});
