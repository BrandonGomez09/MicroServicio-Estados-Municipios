import "reflect-metadata";
import { DataSource } from "typeorm";

// Ya no necesitamos importar las entidades aquí,
// TypeORM las encontrará usando las rutas de abajo.

export const AppDataSource = new DataSource({
  type: "postgres",
  
  // Estas variables de entorno las obtendrá de docker-compose.yml
  // cuando corra en Docker.
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "admin_user",
  password: process.env.POSTGRES_PASSWORD || "admin_password",
  database: process.env.POSTGRES_DB || "states_municipalities_db",
  
  synchronize: true, // 'true' crea las tablas automáticamente (bueno para dev)
  logging: false, // Cambia a 'true' para ver las consultas SQL en la consola
  
  entities: [
    // --- ESTA ES LA CORRECCIÓN ---
    // Esta ruta es para desarrollo (ej: npm run dev)
    "src/infrastructure/database/entities/**/*.ts",
    
    // Esta ruta es para producción (ej: docker compose up)
    // Le dice a TypeORM que lea los archivos .js compilados
    "dist/infrastructure/database/entities/**/*.js"
  ],
  migrations: [],
  subscribers: [],
});