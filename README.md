📦 Sales Order Management System

Full-stack application built using .NET 9 Web API, React + Vite, Redux Toolkit, and SQL Server to create, manage, list, and print sales orders with PDF export (browser print).

🚀 Features
🔹 Frontend (React + Vite + Redux Toolkit)

Create Sales Orders

Customer auto-fill from dropdown

Add/remove item rows dynamically

Auto-calculated totals (Excl, Tax, Incl)

View all Sales Orders

Print / Save Invoice as PDF (Browser print)

Clean UI with reusable components

API integration using Axios

Client-side error handling

🔹 Backend (.NET 9 Web API + EF Core + SQL Server)

RESTful API Endpoints

Clients, Items, Sales Orders, and Order Items

Entity Framework Core with Migrations

SQL Server relational database

Controller → Service → Repository architecture

Validation and error handling

🔹 Database

Entities:

Client

Item

SalesOrder

SalesOrderItem

🛠️ Tech Stack
Frontend

React (Vite)

Redux Toolkit

TypeScript

Axios

TailwindCSS

Backend

.NET 9 Web API

Entity Framework Core 9

SQL Server

C#

📂 Project Structure
Backend
/backend
 ├── Controllers/
 ├── Services/
 ├── Models/
 ├── DTOs/
 ├── Data/ (DbContext)
 ├── Migrations/
 └── Program.cs

Frontend
/frontend
 ├── src/
 │    ├── pages/
 │    ├── redux/
 │    │    ├── store.ts
 │    │    └── slices/
 │    ├── components/
 │    │    └── ui/
 │    ├── services/
 │    └── App.tsx
 └── index.css

⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/yourname/sales-order-management-system.git
cd sales-order-management-system

🖥️ Backend Setup (.NET)
2️⃣ Install Dependencies
cd backend
dotnet restore

3️⃣ Update Connection String

Open appsettings.json:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=SalesDB;Trusted_Connection=True;TrustServerCertificate=True"
}

4️⃣ Run Migrations
dotnet ef database update

5️⃣ Run API
dotnet run


Backend runs at:
👉 http://localhost:5167

🌐 Frontend Setup (React)
6️⃣ Install Dependencies
cd frontend
npm install

7️⃣ Run Frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173