// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dataApi: 'https://63ebd4a8be929df00ca2f645.mockapi.io/api',
  authConfig: {
    domain: 'dev-7gluwe2a66r2oqkb.us.auth0.com',
    clientId: '8ex9IpaFn9p60Am3asW7lGFriYKeywHF',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
