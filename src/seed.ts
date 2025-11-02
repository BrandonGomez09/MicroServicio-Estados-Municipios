import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { StateEntity } from "./infrastructure/database/entities/StateEntity";
import { MunicipalityEntity } from "./infrastructure/database/entities/MunicipalityEntity";

// La lista completa de 32 estados y sus 5 municipios
const data = [
  { id: 1, name: 'Aguascalientes', municipalities: ['Aguascalientes', 'Jesús María', 'Calvillo', 'Rincón de Romos', 'Pabellón de Arteaga'] },
  { id: 2, name: 'Baja California', municipalities: ['Tijuana', 'Mexicali', 'Ensenada', 'Playas de Rosarito', 'Tecate'] },
  { id: 3, name: 'Baja California Sur', municipalities: ['La Paz', 'Los Cabos', 'Comondú', 'Mulegé', 'Loreto'] },
  { id: 4, name: 'Campeche', municipalities: ['Campeche', 'Carmen', 'Champotón', 'Calkiní', 'Escárcega'] },
  { id: 5, name: 'Coahuila', municipalities: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña'] },
  { id: 6, name: 'Colima', municipalities: ['Manzanillo', 'Colima', 'Villa de Álvarez', 'Tecomán', 'Armería'] },
  { id: 7, name: 'Chiapas', municipalities: ['Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas', 'Comitán de Domínguez', 'Ocosingo'] },
  { id: 8, name: 'Chihuahua', municipalities: ['Juárez', 'Chihuahua', 'Cuauhtémoc', 'Delicias', 'Hidalgo del Parral'] },
  { id: 9, name: 'Ciudad de México', municipalities: ['Iztapalapa', 'Gustavo A. Madero', 'Álvaro Obregón', 'Tlalpan', 'Coyoacán'] },
  { id: 10, name: 'Durango', municipalities: ['Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro', 'Tamazula'] },
  { id: 11, name: 'Guanajuato', municipalities: ['León', 'Irapuato', 'Celaya', 'Salamanca', 'Silao de la Victoria'] },
  { id: 12, name: 'Guerrero', municipalities: ['Acapulco de Juárez', 'Chilpancingo de los Bravo', 'Iguala de la Independencia', 'Zihuatanejo de Azueta', 'Tlapa de Comonfort'] },
  { id: 13, name: 'Hidalgo', municipalities: ['Pachuca de Soto', 'Mineral de la Reforma', 'Tizayuca', 'Tulancingo de Bravo', 'Tula de Allende'] },
  { id: 14, name: 'Jalisco', municipalities: ['Guadalajara', 'Zapopan', 'Tlajomulco de Zúñiga', 'San Pedro Tlaquebpaque', 'Tonalá'] },
  { id: 15, name: 'México', municipalities: ['Ecatepec de Morelos', 'Nezahualcóyotl', 'Naucalpan de Juárez', 'Tlalnepantla de Baz', 'Toluca'] },
  { id: 16, name: 'Michoacán', municipalities: ['Morelia', 'Uruapan', 'Zamora', 'Lázaro Cárdenas', 'Zitácuaro'] },
  { id: 17, name: 'Morelos', municipalities: ['Cuernavaca', 'Jiutepec', 'Cuautla', 'Yautepec', 'Temixco'] },
  { id: 18, name: 'Nayarit', municipalities: ['Tepic', 'Bahía de Banderas', 'Santiago Ixcuintla', 'Compostela', 'Ixtlán del Río'] },
  { id: 19, name: 'Nuevo León', municipalities: ['Monterrey', 'Apodaca', 'Guadalupe', 'General Escobedo', 'San Nicolás de los Garza'] },
  { id: 20, name: 'Oaxaca', municipalities: ['Oaxaca de Juárez', 'San Juan Bautista Tuxtepec', 'Juchitán de Zaragoza', 'Santa Cruz Xoxocotlán', 'Salina Cruz'] },
  { id: 21, name: 'Puebla', municipalities: ['Puebla', 'Tehuacán', 'San Martín Texmelucan', 'San Andrés Cholula', 'Amozoc'] },
  { id: 22, name: 'Querétaro', municipalities: ['Querétaro', 'San Juan del Río', 'Corregidora', 'El Marqués', 'Cadereyta de Montes'] },
  { id: 23, name: 'Quintana Roo', municipalities: ['Benito Juárez', 'Solidaridad', 'Othón P. Blanco', 'Cozumel', 'Tulum'] },
  { id: 24, name: 'San Luis Potosí', municipalities: ['San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles', 'Matehuala', 'Rioverde'] },
  { id: 25, name: 'Sinaloa', municipalities: ['Culiacán', 'Mazatlán', 'Ahome', 'Guasave', 'Salvador Alvarado'] },
  { id: 26, name: 'Sonora', municipalities: ['Hermosillo', 'Cajeme', 'Nogales', 'San Luis Río Colorado', 'Navojoa'] },
  { id: 27, name: 'Tabasco', municipalities: ['Centro', 'Cárdenas', 'Comalcalco', 'Macuspana', 'Cunduacán'] },
  { id: 28, name: 'Tamaulipas', municipalities: ['Reynosa', 'Matamoros', 'Nuevo Laredo', 'Victoria', 'Tampico'] },
  { id: 29, name: 'Tlaxcala', municipalities: ['Tlaxcala', 'Huamantla', 'Apizaco', 'San Pablo del Monte', 'Chiautempan'] },
  { id: 30, name: 'Veracruz', municipalities: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Córdoba', 'Poza Rica de Hidalgo'] },
  { id: 31, name: 'Yucatán', municipalities: ['Mérida', 'Kanasín', 'Valladolid', 'Tizimín', 'Progreso'] },
  { id: 32, name: 'Zacatecas', municipalities: ['Zacatecas', 'Fresnillo', 'Guadalupe', 'Jerez', 'Río Grande'] },
];

async function seedDatabase() {
  try {
    // 1. Inicializar la conexión
    await AppDataSource.initialize();
    console.log('Conexión de sembrado iniciada.');

    // 2. Obtener los repositorios
    const stateRepository = AppDataSource.getRepository(StateEntity);
    const municipalityRepository = AppDataSource.getRepository(MunicipalityEntity);

    // 3. Limpiar tablas (en orden: hijos primero)
    console.log('Limpiando base de datos...');
    await municipalityRepository.query('TRUNCATE TABLE "municipalities" RESTART IDENTITY CASCADE');
    await stateRepository.query('TRUNCATE TABLE "states" RESTART IDENTITY CASCADE');

    // 4. Insertar datos
    console.log('Insertando 32 estados y 160 municipios...');
    for (const stateData of data) {
      // Creamos el estado
      const state = new StateEntity();
      state.id = stateData.id;
      state.name = stateData.name;
      await stateRepository.save(state);

      // Creamos los municipios para este estado
      const municipalities = stateData.municipalities.map(munName => {
        const municipality = new MunicipalityEntity();
        municipality.name = munName;
        municipality.state = state; // TypeORM maneja la relación state_id
        return municipality;
      });
      await municipalityRepository.save(municipalities);
    }

    console.log('¡Sembrado completado con éxito!');

  } catch (error) {
    console.error('Error durante el sembrado:', error);
  } finally {
    // 5. Cerrar la conexión
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Conexión de sembrado cerrada.');
    }
  }
}

// Ejecutar el script
seedDatabase();