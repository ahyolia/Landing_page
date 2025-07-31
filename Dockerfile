# Étape 1 : Build de l'application avec Node.js
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si présent)
COPY package*.json ./

# Vérifier que package.json existe
RUN test -f package.json || (echo "package.json not found" && exit 1)

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Lancer le build Webpack
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:alpine

# Copier les fichiers générés (dossier dist) dans le répertoire Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]