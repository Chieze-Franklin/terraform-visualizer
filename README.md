# Terraform Visualizer

<video controls>
  <source src="https://user-images.githubusercontent.com/6097630/224209573-f374df10-9e6a-4af9-abd0-6b68f9eb82fa.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

https://user-images.githubusercontent.com/6097630/224209573-f374df10-9e6a-4af9-abd0-6b68f9eb82fa.mp4

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

### Reading Content from Files

You can provide the Terraform config by selecting one or more Terraform files from your local machine.

You do this by clicking the upload icon (<svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000" stroke="#fff" stroke-width="20" d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64
            624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456
            194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z" />
        </svg>) at the bottom left and then selecting the relevant files.

<video controls>
  <source src="https://user-images.githubusercontent.com/6097630/224458708-2f16a54d-5570-46f6-872e-5da2f77793b8.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

https://user-images.githubusercontent.com/6097630/224458708-2f16a54d-5570-46f6-872e-5da2f77793b8.mp4

### Reading Content from the Text Editor

You can provide the Terraform config by typing it into the in-app text editor

You do this by clicking the code icon (<svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            d="M16 4C14 4 11 5 11 9C11 13 11 15 11 18C11 21 6 23 6 23C6 23 11 25 11 28C11 31 11 35 11 39C11 43 14 44 16 44" />
            <path fill="#000" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            d="M32 4C34 4 37 5 37 9C37 13 37 15 37 18C37 21 42 23 42 23C42 23 37 25 37 28C37 31 37 35 37 39C37 43 34 44 32 44" />
        </svg>) at the bottom left. This brings up a text editor into which you can begin typing.

<video controls>
  <source src="https://user-images.githubusercontent.com/6097630/224459591-c3d2fc9b-8350-4fd3-aaac-af443488d799.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

https://user-images.githubusercontent.com/6097630/224459591-c3d2fc9b-8350-4fd3-aaac-af443488d799.mp4

### Loading Content from URL

You can provide the Terraform config via the URL using the `content` URL query.

>> http://localhost:3000/?content={ URL-ENCODED CONTENT }

First, use any URL-encoder (e.g. https://www.urlencoder.org/) to encode the Terraform config.

![image](https://user-images.githubusercontent.com/6097630/218086422-91116d68-b186-43f7-b14e-8383e58c5cdb.png)

Then, provide the encoded value in the URL by assigning it to the `content` query.

![image](https://user-images.githubusercontent.com/6097630/218087143-6eae9448-ff25-4cc9-8c06-ad3582277dc5.png)
