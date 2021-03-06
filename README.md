# react-message-queue

## Stack
Client: 
- ReactJS
- Redux
- TypeScript


Server (if I do create one):
- NodeJS
- Express
- Jest (idk if I can be bothered)
- TypeScript
- NGINX



## Specification
- Must use functional React, though can use as many components as I want.



### Interface
- Text box to enter text
- Button to submit message
- Dedicated area for notifications



### Base Function
- [ ] Allow user to enter message, and store it in the redux store when user submits
- [ ] A separate component should get the message and display it as a notification
- [ ] Display each notification for 5 seconds, with an individual 5 second timer for each notification and no "hang"
- [ ] After 5 seconds has passed, remove the message from the redux store.



### Ideas
- [ ] Add a character limit and update as user types, warning if the surpass
- [ ] ~~Store messages in localStorage~~ Create a backend because I'm bored?
- [ ] Create a db of accounts, no password cause I'm lazy.
- [ ] When a user types in an existing username, they are "logged in"
- [ ] When logged in, they are presented with a simple dropdown/list of users (not "friends", just all existing accounts)
- [ ] User can select whom to message
- [ ] Only one message window open at once, keep messages cached (in Redux?) between changes. Do not keep messages locally between page refresh.
- [ ] No deleting or editing, for simplicity sake because I cannot be bothered with checking diff/update time. I guess something like [React Query](https://react-query.tanstack.com/) could be useful, but I've not used it (yet?).



## Reproduction steps
Everything was under Windows 10 without WSL, except where specified



### Client
- `>  npx create-react-app client --template typescript`
- `> cd client`
- `> npx eslint --init`
- - `To check syntax, find problems, and enforce code style`
- - `JavaScript modules (import/export)`
- - `React`
- - `Does your project use TypeScript?` -> `Yes`
- - `Browser`
- - `Use a popular style guide`
- - `Google`
- - `JavaScript`
- - `Would you like to install them now with npm?` -> `Yes`
- Then I overwrote the ESLint config with my own, from [here](https://github.com/adi73434/web-tutorials-and-snippets), and changed it a bit.
- `> npm install` (probably, I forgot)
- `> npm audit fix`
- Convert LF -> CRLF with WSL: `> find . -type d \( -name node_modules -o -path ./.git \) -prune -false -o -type f -name '*.*' -print0 | xargs -0 unix2dos` (Reference [here](https://stackoverflow.com/a/4210072))
- Exit WSL
- `> npm install typedoc react-redux react-router-dom @types/react-redux @types/react-router-dom stylelint stylelint-config-idiomatic-order`
- `> npm install @reduxjs/toolkit redux-devtools`

Note that for some reasons, TypeDoc was only documenting things that were *exported* from within the `index.tsx` file. So everything has to be exported pointlessly like this, even though on another project this wasn't the case.

I copied/referenced the folder structure and some of the files (`app/hooks.ts`, `app/store.ts`) from `npx create-react-app --template redux-typescript`. Reading the docs and going through the template folder feels like a haze dream now, so I don't know exactly what came from what.

I also set up React's dynamic routing within the `features/app.ts` file; however, this can be extended with nested routes within other files.


### Server
- `> npm init`
- `> npm install typescript express`
- `> npm install --save-dev nodemon ts-node typedoc @types/express @types/node`
- `> npx eslint --init`, same as Client but withour React and targeting Node. I think I also had some issue and needed to manually install `typescript-eslint`
- I copied my nodemon config from [here](https://github.com/adi73434/web-tutorials-and-snippets/blob/master/nodemon.json)
- Specify type as module in package.json



#### Production

Prior to running the server, you must build it with `> npm run build`. I chose to do this instead of automatically recompiling every time you start the server.


You can either install `pm2` globally and use the provided script files, or install it locally and use the npm scripts. It is not installed locally (as of time of writing) so you'd have to install it if you want to use the npm scripts.


##### ESM:
I tried using `--node-args="-r esm"`, as per [this post](https://stackoverflow.com/a/63815347/13310905), but that didn't work. I also tried replacing `-r esm` with `--es-module-specifier-resolution=node` but that didn't do it. I can't really be bothered figuring this out right now.


- Set `module` in `tsconfig.json` to `ES2020`
- Either:
- - `> npm run prod-esm`
- Or:
- - `> ./scripts/prod-esm.sh`



##### CommonJS:
- Set `module` in `tsconfig.json` to `commonjs`
- Either:
- - `> npm run prod-commonjs`
- Or:
- - `> ./scripts/prod-commonjs.sh`
