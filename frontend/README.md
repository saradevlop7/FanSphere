# 2. `README.md` — Frontend (React + Vite)

```markdown
# FanSphere — Frontend Application (React + Vite)

Le client Frontend de **FanSphere** propose une interface utilisateur dynamique, moderne et réactive permettant aux utilisateurs de découvrir des artistes, de s'abonner à leurs profils et de suivre leurs dernières nouveautés.

---

## 🛠️ Stack Technique

* **Bibliothèque UI :** React.js (Hooks, Context/State)
* **Outil de Build :** Vite
* **Client HTTP :** Axios
* **Routage :** React Router DOM
* **Styles :** CSS3 Moderne (Flexbox, Grid, Animations Custom)
* **Conteneurisation :** Docker (Node 18 Alpine)

---

## 🚀 Fonctionnalités Principales

* 🎨 **Interface Dynamique :** Affichage en temps réel des cartes d'artistes récupérées depuis l'API Laravel.
* 🔐 **Espace Authentification :** Formulaires de connexion et d'inscription liés à l'API avec stockage sécurisé du jeton dans le `localStorage`.
* ❤️ **Système Interactif Follow / Unfollow :** Boutons d'action réactifs mettant à jour instantanément le compteur d'abonnements dans la barre de navigation.
* 📱 **Design Responsive :** Adaptation fluide sur Desktop, Tablette et Mobile.
* ⏱️ **Gestion UX :** États de chargement (*loading skeletons*) et gestion appropriée des erreurs HTTP.

---

## 📁 Structure du Projet

```text
frontend/
├── src/
│   ├── assets/          # Images, logos et ressources statiques
│   ├── components/      # Composants réutilisables (Navbar, Cards, Buttons)
│   ├── pages/           # Pages de l'application (Login, Register, DiscoverArtists)
│   ├── services/        # Instance Axios et appels API
│   ├── App.jsx          # Configuration des routes
│   └── main.jsx         # Point d'entrée React
├── Dockerfile           # Configuration Docker pour l'environnement Frontend
├── docker-compose.yml   # Fichier de déploiement Docker
└── package.json         # Dépendances du projet