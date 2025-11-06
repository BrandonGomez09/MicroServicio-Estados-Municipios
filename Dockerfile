# --- Fase 1: Instalación y Compilación ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Fase 2: "Podar" dependencias (Pruner) ---
FROM node:18-alpine AS pruner
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
RUN npm install --omit=dev

# --- Fase 3: Imagen Final (Final) ---
FROM node:18-alpine AS final
WORKDIR /app

# Copiar solo las dependencias de producción
COPY --from=pruner /app/node_modules ./node_modules
# Copiar el código JavaScript compilado
COPY --from=builder /app/dist ./dist
# Copiar el package.json (Node lo necesita)
COPY package.json .

# --- LA LÍNEA MÁGICA QUE FALTABA ---
# Copiar el tsconfig.json para que tsconfig-paths pueda leer los alias
COPY tsconfig.json .

EXPOSE 3000
# El comando de inicio ahora usa tsconfig-paths (package.json)
CMD [ "npm", "start" ]