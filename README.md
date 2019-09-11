# NextJS Slicknode Starter

This is a basic starter project for a blog powered by a [Slicknode](https://slicknode.com) backend
and NextJS for the frontend.  

## Installation

You have to have an active [Slicknode account](https://slicknode.com) and the Slicknode CLI needs to be
installed on your computer:

    npm install -g slicknode@latest


### Backend 

To deploy the backend to your Slicknode account, navigate to the `server` folder run the following 
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


