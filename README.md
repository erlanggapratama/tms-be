# TMS-BE (Task Management System - Backend)

## 📋 Deskripsi Project

Task Management System Backend adalah aplikasi RESTful API untuk mengelola tugas (task) dengan sistem autentikasi pengguna. Aplikasi ini dibangun menggunakan Fastify framework dengan TypeScript dan menggunakan Prisma ORM untuk koneksi database PostgreSQL.

## ⏰ Timeline Pengerjaan

- **Waktu Mulai**: 15 April 2026, 18:00 WIB
- **Waktu Selesai**: 15 April 2026, 22:00 WIB

## 🚀 Cara Menjalankan Project

### Prerequisites

- Node.js (version 22 atau lebih tinggi)
- PostgreSQL database
- npm

### Langkah Instalasi

1. **Clone dan Install Dependencies**

   ```bash
   cd tms-be
   npm install
   ```

2. **Setup Environment Variables**
   Buat file `.env` di root folder dengan konfigurasi berikut:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/tsm_db"
   JWT_SECRET="your-secret-key-here"
   PORT=3000
   ```

3. **Setup Database**

   ```bash
   # (Optional) Create DB menggunakan Prisma create-db lalu copy connection string
    npx create-db

   # Run database migrations
   npx prisma migrate dev

   # Generate Prisma client
   npx prisma generate
   ```

4. **Menjalankan Server**

   ```bash
   # Development mode
   npm start

   # Server akan berjalan di http://localhost:3000
   ```

5. **Menjalankan Test**
   ```bash
   npm test
   ```

### API Endpoints

- `POST /register` - Registrasi user baru
- `POST /create-task` - Membuat task baru (perlu authentication)
- `GET /task` - Mendapatkan daftar task (perlu authentication)
- `GET /task/:id` - Mendapatkan spesifik daftar task (perlu authentication)
- `PUT /task/:id` - Update task (perlu authentication)
- `DELETE /task/:id` - Hapus task (perlu authentication)

## � Dokumentasi API dengan Swagger

Aplikasi ini menggunakan **Swagger** untuk dokumentasi API yang interaktif dan mudah digunakan. Swagger terintegrasi dengan Fastify menggunakan plugin resmi `@fastify/swagger` dan `@fastify/swagger-ui`.

### Mengakses Swagger UI

Setelah server berjalan, Anda dapat mengakses dokumentasi API melalui:

```
http://localhost:3000/docs
```

### Fitur Swagger UI

- **Dokumentasi Interaktif**: Semua endpoint API dapat ditest langsung dari browser
- **Schema Validation**: Menampilkan struktur request dan response yang expected
- **Authentication Testing**: Mendukung testing dengan JWT token
- **Response Examples**: Contoh response untuk setiap endpoint
- **Model Definitions**: Definisi schema untuk User dan Task

> **💡 Tips**: Gunakan Swagger UI untuk testing API selama development. Swagger secara otomatis generate dokumentasi berdasarkan schema yang didefinisikan di routes.

## �🔧 Keputusan Teknis

### Framework dan Library

- **Fastify**: Dipilih karena performanya yang sangat tinggi dibanding Express.js, memiliki built-in schema validation, dan TypeScript support yang excellent
- **Prisma ORM**: Memberikan type-safety yang kuat, auto-completion yang baik, dan kemudahan dalam database migration management
- **PostgreSQL**: Database yang robust dan scalable untuk production, mendukung relational data dengan baik
- **JWT Authentication**: Stateless authentication yang cocok untuk REST API dan mudah di-scale
- **TypeScript**: Memberikan type safety dan better developer experience, mengurangi runtime errors

### Arsitektur

- **Schema Validation**: Menggunakan JSON Schema untuk validasi input API
- **Error Handling**: Centralized error handling untuk konsistensi response
- **ES Modules**: Menggunakan ES modules untuk kompatibilitas modern

### Database Design

- **UUID sebagai Primary Key**: Lebih secure dan menghindari sequential ID guessing
- **Relational Design**: User dapat memiliki banyak Task (one-to-many relationship)
- **Timestamp Tracking**: created_at dan updated_at untuk audit trail

### Security

- **JWT Secret**: Environment-based secret untuk keamanan
- **Input Validation**: Semua input divalidasi sebelum processing
- **Authentication Middleware**: Memproteksi semua route yang membutuhkan autentikasi

## 📝 Asumsi yang Dibuat

### Teknis

- **Environment**: Development environment menggunakan local PostgreSQL
- **Authentication**: JWT tidak memerlukan refresh token untuk simplicity
- **Logging**: Menggunakan built-in Fastify logger untuk development

### Data

- **User Phone**: Optional field karena tidak semua user memiliki nomor telepon
- **Task Description**: Optional field karena beberapa task mungkin cukup dengan title saja
- **No Soft Delete**: Data yang dihapus benar-benar dihapus dari database
- **No Role Management**: Semua user memiliki permission yang sama

## 📋 Struktur Project

```
src/
├── controllers/     # Request handling logic
├── services/       # Business logic
├── routes/         # Route definitions
├── schemas/        # Validation schemas
├── lib/           # Shared utilities
└── test/          # Test files

prisma/
├── schema.prisma   # Database schema

```

## 🧪 Testing

Project menggunakan Vitest untuk unit testing dengan fokus pada:

- Controller logic testing
- Service layer testing
- Database operations testing
- API endpoint integration testing
