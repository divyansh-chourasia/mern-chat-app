# Chat

Text chat between people who have signed up. The page is React in `frontend/`. The API is Express in `backend/`, with Socket.IO on the same server. The API does not serve the page.

Sign up with a full name, a username, a password, the same password again, and a gender of male or female. The passwords have to match, and the username has to be free. The password is stored as a bcrypt hash. The profile photo is a generated avatar URL, one shape for male and another for anything else. Login checks the username and password and sets an httpOnly cookie named `mern-chat-app-token` for fifteen days. The cookie is marked secure unless `NODE_ENV` is exactly `development`. Logout clears that cookie. The browser keeps the account in `localStorage` under `mern-chat-app-user`.

The home page lists every user except you. Pick one and the messages for that pair load from the conversation's `message` array. Sending creates the conversation if needed, saves the text, and emits `newMessage` to the other person's socket when they are connected. The socket also broadcasts who is online. It only accepts the Vite dev server on port 5173, and the page always opens the socket on port 5000 of this machine.

## Run

`npm run server` starts from the repo root, and that is where `dotenv` looks for this file:

```
PORT=5000
MONGO_DB_URL=...
JWT_SECRET=...
NODE_ENV=development
```

`PORT` falls back to 5000. The variable name is `MONGO_DB_URL`.

```bash
npm install
npm run server
```

In another terminal, from `frontend/`:

```bash
npm install
npm run dev
```

Vite proxies `/api` to port 5000. Its port is left at the Vite default, 5173, which matches the socket's allowed origin.
