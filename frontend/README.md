# 🎵 FanSphere - Fan Experience Platform

FanSphere est une application web full-stack centralisant les actualités, contenus exclusifs et événements de vos artistes préférés au sein d'une interface dynamique, moderne et sécurisée.

---

## 🛠️ Stack Technique

### **Backend**
* **Framework :** Laravel 10 (PHP 8.2+)[cite: 1]
* **API & Authentification :** Laravel Sanctum (Tokens Bearer)[cite: 1]
* **Base de données :** MySQL 8.0 (ORM Eloquent)[cite: 1]
* **Architecture :** RESTful API, Form Requests, Policies & Middlewares[cite: 1]

### **Frontend**
* **Framework :** React 18+ (Vite)[cite: 1]
* **Styling & UI :** TailwindCSS & Lucide Icons[cite: 1]
* **Routing & HTTP :** React Router DOM v6 & Axios[cite: 1]

---

## 🚀 Installation & Configuration Locale

### Prerequisites
* **PHP** >= 8.2
* **Composer**
* **Node.js** >= 18.x & **npm**
* **MySQL** >= 8.0

---

### 1. Cloner le Projet
```bash
git clone [https://github.com/votre-compte/fansphere.git](https://github.com/votre-compte/fansphere.git)
cd fansphere
# Aller dans le dossier backend (ou à la racine si projet unique)
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env :
# DB_DATABASE=fansphere
# DB_USERNAME=root
# DB_PASSWORD=

# Exécuter les migrations et seeders
php artisan migrate --seed

# Lancer le serveur Laravel
php artisan serve
# Aller dans le dossier frontend
cd ../frontend

# Installer les dépendances JS
npm install

# Lancer le serveur de développement Vite
npm run dev