# Dynamic Form Management Web Application

This project is a web application for managing dynamic forms. It includes a **backend** built with .NET Core and a **frontend** developed using Angular. The backend uses an MSSQL database running in a Docker container.

---

## Features

- User authentication and authorization.
- Dynamic form creation, viewing, and submission.
- Frontend using Angular and Bootstrap.
- Backend API built with .NET Core for form management.

---

## Prerequisites

1. **Docker** installed and running on your system.
2. **Node.js** and **npm** installed for the Angular frontend.
3. **.NET SDK 7+** installed for the backend.
4. A Git client for cloning the repository.

---

## Getting Started

1. Clone the Repository  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Setup MSSQL Server with Docker
   Ensure Docker is installed and running on your system. Then, use the following command to create and run an MSSQL Server container:
   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=password!" \
   -p 1433:1433 --name mssql-container -d mcr.microsoft.com/mssql/server:2022-latest
MSSQL Server Details:
	•	Host: localhost
	•	Port: 1433
	•	Username: sa
	•	Password: password --> Modify this according to something more strong
 
3. Backend Setup
   ```bash
   cd backend
   dotnet restore
   dotnet build

  Update the connection string in appsettings.json with the following values:
   ```bash
   {
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost,1433;Database=YourDatabaseName;User Id=sa;Password=YourStrongPassword123!"
    }
   }
  ```
 Run database migrations:
   ```bash
   dotnet ef database update
```
Start the backend server:
   ```bash
  dotnet run
```

4. Frontend Setup
   Navigate to the frontend folder, install dependencies, and start the Angular development server:
   ```bash
    cd frontend
    npm install
    ng serve --open
   ```
5. Access the Application
  <br/>
   Frontend: Open http://localhost:4200 in your browser. <br/>
  Backend API: Accessible at http://localhost:5154 (you can change it in the application.properties).
