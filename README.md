# React + Vite
# Invoice Management Frontend

## Description

This is the frontend of the Invoice Management System, which interacts with the backend through RESTful APIs to create, edit, view, and display invoices. The frontend is built using **React.js** and designed to provide a user-friendly interface for managing invoices. It offers the following functionalities:

- **View all invoices**: Display a list of all invoices stored in the backend.
- **Create new invoices**: Add new invoices by specifying item details, tax rates, and currency.
- **Edit existing invoices**: Modify the details of previously created invoices.
- **View invoice details**: Display detailed information for each invoice including item breakdown, taxes, and totals.

The frontend communicates with a backend developed using **Node.js**, **Express.js**, and **MongoDB**.

---

## Tech Stack

The frontend is built using the following technologies:

- **React.js**: JavaScript library for building user interfaces.
- **React Router**: For handling routing between pages.
- **Axios**: For making HTTP requests to the backend API.
- **Bootstrap**: For styling and responsive design.
- **JavaScript**: Language for adding interactive behavior.

---

## Features

- **Invoice List**: Display all invoices retrieved from the backend API.
- **Add Invoice**: Form for creating a new invoice with multiple items, quantities, prices, and tax details.
- **Edit Invoice**: Edit existing invoices, including adding or removing items and taxes.
- **View Invoice Details**: View a specific invoice with all its details.
- **Responsive Design**: Mobile-friendly layout using Bootstrap.

---

## How to Clone and Run the Frontend Project

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your machine.

### Steps to Run the Frontend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Rohit-Mangasule/Invoice-app-Frontend

2. **Navigate to the Project Directory:**

    ```bash
    cd frontend/invflow_frontend
    npm install
    ```


3. **Run the Application:**

    ### Start the frontend development server by running:

    ```bash
    npm start
    ```
    ### The application will now be running at http://localhost:5173.
    

**Test the Application**

Once the frontend is running, you can test the application by visiting http://localhost:5173 in your browser. You will be able to:

- View all invoices.
- Create a new invoice.
- Edit existing invoices.
- View details for individual invoices.
- **Make sure that the backend is also running so that the frontend can interact with it through the RESTful API.**



**Frontend Functionality Overview**

- View Invoices: Lists all invoices retrieved from the backend.
- Add Invoice: A form that allows you to create new invoices.
- Edit Invoice: Edit previously created invoices with updated details.
- View Invoice Details: Shows detailed information for each individual invoice.


**Backend Repository**

The backend for this project is located [here](https://github.com/Rohit-Mangasule/Invoice-app-Backend). Ensure the backend is running so the frontend can interact with it to manage invoices.

