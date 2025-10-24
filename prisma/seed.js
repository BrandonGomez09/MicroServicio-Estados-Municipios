const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Estructura de datos:
// Un arreglo de estados, donde cada estado tiene un arreglo de sus municipios.
// Usamos los IDs oficiales del INEGI para los estados.
const data = [
  { id: 1, name: 'Aguascalientes', municipalities: ['Aguascalientes', 'Jesús María', 'Calvillo', 'Rincón de Romos', 'Pabellón de Arteaga'] },
  { id: 2, name: 'Baja California', municipalities: ['Tijuana', 'Mexicali', 'Ensenada', 'Playas de Rosarito', 'Tecate'] },
  { id: 3, name: 'Baja California Sur', municipalities: ['La Paz', 'Los Cabos', 'Comondú', 'Mulegé', 'Loreto'] },
  { id: 4, name: 'Campeche', municipalities: ['Campeche', 'Carmen', 'Champotón', 'Calkiní', 'Escárcega'] },
  { id: 5, name: 'Coahuila', municipalities: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña'] },
  { id: 6, name: 'Colima', municipalities: ['Manzanillo', 'Colima', 'Villa de Álvarez', 'Tecomán', 'Armería'] },
  { id: 7, name: 'Chiapas', municipalities: ['Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas', 'Comitán de Domínguez', 'Suchiapa'] },
  { id: 8, name: 'Chihuahua', municipalities: ['Juárez', 'Chihuahua', 'Cuauhtémoc', 'Delicias', 'Hidalgo del Parral'] },
  { id: 9, name: 'Ciudad de México', municipalities: ['Iztapalapa', 'Gustavo A. Madero', 'Álvaro Obregón', 'Tlalpan', 'Coyoacán'] },
  { id: 10, name: 'Durango', municipalities: ['Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro', 'Tamazula'] },
  { id: 11, name: 'Guanajuato', municipalities: ['León', 'Irapuato', 'Celaya', 'Salamanca', 'Silao de la Victoria'] },
  { id: 12, name: 'Guerrero', municipalities: ['Acapulco de Juárez', 'Chilpancingo de los Bravo', 'Iguala de la Independencia', 'Zihuatanejo de Azueta', 'Tlapa de Comonfort'] },
  { id: 13, name: 'Hidalgo', municipalities: ['Pachuca de Soto', 'Mineral de la Reforma', 'Tizayuca', 'Tulancingo de Bravo', 'Tula de Allende'] },
  { id: 14, name: 'Jalisco', municipalities: ['Guadalajara', 'Zapopan', 'Tlajomulco de Zúñiga', 'San Pedro Tlaquepaque', 'Tonalá'] },
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

async function main() {
  console.log('Iniciando el sembrado (seeding)...');

  // Limpiamos la base de datos en el orden correcto (primero hijos, luego padres)
  console.log('Borrando datos existentes...');
  await prisma.municipality.deleteMany({});
  await prisma.state.deleteMany({});

  console.log('Creando nuevos estados y municipios...');


  for (const state of data) {

    // Creamos el estado
    const newState = await prisma.state.create({
      data: {
        id: state.id,
        name: state.name,
      },
    });

    // Creamos los datos de los municipios para este estado
    const municipalitiesToCreate = state.municipalities.map((munName) => {
      return {
        name: munName,
        state_id: newState.id, 
      };
    });

 
    await prisma.municipality.createMany({
      data: municipalitiesToCreate,
    });
  }

  console.log('¡Sembrado completado con éxito! (32 estados y 160 municipios)');
}

// Ejecutamos la función main y manejamos errores
main()
  .catch((e) => {
    console.error('Error durante el sembrado:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Cerramos la conexión a la base de datos
    await prisma.$disconnect();
  });