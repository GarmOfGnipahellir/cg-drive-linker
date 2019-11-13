import request from 'request'

// Client ID and API key from the Developer Console
const CLIENT_ID =
    '404368161278-r3fe3d25hsifgnrjmnhspt9kln1589sc.apps.googleusercontent.com'
const API_KEY = 'AIzaSyAtW45PibDKV137Zjhf0hqG6Ulm34FFiKs'

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES =
    'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'

const api = {
    oauthToken: null,

    onGapiLoad(cbSignIn, cbPicker) {
        gapi.load('client:auth2', () => this.onAuthLoad(cbSignIn))
        gapi.load('picker', cbPicker)
    },

    onAuthLoad(cbSignIn) {
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
                    gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(signedIn =>
                            api.onSignedIn(signedIn, cbSignIn)
                        )

                    // Handle the initial sign-in state.
                    api.onSignedIn(
                        gapi.auth2.getAuthInstance().isSignedIn.get(),
                        cbSignIn
                    )
                },
                function(error) {
                    appendPre(JSON.stringify(error, null, 2))
                }
            )
    },

    onSignedIn(signedIn, cbSignIn) {
        cbSignIn(signedIn)

        if (signedIn) {
            let authResult = gapi.auth2
                .getAuthInstance()
                .currentUser.get()
                .getAuthResponse()
            if (authResult && !authResult.error) {
                this.oauthToken = authResult.access_token
            }
        }
    },

    signIn() {
        gapi.auth2.getAuthInstance().signIn()
    },

    signOut() {
        gapi.auth2.getAuthInstance().signOut()
    },

    createPicker(cbPicker) {
        if (this.oauthToken) {
            var picker = new google.picker.PickerBuilder()
                .addView(
                    new google.picker.DocsView()
                        .setParent('root')
                        .setIncludeFolders(true)
                )
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setOAuthToken(this.oauthToken)
                .setDeveloperKey(API_KEY)
                .setCallback(cbPicker)
                .setTitle('Select file(s)')
                .build()
            picker.setVisible(true)
        }
    },

    getFixedLink(fileId, cbSuccess) {
        request.post(
            {
                url: `https://www.googleapis.com/drive/v3/files/${fileId}/permissions?key=${API_KEY}`,
                headers: {
                    Authorization: `Bearer ${this.oauthToken}`,
                },
                body: {
                    role: 'reader',
                    type: 'anyone',
                },
                json: true,
            },
            (err, httpResponse, body) => {
                console.log(err, httpResponse, body)
                if (!err && httpResponse.statusCode === 200) {
                    cbSuccess(fileId)
                }
            }
        )
    },
}

export default api
