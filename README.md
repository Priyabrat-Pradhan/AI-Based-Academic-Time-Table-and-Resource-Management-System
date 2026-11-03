# AI-Based Academic Time Table and Resource Management System

This project includes a React application built with Vite and the original standalone HTML pages.

## Run the React app

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

## Run the Django API

In a second terminal, start Django from the backend project directory:

```sh
cd backend/academic_tms
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The Vite development server proxies `/api` requests to Django at
`http://127.0.0.1:8000`. The dashboard displays counts from the backend models;
student and resource counts remain unavailable until those models are added.
