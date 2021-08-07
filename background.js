// background.js

// once installed: request name --> send message for that? once you get it back, you store the message. also request country
let country = 'USA';
chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({ country });
    console.log('Default country set to', `country: ${country}`);
  });

chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.runtime.onStartup.addListener(() =>
    chrome.storage.sync.get(['firstInstalled'], function(result) {
        console.log('This user has already set up their profile ' + result.key)
    })
)
  

// send message to frontend which requests the name that is stored, and this name is then displayed to the screen.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'send_name') {
        chrome.storage.local.set({
            name: "Deya"
        });


        chrome.storage.local.get('name', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });
                console.log("there was an error")
                return;
            }
            sendResponse({
                message: 'success',
                payload: data.name
            })
        });

        return true;
    }
})

