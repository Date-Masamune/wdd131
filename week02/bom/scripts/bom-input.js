const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // make sure your UL/OL has id="list"

button.addEventListener('click', (e) => {
    // If inside a <form>, uncomment next line or set type="button" on the button in HTML
    // e.preventDefault();

    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value.trim();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', 'Remove item');

        deleteButton.addEventListener('click', () => {
            li.remove();
            input.focus();
        });

        li.append(deleteButton);
        list.append(li);

        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
});
