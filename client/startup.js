  Meteor.startup(function () {
    AccountsEntry.config({
     // logo: 'logo.png'                  // if set displays logo above sign-in options
     // privacyUrl: '/privacy-policy'     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
     // termsUrl: '/terms-of-use'         // if set adds link to terms  'you agree to ...' on sign-up page
      homeRoute: '/',                    // mandatory - path to redirect to after sign-out
      dashboardRoute: '/services',      // mandatory - path to redirect to after successful sign-in
      profileRoute: 'profile',
      passwordSignupFields: 'EMAIL_ONLY',
      showSignupCode: false,
      showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
      extraSignUpFields: [
       {             // Add extra signup fields on the signup page
        field: "firstName",                           // The database property you want to store the data in
        name: "",  // An initial value for the field, if you want one
        label: "First Name",                      // The html lable for the field
        placeholder: "",                 // A placeholder for the field
        type: "text",                            // The type of field you want
        required: true                           // Adds html 5 required property if true
       },
       {             // Add extra signup fields on the signup page
        field: "lastName",                           // The database property you want to store the data in
        name: "",  // An initial value for the field, if you want one
        label: "Last Name",                      // The html lable for the field
        placeholder: "",                 // A placeholder for the field
        type: "text",                            // The type of field you want
        required: true                           // Adds html 5 required property if true
       },
       {             // Add extra signup fields on the signup page
        field: "company",                           // The database property you want to store the data in
        name: "",  // An initial value for the field, if you want one
        label: "Company",                      // The html lable for the field
        placeholder: "",                 // A placeholder for the field
        type: "text",                            // The type of field you want
        required: true                           // Adds html 5 required property if true
       }

       ],
       fluidLayout: false,               // Set to true to use bootstrap3 container-fluid and row-fluid classes.
       useContainer: true,               // Set to false to use an unstyled "accounts-entry-container" class instead of a bootstrap3 "container" or "container-fluid" class. 
       signInAfterRegistration: false,    // Set to false to avoid prevent users being automatically signed up upon sign-up e.g. to wait until their email has been verified. 
       emailVerificationPendingRoute: '/verification-pending', // The route to which users should be directed after sign-up. Only relevant if signInAfterRegistration is false.
       showSpinner: true,                // Show the spinner when the client is talking to the server (spin.js)
       spinnerOptions: { color: "#000", top: "80%" } // options as per [spin.js](http://fgnass.github.io/spin.js/)

    });
  });