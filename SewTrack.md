# 🧵 SewTrack

> A web-based Store Management and Tailoring Repair System designed for small textile businesses.

SewTrack is a business management system built for small stores that sell textile products while also offering tailoring and clothing repair services. It helps store owners manage inventory, sales, purchases, repair orders, suppliers, expenses, and daily business operations in one centralized platform.

---

## 📌 Overview

Many small textile stores still rely on notebooks or spreadsheets to track inventory, sales, and repair services. SewTrack digitizes these processes by providing an easy-to-use web application that helps store owners:

- Track inventory in real time
- Record product sales
- Manage tailoring and repair orders
- Monitor business and household expenses
- Manage suppliers
- View business performance through dashboards and reports

---

# ✨ Features

## 🔐 Authentication

- Secure login
- Role-based access
- Password encryption
- Protected API routes

---

## 📦 Product Management

- Create products
- Update product information
- Archive products
- Product categories
- SKU generation
- Barcode support
- Product images
- Product search
- Low stock monitoring
- Product availability status

---

## 🗂 Category Management

- Create categories
- Update categories
- Archive categories
- Category codes
- Product grouping

---

## 🚚 Supplier Management

- Manage suppliers
- Contact information
- Supplier remarks
- Purchase history
- Active/Inactive suppliers

---

## 📥 Purchase Management

- Record purchases
- Purchase multiple products
- Automatic stock increase
- Purchase history
- Purchase remarks
- Purchase references

---

## 📊 Inventory Management

- Real-time stock monitoring
- Automatic stock updates
- Stock adjustment
- Stock movement history
- Initial stock recording
- Minimum stock alerts

Stock movements include:

- Initial Stock
- Purchases
- Sales
- Damaged Items
- Personal Use
- Returns
- Manual Adjustments

---

## 🛒 Sales Management

- Create sales invoices
- Multiple products per sale
- Automatic stock deduction
- Invoice generation
- Payment method tracking
- Sales history
- Customer name (optional)
- Sales remarks

---

## 🧵 Repair Order Management

- Receive repair orders
- Customer information
- Item description
- Repair cost
- Repair status tracking
- Due date monitoring
- Ready for pickup notifications
- Completed repair history

Repair Status:

- Pending
- In Progress
- Ready for Pickup
- Completed
- Cancelled

---

## 👥 Customer Management

- Customer directory
- Customer contact information
- Repair history
- Purchase history
- Customer notes

---

## 💰 Expense Management

Track expenses by category.

Examples:

- Business Expenses
- Household Expenses
- Capital (Puhunan)
- Utilities
- Transportation
- Maintenance
- Others

---

## 📈 Dashboard

View important business statistics including:

- Today's Sales
- Today's Repair Income
- Today's Expenses
- Monthly Revenue
- Low Stock Products
- Out of Stock Products
- Pending Repairs
- Repairs Ready for Pickup

---

## 📜 Activity Logs

Track important user activities.

Examples:

- Product Created
- Product Updated
- Purchase Recorded
- Sale Created
- Repair Updated
- Expense Added

---

## 🔎 Search & Filtering

Available across most modules.

- Search by name
- Search by SKU
- Search by category
- Search by supplier
- Search by customer
- Filter by status
- Filter by date
- Pagination support

---

# 📊 Reports *(Planned)*

- Daily Sales Report
- Monthly Sales Report
- Inventory Report
- Purchase Report
- Expense Report
- Repair Report
- Supplier Report
- Profit Summary

---

# 💵 Daily Cashbook *(Planned)*

Automatically summarize daily business cash flow.

Example:

```text
Opening Cash

+ Sales

+ Repair Income

- Expenses

-----------------

Closing Cash
```

---

# 🏗 Tech Stack

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation

### Frontend *(Planned)*

- React
- Vite
- Axios
- React Router
- Tailwind CSS

---

# 📂 Project Structure

```text
src
│
├── config
├── controllers
├── middleware
├── routes
├── services
├── validators
├── utils
├── constants
├── errors
└── prisma
```

---

# 🚀 Future Enhancements

- Barcode Scanner
- Receipt Printing
- QR Code Support
- Sales Analytics
- Profit Analytics
- Mobile Responsive Dashboard
- Multi-user Support
- Cloud Backup
- Export to Excel
- Export to PDF
- Email Notifications
- SMS Notifications
- Product Image Gallery

---

# 🎯 Project Goals

SewTrack aims to help small textile businesses transition from manual record keeping to a modern digital management system by providing:

- Better inventory control
- Accurate financial tracking
- Organized repair management
- Faster business operations
- Centralized records
- Better decision making through reports

---

# 👨‍💻 Developer

Developed by **Jeric Ken Verano**

Built as a portfolio project and a real-world business management solution for small textile stores and tailoring shops.