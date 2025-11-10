# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Subscription Based System

This project is a **full-stack subscription management system** where users can register, login, view their subscription status, access protected services only if their subscription is active, and renew their subscription monthly or yearly.

### 🚀 Live Demo
- **Frontend:** https://pnm-1.netlify.app/login  
- **Backend (API):** https://pnm-tgxe.onrender.com/api

---

##  Features

###  User Registration
- Users register with:
  - Email
  - Password
  - Subscription Start Date
  - Subscription Duration (Monthly or Yearly)
- System automatically calculates subscription **End Date** based on the selected duration.

###  Login & Authentication
- Secure authentication using **JWT Tokens**.
- Token stored and used for authorized API requests.

###  Subscription Status
- Displays:
  - Email Address
  - Subscription Status → `Active` / `Expired`
  - Subscription End Date (Dynamically calculated)

###  Access Control
- If **Active** → User can access protected service.
- If **Expired** → User must **Renew Subscription**.

###  Subscription Renewal
- Extend subscription by:
  - +1 Month
  - +1 Year

---

##  Tech Stack

| Layer | Technology Used |
|------|-----------------|
| Frontend | React.js, Axios, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JSON Web Token (JWT) |

---

##  Setup Instructions (Local Development)

###
 1️ Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>

2️ Install Frontend Dependencies

cd frontend
npm install
npm start

3️ Install Backend Dependencies

cd backend
nodemon index.js
