# Honest Canteen
A place where everybody can sell and buy anything for however much. Built with **Svelte** for the front-end, **Express** for the back-end, and **Heroku's PostgreSQL** for the database. The app from back front is built with **Typescript**.

## Svelte (Front-End)
### Tools and Libraries
- [Fontawesome](https://www.npmjs.com/package/font-awesome) (icons)
- [Axios](https://www.npmjs.com/package/axios) (fetch library)

## Express (Back-End)
### Tools and Libraries
- [JWT](https://www.npmjs.com/package/jsonwebtoken) (authentication)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (encyrption)
- [pg](https://www.npmjs.com/package/pg) (database query)
### Authentication
The site uses a JSON Web Token stored in the site's cookie that expires in a day.

## Notice of Possible Error
Clear the local storage on this website if there are some errors.

## Run the Client Locally

1. Clone the repository to your local device with `git clone`
2. Run `npm run dev`
3. Go to `localhost:8080`

*It's recommended however to just open the hosted site for convenience sake through the link **[here](https://courageous-gumdrop-00bd28.netlify.app/)***

## Features
Feel for yourself the creature comfort that will accompany you in using this app
#### Synchronized marketplace
Your action has wide-reaching consequences to the whole marketplace as your action, from selling questionable items to withdrawing the store's whole funds, directly affects all other users using this app
#### Helpful message
The app will tell you if something goes wrong during login, logout, purchase, etc., never leaving you in the dark thinking whether your action is registered or not
#### Secure trading
Only registered and logged in students (all of whom are definitely honest in nature) can buy and sell items in the marketplace, as well as taking or giving money to the store's balance. Thus preventing leeches and parasites from stealing items or the store's money.