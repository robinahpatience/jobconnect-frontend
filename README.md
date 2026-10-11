# JobConnect Frontend

JobConnect is a React-based job portal frontend. This repository is the
frontend fork used for the JobConnect enhancement assignment.

## Added features

1.  **Save Jobs UI** --- job seekers can save jobs from job cards and
    manage them on the Saved Jobs page.
2.  **Application Status Tracker** --- the My Applications page shows
    application totals by status and lets users filter applications by
    status.
3.  **Profile Completion Indicator** --- the job seeker profile page
    calculates and displays a completion percentage based on six profile
    items.

## Requirements

-   Node.js and npm
-   The JobConnect backend running locally
-   A configured MySQL database used by the backend

## Setup

From this repository directory:

``` bash
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173/`. Keep the
terminal open while using the site.

## Backend connection

The frontend uses the API service in `src/services/api.js`. Run the
backend separately and configure its environment variables using the
backend README. Do not commit `.env` files, passwords, tokens, or other
secrets.

## Build verification

Run:

``` bash
npm run build
```

The build completed successfully during development after the feature
changes.

## Main changed files

-   `src/App.jsx` --- registers the Saved Jobs route.
-   `src/components/JobCard.jsx` --- adds the Save Job action for job
    seekers.
-   `src/layouts/DashboardLayout.jsx` --- adds Saved Jobs navigation.
-   `src/pages/SavedJobs.jsx` --- lists and removes saved jobs.
-   `src/pages/MyApplications.jsx` --- adds status summary cards and
    filtering.
-   `src/pages/JobSeekerProfile.jsx` --- adds the profile completion
    indicator.

## Demo accounts

For local demonstration only, the seeded demo accounts use the password
`password123`:

-   Job seeker: `seeker1@jobconnect.com`
-   Employer: `employer1@jobconnect.com` or `employer2@jobconnect.com`
-   Admin: `admin@jobconnect.com`

Change or remove demo credentials before any public deployment. Do not
use these accounts for real personal data.
# for reference
git clone https://github.com/robinahpatience/jobconnect-frontend.git
