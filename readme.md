# Course Learning App - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

The backend system for a Course Learning Platform that connects students and teachers in a dynamic learning environment.

## Features

### Core Functionality
- **User Authentication**: JWT-based secure authentication
- **Role-Based Access**: Separate student and teacher functionalities
- **Content Management**: Courses, lessons, and topics hierarchy
- **Learning Progress Tracking**: Student enrollment and completion tracking
- **Analytics Dashboard**: Comprehensive teacher statistics

### Teacher Features
- Create and manage courses with rich content
- Structure content into lessons and topics
- View student engagement analytics
- Receive and manage student feedback

### Student Features
- Browse and enroll in courses
- Track learning progress
- Submit feedback and ratings
- Follow favorite teachers

## Tech Stack

- **Runtime**: Node.js 18.x
- **Framework**: Express.js 4.x
- **Database**: MongoDB 6.x
- **ORM**: Mongoose
- **Language**: TypeScript 5.x
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js 18.x
- MongoDB 6.x
- npm 9.x or yarn 1.x

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/course-learning-app-backend.git
   cd course-learning-app-backend

2. install nodemodules:
    ```bash
    npm i

3. run in dev mode:
    ```bash
    npm run start:dev

4. run in prod mode:
    ```bash
    npm run start:prod


### connect postman_collection.json to postman to test