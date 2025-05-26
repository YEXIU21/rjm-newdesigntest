# Casino Web Application

This project is a modern casino web application built with React.

This is the web application part of the casino project, built with React and Material UI.

## Deployment to Vercel

### Automatic Deployment

1. Go to [Vercel](https://vercel.com/) and sign up or log in
2. Connect your GitHub account if you haven't already
3. Click "Add New..." > "Project"
4. Select the "YourCasino" repository
5. Vercel will automatically detect that this is a React application
6. Configure the following settings:
   - Framework Preset: Create React App
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: build
7. Click "Deploy"

### Manual Deployment

You can also deploy using the Vercel CLI:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and follow the prompts
3. Navigate to the webapp directory
4. Run `vercel` and follow the prompts
5. For production deployment, run `vercel --prod`

## Development

```
npm install
npm start
```

The application will be available at http://localhost:3000

## Build

```
npm run build
```

This will create a production build in the `build` directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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
