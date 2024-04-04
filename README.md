# BlogWebsite

BlogWebsite is a full-stack project that combines Vite React for the client-side and Node.js for the server-side. It is a dynamic blog website that allows users to register, log in, create posts, manage their profile, and interact with various functionalities seamlessly. This README provides an overview of the project structure, technologies used, and deployment information.

## Project Structure

The project is organized into two main folders:

- **client**: Contains the client-side code implemented using Vite React.
- **server**: Contains the server-side code implemented using Node.js.

## Server-Side Technologies

The server-side utilizes the following technologies and frameworks:

- **Express**: A minimalist web framework for Node.js that simplifies building web applications and APIs.
- **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- **jsonwebtoken**: Used for generating and verifying JSON Web Tokens for user authentication.
- **bcrypt**: A library for securely hashing passwords.
- **Cloudinary**: Utilized for storing avatar images, cover images, and post images securely in the cloud.
- **Gemini AI**: Integrated for generating post content automatically.

## Client-Side Functionalities

The client-side encompasses various pages and functionalities:

- **Home Page**: Displays the latest posts and allows users to navigate to different sections of the website.
- **About Page**: Provides information about the website and its purpose.
- **Contact Page**: Allows users to send messages via email using Nodemailer.
- **Profile Page**: Enables users to manage their profile, delete posts, and log out.
- **Login Page**: Allows existing users to sign in securely by entering their credentials.
- **Signup Page**: Enables new users to create an account by providing necessary information.
- **Search Bar**: Enables users to search for specific content within the website by entering keywords or phrases.

## Deployment

The website is deployed to Vercel, and the domain name is [tusharpachouri.tech](https://tusharpachouri.tech). Vercel provides a seamless deployment experience and ensures the website is accessible to users worldwide.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/TusharPachouri/blog-website.git`
2. Navigate to the `client` folder: `cd client`
3. Install dependencies: `npm install`
4. Start the client-side server: `npm run dev`
5. Open another terminal and navigate to the `server` folder: `cd ../server`
6. Install server dependencies: `npm install`
7. Start the server: `npm run dev`

The client-side will be running on `http://localhost:5173/`, and the server will be running on `http://localhost:8080`.

## Contributing

Contributions to the project are welcome. Please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Screenshots

## Home Page :-

![Screenshot 1](/Screenshots/screenshot.png)

## SignUp Page :-

![Screenshot 2](/Screenshots/screenshot1.png)

## AI Generated Content :-

![Screenshot 2](/Screenshots/screenshot2.png)

## After LogIn :-

![Screenshot 2](/Screenshots/screenshot3.png)

## Profile Page :-

![Screenshot 2](/Screenshots/screenshot4.png)
