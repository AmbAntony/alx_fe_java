//an array of quote objects 
const quotes = [

    {text: 'Life doesnt get easier or more forgiving; we get stronger and more resilient.', Category: 'Life'},
    {text: 'We will either find a way, or make one.', Category: 'Growth'},
    {text: 'She stood in the storm and when the wind did not blow her way, she adjusted her sails.', Category: 'Resilience'},
    {text: '"Do not judge me by my success, judge me by how many times I fell down and got back up again', Category: 'Character'},
    {text: 'This is no time for ease and comfort. It is time to dare and endure', Category: 'Belief'},
    {text: 'Courage is not the absence of fear, but rather the judgment that something else is more important than fear.', Category: 'Life'},
    {text: 'Only those who dare to fail greatly, can ever achieve greatly.', Category: 'Resilience'},

]; 

//function to display a random quote called showRandomQuote

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><b>Category: ${randomQuote.Category}</b></p>`;
}

//function  to create a form for adding new quotes

function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    formContainer.innerHTML = `
      <form id="addQuoteForm">
        <label for="quoteText">Quote:</label><br>
        <input type="text" id="quoteText" name="quoteText" required><br><br>
        <label for="quoteCategory">Categoty:</label><br>
        <input type="text" id="quoteCategory" name="quoteCategory" required><br><br>
        <button type="submit">Add Quote</button>
      </form> `;

    document.body.appendChild(formContainer);

    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const newQuoteText = document.getElementById('quoteText').value;
        const newQuoteCategory = document.getElementById('quoteCategory').value; 

        if (newQuoteText && newQuoteCategory){
            quotes.push({ text: newQuoteText, Category: newQuoteCategory });
            alert('Quote added successfully')


            form.reset();
        }


    })

}

//show a random quote when button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
}); 