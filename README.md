# Delivrix Saas - Backend NodeJS / TypeScript

This project is Node.js project with Typescript and Prettier.

## Prerequisites

-   Node.js 16+
-   Yarn or NPM
-   PostgreSQL
-   Prisma 4+

## Installation

-   Install dependencies

```bash
yarn install
```

-   Configure database

```bash
Update password and username in .env file
npx prisma migrate dev
```

-   Start Application

```bash
yarn dev
```

The application is launched by [Nodemon,](https://nodemon.com) which automatically restart the application on file
change.
