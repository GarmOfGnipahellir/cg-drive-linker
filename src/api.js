// Client ID and API key from the Developer Console
var CLIENT_ID =
    '404368161278-r3fe3d25hsifgnrjmnhspt9kln1589sc.apps.googleusercontent.com'
var API_KEY = 'AIzaSyAtW45PibDKV137Zjhf0hqG6Ulm34FFiKs'

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
    'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file'

var pickerLoaded
var oauthToken

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
export function initClient(cb) {
    gapi.client
        .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })
        .then(
            function() {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(cb)

                // Handle the initial sign-in state.
                cb(gapi.auth2.getAuthInstance().isSignedIn.get())
            },
            function(error) {
                appendPre(JSON.stringify(error, null, 2))
            }
        )
}

/**
 *  Sign in the user upon button click.
 */
export function handleAuthClick(event) {
    gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(result => {
            let authResult = result.getAuthResponse()
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token
            }
        })
    gapi.load('picker', () => {
        pickerLoaded = true
        createPicker()
    })
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut()
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content')
    var textContent = document.createTextNode(message + '\n')
    pre.appendChild(textContent)
}

/**
 * Print files.
 */
export function listFiles() {
    gapi.client.drive.files
        .list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        })
        .then(function(response) {
            appendPre('Files:')
            var files = response.result.files
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i]
                    appendPre(file.name + ' (' + file.id + ')')
                }
            } else {
                appendPre('No files found.')
            }
        })
}

// Create and render a Picker object for picking from Google Photos.
export function createPicker() {
    if (oauthToken) {
        var picker = new google.picker.PickerBuilder()
            .addView(google.picker.ViewId.DOCS)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setOAuthToken(oauthToken)
            .setDeveloperKey(API_KEY)
            .setCallback(pickerCallback)
            .build()
        picker.setVisible(true)
    }
}

// A simple callback implementation.
function pickerCallback(data) {
    var url = 'nothing'
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0]
        url = doc[google.picker.Document.URL]
    }
    var message = 'You picked: ' + url
    document.getElementById('result').innerHTML = message
}

export class API {
    constructor() {
        this.gapiLoaded = false
        window.handleClientLoad = function() {
            this.gapiLoaded = true
        }
    }

    onGapiLoaded() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject('timed out...'))

            if (this.gapiLoaded) {
                resolve()
            }
        })
    }
}

export default api = new API()
