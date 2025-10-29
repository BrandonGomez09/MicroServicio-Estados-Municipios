# --- Fase 1: Construcción (Instalar dependencias) ---
# Usamos una imagen oficial de Node.js (versión 18) como base
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

COPY package.json package-lock.json ./

# Instalamos las dependencias de producción
RUN npm install --omit=dev

# --- Fase 2: Producción (Preparar la app final) ---
# Empezamos desde una imagen limpia de Node.js
FROM node:18-alpine

WORKDIR /app

# Copiamos las dependencias ya instaladas de la fase 'builder'
COPY --from=builder /app/node_modules ./node_modules

# Copiamos el resto de nuestro código (src, prisma, package.json, etc.)
COPY . .

# MUY IMPORTANTE: Generamos el cliente de Prisma
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
# Esto es necesario para que Prisma funcione dentro de Docker
RUN npx prisma generate

# Exponemos el puerto 3000 (el puerto en el que corre nuestra app)
# Este puerto solo será visible DENTRO de la red de Docker
EXPOSE 3000

# El comando para iniciar la aplicación
CMD [ "npm", "start" ]