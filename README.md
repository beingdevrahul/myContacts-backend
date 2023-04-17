# myContacts-backend
myContacts backend is basically a project to save the contacts of different users who can sign in and and save their contacts on the cloud for which i have used technologies Node Js, Express Js and mongo DB as a database. I have also used bcrypt js for password hashing and jwt token for autorization.

first you have to install all the node modules by run the command 
# npm insall
then you have to create a dotenv file .env and initialize the variables 

PORT=8080
CONNECTION_STRING=YOUR CONNECTION STRING FOR MONGO DB
ACCESS_TOKEN_SECRET= INITIALIZE SOME SECRET FOR JWT ACCESS TOKEN

then run the command 
# nodemon server.js
