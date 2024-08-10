## Introduction

You need to create a Firebase project.

https://firebase.google.com/docs/web/setup

## Add .env file on the root of the project

.env

```txt
NEXT_PUBLIC_FIREBASE_API_KEY=***
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=***
NEXT_PUBLIC_FIREBASE_PROJECT_ID=***
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=***
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=***
NEXT_PUBLIC_FIREBASE_APP_ID=***
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=***

LOGIN_ID=***
LOGIN_PASSWORD=***
```

## Run playwright with ui mode

```sh
pnpm e2e:ui
```

Click the play button.

<img width="1512" alt="スクリーンショット 2024-07-18 19 37 56" src="https://github.com/user-attachments/assets/aad8d717-7fc1-4b49-9cff-cd5f98ee9577">
