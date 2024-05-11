# Setup Instructions

1. Make sure you've setup your github credentials with git
2. Clone the repo, `git clone https://github.com/CozyWear/frontend`
3. cd into the directory
4. Install nodejs (v18.17.1), using `https://github.com/Schniz/fnm` find instructions for your OS here (https://github.com/Schniz/fnm/blob/master/README.md) and do `fnm install`
5. Install all dependencies of the project, `npm install`

# Running a Local Development Server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
