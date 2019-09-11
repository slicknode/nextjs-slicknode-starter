# NextJS Slicknode Starter

This is a basic starter project for a blog powered by a [Slicknode](https://slicknode.com) backend
and NextJS for the frontend.  

## Installation

You have to have an active [Slicknode account](https://slicknode.com) and the Slicknode CLI needs to be
installed on your computer:

    npm install -g slicknode@latest


### Backend 

To deploy the backend to your Slicknode account, navigate to the `server` folder and run the following 
commands: 

    cd ./server
    
    # Pull the dependencies
    slicknode pull

    # Deploy the project to the cloud
    slicknode deploy

After a few moments, the GraphQL endpoint will be ready. To get the endpoint, run this in the `server`
directory:

    slicknode endpoint

This will be needed for the client setup. 

### Client

To start the client, navigate to the `client` folder and install the dependencies:

    cd ./client
    yarn
    
Open the file `client/config.js` and set your Slicknode endpoint.

To start the server in dev mode with hot reload, automatic build etc:

    yarn start
    
To create a production build and start the server in prod mode:

    yarn build
    yarn start

For more customization and options, checkout the [official NextJS documentation](https://github.com/zeit/next.js/)

### Note

This is just an example to illustrate how NextJS can be connected to a Slicknode backend and not meant for
production usage. To make this production ready, you would probably implement a custom mutation with a registration
flow and remove the permissions for anonymous users to be able to create new users etc. 
