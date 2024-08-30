## Introduction

You need to create a Firebase project.

https://firebase.google.com/docs/web/setup

## Add .env file on the root of the project

.env file

```txt
NEXT_PUBLIC_FIREBASE_API_KEY=***
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=***
NEXT_PUBLIC_FIREBASE_PROJECT_ID=***
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=***
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=***
NEXT_PUBLIC_FIREBASE_APP_ID=***
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=***
```

## Add Firebase Admin SDK

https://firebase.google.com/docs/admin/setup

Generate a private key file in JSON format.
https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments

Add the json file in .env file.

```txt
...
GOOGLE_APPLICATION_CREDENTIALS=firebase-adminsdk.json
```

## Run dev

```sh
pnpm dev
```
