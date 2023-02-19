# Terraform Visualizer

<video controls>
  <source src="https://user-images.githubusercontent.com/6097630/219801816-44a3c629-1243-461f-abe3-5de9f9a35b49.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Terraform Visualizer displays the resources in your Terraform config (and the relationships among resources)
using a graph of nodes (for the resources) and edges (for the relationships).

This app can run as a standalone app (https://terraform-visualizer.netlify.app/) or within the
[Terraformer VS Code extension](https://marketplace.visualstudio.com/items?itemName=fchieze.terraformer).

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

## Running the App

Start the app locally by running `npm start`. Alternatively, visit the [Netlify deployment](https://terraform-visualizer.netlify.app/).

### Loading Content from URL

You can provide the Terraform config via the URL using the `content` URL query.

>> http://localhost:3000/?content={ URL-ENCODED CONTENT }

First, use any URL-encoder (e.g. https://www.urlencoder.org/) to encode the Terraform config.

![image](https://user-images.githubusercontent.com/6097630/218086422-91116d68-b186-43f7-b14e-8383e58c5cdb.png)

Then, provide the encoded value in the URL by assigning it to the `content` query.

![image](https://user-images.githubusercontent.com/6097630/218087143-6eae9448-ff25-4cc9-8c06-ad3582277dc5.png)
