// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  pusher: {
    cluster: 'ap2',
    key: '1c0b6051b2d1e4977cbd',
  },
  API_ENDPOINT: 'https://dev.api.onepagespotlight.com/api/1.0',
  API_IMAGE: 'https://cdn.onepagespotlight.com/',
  API_DOMAIN: 'https://dev.onepagespotlight.com/'
};
