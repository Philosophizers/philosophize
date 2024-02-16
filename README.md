# P H I L O S O P H I Z E

[Philosophize](https://philosophize.onrender.com/) is a Philosophical Debate Platform.

## About Philosophize

The idea began as a conscious effort to counteract doomscrolling and the mass consumption of content on most social media websites. There are intentional limitations as each day there is only one central topic to discuss and users only get one vote and one comment. The goal is to enter, gain some insight, provide your opinions if you like, then close the site for the rest of the day and come back tomorrow if you would like.

## Index

[Feature List](https://github.com/yoslatif/philosophize/wiki/Features-List) | [Database Scheme](https://github.com/yoslatif/philosophize/wiki/Database-Schema) | [User's-Stories](https://github.com/yoslatif/philosophize/wiki/User-Stories) | 

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Tech Stack
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Features 
- Topics
- Topic of the Day
- Votes
- Comments

## How to utilize Philosophize
If you are interested in checking out the site, you can simply browse through the Topic of the Day, Comments, and Topic Proposal. However, if you would like to participate in the discussion or propose your own topics, please create an account!


## Future Implementation 
Will be implementing these in the near future:
- Archives Section: users can see prior discussions of prior dates
- Personal Archive: if a user particularly likes a former discussion, they can add it to their Personal Archive where it will be accessed more directly.
- Resrouces: All topics and comments will be required to have links to articles, books, podcasts, videos, etc that further detail the topic to inform potential commentors.
- User Profiles: Displays all your comments and personal archive for others to see if you choose to make it public
- Live Debate: Game-ified live debate feature that will include a host and teams on Pro and Cons side. Judge(s) determine winner. Wins and Losses are displayed on profile.

## Connect with us on ![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)
  - [Yoseph Latif](https://www.linkedin.com/in/yoseph-latif/)
