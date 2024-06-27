# Podcast Application

Welcome to the Podcast Application README! This project is designed to showcase various features related to browsing, listening, and managing favorite episodes of podcasts.

## Project Overview

The Podcast Application is built to provide users with an intuitive interface to browse, listen to episodes, mark favorites, and manage their podcast preferences. It utilizes React for frontend development and integrates with a backend API to fetch dynamic podcast data.

## Setup Instructions

To run the project locally, follow these steps:

### Prerequisites

Node.js installed on your machine
npm or yarn package manager

### Steps

1. Clone the repository:
   ``` Bash
   git clone <repository_url>
   cd podcast-application
   ```

2. Install dependencies:
   ``` Bash
   npm install or yarn install
   ```

3. Run the development server:
   ``` Bash
   npm run dev or yarn run dev
   ```

4. Open your browser:
   ``` Bash
   Visit http://localhost:5173 or the provided one to view the application.
   ```

## Features and Functionality

### User Stories Addressed

The application addresses several user stories to enhance the user experience:

- Show Names and Sorting: Displays show names alphabetically sorted by default.
- Season and Episode Details: Provides details such as season count, episode count, and last updated date for each show.
- Episode Management: Allows marking episodes as favorites, viewing favorite episodes, and managing favorite episodes by season and show.
- Audio Player: Features a persistent audio player for continuous listening across different pages.
- Data Fetching: Fetches all show data from an API endpoint, ensuring dynamic content updates without hardcoding.
Loading States: Displays loading states while fetching initial data and updating content.
- Metatags and Icons: Includes custom metatag information and a favicon generated via realfavicongenerator.net for better browser integration.

## Project Structure and Code Quality

The project follows a structured approach with clean and readable code. Key points include:

Folder Structure: Organized structure for components, utils, and API interactions.
Commit History: Clear and concise commit messages reflecting feature additions, changes, or fixes.

Deployment: The project is deployed on Netlify, accessible via [PodcastApp](https://innran532podcastapp.netlify.app/).