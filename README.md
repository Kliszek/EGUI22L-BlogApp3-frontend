# BlogApp 3 - EGUI laboratories project
A project realized as a third assignment for Graphical User Interfaces classes.

### What is it?
This web application is the third part of BlogApp trilogy.
It functions as a basic blog application, and has functionalities such as:
* Users can register new accounts and log into them
* The user can create his own blog and manage it (add and manipulate entries)
* The user can browse all the blogs created by other users and read them
* It is possible to filter the blogs using a searchbar and hide blogs belonging to other users
* The site is **fully responsive**
* The site manages 404 error and provides the user with the info about other errors.


### Technologies used

* React with TypeScript
* Passport.js with JsonWebTokens
* Axios API
* Bootstrap 5
* MongoDB database with mongoose


### How to launch it

Before launching the project, make sure you have nodejs and npm installed on your computer.
You'll also need a backend for this application, which is located [here](https://gitlab-stud.elka.pw.edu.pl/egui22l/Jakub_Radoslaw_Kliszko/egui22l-blogapp3-backend). The instructions for the backend are located on its repository website.
Make sure to run it.
Then, download the frontend files and update all the nodejs packages, by running

    npm install

After this you can run the project, by executing

    npm run start

and you can access the website at http://localhost:3000.
