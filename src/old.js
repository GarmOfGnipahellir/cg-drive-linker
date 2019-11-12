import { initClient, handleAuthClick, handleSignoutClick, listFiles, createPicker } from './api'

var authorizeButton = document.getElementById('authorize_button')
var signoutButton = document.getElementById('signout_button')

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none'
        signoutButton.style.display = 'block'
        listFiles()
        createPicker()
    } else {
        authorizeButton.style.display = 'block'
        signoutButton.style.display = 'none'
    }
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', () => initClient(updateSigninStatus))

    authorizeButton.onclick = handleAuthClick
    signoutButton.onclick = handleSignoutClick
}

window.handleClientLoad = handleClientLoad
