// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // BASE_URL:'https://our-river-our-life-api.herokuapp',
  OROL_API_URL: 'https://our-river-our-life-api.herokuapp/',
  REDIRECT_URL: 'http://localhost:4200',
  production: false,
  firebase: {
    apiKey: "AIzaSyALR2ZDTTyZXGBRFeCV0AHd0S-TV_GWYm8",
    authDomain: "our-river-our-life-7823b.firebaseapp.com",
    databaseURL: "https://our-river-our-life-7823b.firebaseio.com",
    projectId: "our-river-our-life-7823b",
    storageBucket: "our-river-our-life-7823b.appspot.com",
    messagingSenderId: "1085141870142",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
