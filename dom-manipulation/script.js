//an array of quote objects 
let quotes = JSON.parse(localStorage.getItem('quotes')) || [

    {text: 'Life doesnt get easier or more forgiving; we get stronger and more resilient.', category: 'Life'},
    {text: 'We will either find a way, or make one.', category: 'Growth'},
    {text: 'She stood in the storm and when the wind did not blow her way, she adjusted her sails.', category: 'Resilience'},
    {text: '"Do not judge me by my success, judge me by how many times I fell down and got back up again', category: 'Character'},
    {text: 'This is no time for ease and comfort. It is time to dare and endure', category: 'Belief'},
    {text: 'Courage is not the absence of fear, but rather the judgment that something else is more important than fear.', category: 'Life'},
    {text: 'Only those who dare to fail greatly, can ever achieve greatly.', category: 'Resilience'},

]; 

//function to save quotes to local storage

function saveQuotes(){
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

//function to display a random quote called showRandomQuote

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><b>Category: ${randomQuote.category}</b></p>`;

    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote)); //saves the last function
}

//function to load the last viewed quote

function loadLastViewedQuote(){
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote){
        const parsedQuote = JSON.parse(lastQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${parsedQuote.text}</p><p><b>Category: ${parsedQuote.category}</b></p>`; //displays the last quote and its category
    }
    else{
        showRandomQuote();
    }
}

//function  to create a form for adding new quotes

function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    formContainer.innerHTML = `
      <form id="addQuoteForm">
        <label for="quoteText">Quote:</label><br>
        <input type="text" id="quoteText" name="quoteText" required><br><br>
        <label for="quoteCategory">Category:</label><br>
        <input type="text" id="quoteCategory" name="quoteCategory" required><br><br>
        <button type="submit">Add Quote</button>
      </form>`;

    document.body.appendChild(formContainer);

    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const newQuoteText = document.getElementById('quoteText').value;
        const newQuoteCategory = document.getElementById('quoteCategory').value; 

        if (newQuoteText && newQuoteCategory){
            quotes.push({ text: newQuoteText, category: newQuoteCategory });

            saveQuotes() //saves the updated quotes array in local storage. Calling a function inside another function

            form.reset();

            alert('Quotes imported successfully!')

        } else{
            alert('Kindly fill in both entries')
        }


    });

}

//function to export quotes as JSON file

function exportQuotesasJsonFile(){
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    //creating a download link
    const a = document.createElement('a');
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

//function to import quotes from JSON file
function importFromJsonFile(event){
    const fileReader = new FileReader() //reads the contents of the file
    fileReader.onload = function(event){
        try{
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes); //merges newly imported quotes with existing
                saveQuotes(); //saves the updated quotes on local storage
                alert('Quotes imported successfully!');
            }
            else{
                throw new Error('Invalid Format');
            }
        } 
        catch (error){
            alert('failed to import quotes.');
        }
    }
};


//listener to show a random quote when button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

//listener to export quotes to JSON 
document.getElementById('exportQuotes').addEventListener('click', exportQuotesasJsonFile);

//listener to import quotes from a file
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

document.addEventListener('DOMContentLoaded', () => {
    loadLastViewedQuote();
    createAddQuoteForm();
}); 