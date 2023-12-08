const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B-alex';

let events = {};// initializes an empty object which is the events

async function getEvents(){//This fucntion is called getEvents which access the API when I use a fetch request???
 try{// running try cataches all errors that might occur in the fetching process
    const response = await fetch(`${apiUrl}/events`); //this is my response accessing my API
    events = await response.json(); //this takes my data from my API assigns to a variable which is events
    console.log(events); //this prints it to the console.

    renderEvents(); //pulls the information form the API
 }  catch (error) { //catches all errors
    console.error('Error fetching Event:', error); //prints the error message
 }
}

function renderEvents() {// accessing the Dom through the function called renderEvents
     const parties = document.getElementById('partyList');//accessing the element to the ul outside of the form
     console.log(events.data); //prints the events and then the data to the console.

    events.data.forEach(element => { //creating a new div for each element in the dom
        
          const party = document.createElement('li') 

          party.innerHTML = `<h3>${element.name}</h3> <p>${element.date}</p> <p>${element.location}</p> <p>${element.description}</p>`//how to edit an inner html 
          parties.appendChild(party);
      });    
  }
  getEvents()  //call the function outside to reference

document.addEventListener('DOMContentLoaded', function() {
    const Parties = document.getElementById('Parties');
    Parties.addEventListener('submit',function(event) {
        event.preventDefault()
        const name = document.getElementById('PartyFirstName').value;
        const date = document.getElementById('PartyDate').value;
        
        const location = document.getElementById('PartyLocation').value;
        const description = document.getElementById('PartyDescription').value;
  
        const party = {
        name,
        date,
        location,
        description
    };

    addPartyToList(party);

    partyList.reset();
  });
});

let party ={};

async function addPartyToList(party) {   
    const response = await fetch(`${apiUrl}/events`,{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body: JSON.stringify({
        name:party.name,
        description:party.description,
        date:new Date(party.date).toISOString(),
        location:party.location
       }),
    }
    ); //this is my response accessing my API
    
    getEvents();
    
    function addPartyToList(party) {
              
        const deleteButton = listItem.querySelector('.deleteButton');
        deleteButton.addEventListener('click', function(event) {
          event.preventDefault();
      
          const partyId = listItem.getAttribute('data-party-id');
      
          fetch(`${apiUrl}/events/${partyId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then(response => {
                if (response.ok) {
                  listItem.remove();
                } else {
                  throw new Error('Failed to delete party');
                }
              })
              .catch(error => {
                console.error('Error deleting party:', error);
        
              });
            });
          }
        }
