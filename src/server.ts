import { createApp } from './app';
import { AppDataSource } from '@config/data-source';

const main = async () => {
  try {

    await AppDataSource.initialize();
    console.log('Base de datos conectada exitosamente.');

    const app = createApp();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

main();
