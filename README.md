# 🛒 Elnen E-Commerce

A full-stack e-commerce application built with the MERN stack.  
The project provides a complete shopping experience with authentication, product management, shopping cart, orders, coupons, featured products, and cloud image uploads.

## 🚀 Features

### 👤 Authentication
- User registration and login
- Protected routes
- Admin authentication
- Role-based access control

### 🛍️ Products
- Browse products
- Product categories
- Search products
- Featured products
- Product recommendations
- Admin product management
- Create, update, and delete products
- Manage product stock

### 🛒 Shopping Cart
- Add products to cart
- Increase/decrease product quantity
- Remove products from cart
- Clear cart
- Stock validation
- Automatic cart totals

### 🎟️ Coupons
- Create coupons
- Apply coupons
- Discount percentage
- Coupon expiration
- Active/inactive coupons

### 📦 Orders
- Create orders
- View user orders
- Admin order management
- Order status management
- Stock management after orders

### 💳 Payments
- Stripe checkout integration

### ☁️ Cloud Storage
- Product image uploads using Cloudinary

## 🛠️ Technologies

### Frontend
- React.js
- React Router
- Zustand
- Tailwind CSS
- Axios
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- radis

### Services
- MongoDB Atlas
- Cloudinary
- Stripe

## 📁 Project Structure


Elnen-Store/
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── service ---|
                   |
                   --- service.js
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── stores/
│   ├── ...
│   └── main.jsx
│
├── .env.example
├── .gitignore
└── README.md


## 🔐 Environment Variables
Create a .env file in the backend directorty
- PORT=5000
- MONGO_URI=
- TOKEN_NODE=
- NODE_ENV=
- REDIS_URL=
- CLOUD_NAME=
- CLOUD_API_KEY=
- CLOUD_API_SECRET=
- STRIPE_SECRET_KEY=
- CLIENT_URI=

# 🔑 Admin Features
  The admin dashboard allows administrators to:

- Manage products
- Create and edit products
- Delete products
- Manage featured products
- Manage coupons
- View orders
- Update order status
- View analytics

# 📌 Future Improvements
- Product reviews and ratings
- Wishlist
- Pagination
- Advanced filtering
- Improved testing
- Better order tracking
- More payment options

👨‍💻 Author
Mohamed Ismail
GitHub: https://github.com/mohamedisamil2
