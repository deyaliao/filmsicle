$('.countrypicker').countrypicker();

// current data to use, including personal and movie rec (constantly changing)

//page ready?
$(document).ready(function(){
  //trigger help page
  $("#helpIcon").click(function() {
    console.log("help page opened");
    openHelpPage()});
  $("span").click(function() {closeHelpPage()});

  // form on first page
  $("#form1").ajaxForm(function() {userSettings()})
  $(".serviceButtons").click(function(event) {
    service = event.currentTarget.id;
    saveUserSettings(service);
    console.log(service);
    // permanently orange background
    // save the service to background.js
  })
});

function openHelpPage(){
  document.getElementById("preHelpPopup").style.display = "block"
  console.log("hello")
}

function closeHelpPage(){
  document.getElementById("preHelpPopup").style.display = "none";
}

function userSettings(){
  var userName = document.getElementById("name").value
  var country = document.getElementById("country").value
  chrome.storage.local.set({
    'name': userName
  });
  chrome.storage.local.set({
    'country': country
  })
  console.log('User name is ', `name: ${userName}`);
  console.log('Default country set to', `country: ${country}`);
}


// USER NAME STORAGE
// first, send name over

// request the name of the user, so it can display on the webpage
chrome.runtime.sendMessage ({message: userName}, response => {
    if (response.message === 'success'){
      document.querySelector('.introduction').innerHTML = `Hi ${response.payload}, what to watch today?`;
    }
  }
  
)


// OPEN UP PAGE
function start(){
  chrome.storage.sync.get(['firstInstalled'], function(result){
    if (result.firstInstalled == 0) settingsPage();
    else movieSelectionPage();
  }); 
}

function settingsPage(){

}

function movieSelectionPage(){
  document.querySelector('.introduction').innerHTML = `Hi ${response.payload}, what to watch today?`;

}

//animation stuff



// API REQUEST
function getMovie(genre, streamingService, country, type, language) {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=16&page=1&language=en");
  xhr.setRequestHeader("x-rapidapi-key", "df290acf9amshf7f19199c0b7b59p1d5d67jsnb667d84b531b");
  xhr.setRequestHeader("x-rapidapi-host", "streaming-availability.p.rapidapi.com");

  xhr.send(data);

  // get list: randomize selection there, MOVIE SELECTED
}


// movie data pulled up, now must replace the words. this response is generated from getMovie, which doesn't have to be stored on backend data?
// assume movieData is that weird list, and now you just have to pull all the info --> replace what you need on html page
function writeMovie(movieData) {
  document.querySelector('.introduction').innerHTML = `Hi ${response.payload}, what to watch today?`;

}
