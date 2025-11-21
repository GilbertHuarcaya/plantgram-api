require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../db');

const User = require('../models/user.model');
const Species = require('../models/species.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const Follow = require('../models/follow.model');
const Like = require('../models/like.model');
const Save = require('../models/save.model');
const Notification = require('../models/notification.model');
const PlantProfile = require('../models/plant_profile.model');

async function seed() {
  try {
    console.log('Seeding database...');

    // clear collections (if exist)
    await Promise.all([
      User.deleteMany({}),
      Species.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Follow.deleteMany({}),
      Like.deleteMany({}),
      Save.deleteMany({}),
      Notification.deleteMany({}),
      PlantProfile.deleteMany({})
    ]);

    // Create Users
    const users = [
      {
        username: 'laura_gomez',
        email: 'laura.gomez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Laura Gomez',
        profile_pic: 'https://drive.google.com/file/d/img/laura.jpg',
        bio: 'Amante de las plantas ornamentales y el diseno web.',
        created_at: new Date('2025-10-01T10:30:00.000Z')
      },
      {
        username: 'carlos_rivera',
        email: 'carlos.rivera@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Carlos Rivera',
        profile_pic: 'https://drive.google.com/file/d/img/carlos.jpg',
        bio: 'Estudiante de biologia, explorando la naturaleza.',
        created_at: new Date('2025-10-02T14:15:00.000Z')
      },
      {
        username: 'maria_flores',
        email: 'maria.flores@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Maria Flores',
        profile_pic: 'https://drive.google.com/file/d/img/maria.jpg',
        bio: 'Jardinera urbana. Especialista en suculentas y cactus.',
        created_at: new Date('2025-10-05T08:20:00.000Z')
      },
      {
        username: 'juan_perez',
        email: 'juan.perez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Juan Perez',
        profile_pic: 'https://drive.google.com/file/d/img/juan.jpg',
        bio: 'Coleccionista de plantas tropicales. Vivero familiar desde 1995.',
        created_at: new Date('2025-10-07T16:45:00.000Z')
      },
      {
        username: 'ana_martinez',
        email: 'ana.martinez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Ana Martinez',
        profile_pic: 'https://drive.google.com/file/d/img/ana.jpg',
        bio: 'Botanica y educadora. Compartiendo conocimiento sobre plantas.',
        created_at: new Date('2025-10-10T11:00:00.000Z')
      },
      {
        username: 'pedro_sanchez',
        email: 'pedro.sanchez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Pedro Sanchez',
        profile_pic: 'https://drive.google.com/file/d/img/pedro.jpg',
        bio: 'Aficionado a las plantas carnivoras y especies raras.',
        created_at: new Date('2025-10-12T09:30:00.000Z')
      },
      {
        username: 'sofia_ramirez',
        email: 'sofia.ramirez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Sofia Ramirez',
        profile_pic: 'https://drive.google.com/file/d/img/sofia.jpg',
        bio: 'Diseñadora de jardines verticales y paisajismo sostenible.',
        created_at: new Date('2025-10-15T14:20:00.000Z')
      },
      {
        username: 'miguel_torres',
        email: 'miguel.torres@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Miguel Torres',
        profile_pic: 'https://drive.google.com/file/d/img/miguel.jpg',
        bio: 'Cultivador de orquideas. Mas de 200 especies en mi coleccion.',
        created_at: new Date('2025-10-18T10:15:00.000Z')
      },
      {
        username: 'elena_vargas',
        email: 'elena.vargas@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Elena Vargas',
        profile_pic: 'https://drive.google.com/file/d/img/elena.jpg',
        bio: 'Amante de los helechos y plantas de interior.',
        created_at: new Date('2025-10-20T13:40:00.000Z')
      },
      {
        username: 'roberto_jimenez',
        email: 'roberto.jimenez@gmail.com',
        password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        full_name: 'Roberto Jimenez',
        profile_pic: 'https://drive.google.com/file/d/img/roberto.jpg',
        bio: 'Experto en bonsais y arboles en miniatura.',
        created_at: new Date('2025-10-22T15:50:00.000Z')
      }
    ];

    const insertedUsers = await User.insertMany(users);
    console.log(`Created ${insertedUsers.length} users`);

    // Create Species (more than 20)
    const species = [
      {
        common_name: 'Monstera',
        scientific_name: 'Monstera deliciosa',
        family: 'Araceae',
        tags: ['monstera', 'follaje', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Orquidea',
        scientific_name: 'Phalaenopsis amabilis',
        family: 'Orchidaceae',
        tags: ['orquidea', 'flor', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Pothos',
        scientific_name: 'Epipremnum aureum',
        family: 'Araceae',
        tags: ['pothos', 'enredadera', 'interior'],
        created_at: new Date()
      },
      {
        common_name: 'Suculenta Echeveria',
        scientific_name: 'Echeveria elegans',
        family: 'Crassulaceae',
        tags: ['suculenta', 'roseta', 'xerofita'],
        created_at: new Date()
      },
      {
        common_name: 'Helecho de Boston',
        scientific_name: 'Nephrolepis exaltata',
        family: 'Lomariopsidaceae',
        tags: ['helecho', 'interior', 'humedad'],
        created_at: new Date()
      },
      {
        common_name: 'Ficus Lyrata',
        scientific_name: 'Ficus lyrata',
        family: 'Moraceae',
        tags: ['ficus', 'arbol', 'interior'],
        created_at: new Date()
      },
      {
        common_name: 'Cactus San Pedro',
        scientific_name: 'Echinopsis pachanoi',
        family: 'Cactaceae',
        tags: ['cactus', 'columnar', 'desertico'],
        created_at: new Date()
      },
      {
        common_name: 'Anturio',
        scientific_name: 'Anthurium andraeanum',
        family: 'Araceae',
        tags: ['anturio', 'flor', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Planta Serpiente',
        scientific_name: 'Sansevieria trifasciata',
        family: 'Asparagaceae',
        tags: ['sansevieria', 'resistente', 'purificadora'],
        created_at: new Date()
      },
      {
        common_name: 'Calathea',
        scientific_name: 'Calathea ornata',
        family: 'Marantaceae',
        tags: ['calathea', 'follaje', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Aloe Vera',
        scientific_name: 'Aloe barbadensis miller',
        family: 'Asphodelaceae',
        tags: ['aloe', 'medicinal', 'suculenta'],
        created_at: new Date()
      },
      {
        common_name: 'Begonia',
        scientific_name: 'Begonia rex',
        family: 'Begoniaceae',
        tags: ['begonia', 'follaje', 'colorido'],
        created_at: new Date()
      },
      {
        common_name: 'Filodendro',
        scientific_name: 'Philodendron hederaceum',
        family: 'Araceae',
        tags: ['filodendro', 'enredadera', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Planta de Jade',
        scientific_name: 'Crassula ovata',
        family: 'Crassulaceae',
        tags: ['jade', 'suculenta', 'arbol'],
        created_at: new Date()
      },
      {
        common_name: 'Violeta Africana',
        scientific_name: 'Saintpaulia ionantha',
        family: 'Gesneriaceae',
        tags: ['violeta', 'flor', 'interior'],
        created_at: new Date()
      },
      {
        common_name: 'Zamioculca',
        scientific_name: 'Zamioculcas zamiifolia',
        family: 'Araceae',
        tags: ['zz', 'resistente', 'brillante'],
        created_at: new Date()
      },
      {
        common_name: 'Planta Araña',
        scientific_name: 'Chlorophytum comosum',
        family: 'Asparagaceae',
        tags: ['araña', 'colgante', 'purificadora'],
        created_at: new Date()
      },
      {
        common_name: 'Costilla de Adan',
        scientific_name: 'Monstera adansonii',
        family: 'Araceae',
        tags: ['monstera', 'enredadera', 'perforada'],
        created_at: new Date()
      },
      {
        common_name: 'Pilea',
        scientific_name: 'Pilea peperomioides',
        family: 'Urticaceae',
        tags: ['pilea', 'pancake', 'moderna'],
        created_at: new Date()
      },
      {
        common_name: 'Drácena',
        scientific_name: 'Dracaena marginata',
        family: 'Asparagaceae',
        tags: ['dracena', 'arbol', 'tropical'],
        created_at: new Date()
      },
      {
        common_name: 'Hoya',
        scientific_name: 'Hoya carnosa',
        family: 'Apocynaceae',
        tags: ['hoya', 'enredadera', 'cera'],
        created_at: new Date()
      },
      {
        common_name: 'Maranta',
        scientific_name: 'Maranta leuconeura',
        family: 'Marantaceae',
        tags: ['maranta', 'prayer', 'movimiento'],
        created_at: new Date()
      },
      {
        common_name: 'Alocasia',
        scientific_name: 'Alocasia amazonica',
        family: 'Araceae',
        tags: ['alocasia', 'tropical', 'oreja'],
        created_at: new Date()
      },
      {
        common_name: 'Peperomia',
        scientific_name: 'Peperomia obtusifolia',
        family: 'Piperaceae',
        tags: ['peperomia', 'compacta', 'resistente'],
        created_at: new Date()
      }
    ];

    const insertedSpecies = await Species.insertMany(species);
    console.log(`Created ${insertedSpecies.length} species`);

    // Create Posts (more than 50)
    const posts = [];
    const postTitles = [
      { title: 'Mi nueva Monstera deliciosa', desc: 'Acabo de adquirir esta hermosa Monstera. Sus hojas son perfectas y el tamaño es ideal para mi sala.', tags: ['monstera', 'nueva', 'interior'], speciesIdx: 0 },
      { title: 'Consejos para cuidar orquideas', desc: 'Despues de años de experiencia, aqui comparto mis mejores tips para mantener orquideas saludables y florecientes.', tags: ['orquidea', 'consejos', 'cuidados'], speciesIdx: 1 },
      { title: 'Mi coleccion de suculentas', desc: 'He estado coleccionando suculentas durante 5 años. Aqui les muestro mi seleccion favorita de Echeverias.', tags: ['suculentas', 'coleccion', 'echeveria'], speciesIdx: 3 },
      { title: 'Pothos en agua vs tierra', desc: 'Experimento comparando el crecimiento de Pothos en agua versus sustrato tradicional. Resultados sorprendentes.', tags: ['pothos', 'experimento', 'propagacion'], speciesIdx: 2 },
      { title: 'Helecho de Boston gigante', desc: 'Mi helecho ha crecido increiblemente este año. Les comparto mi rutina de cuidados y fertilizacion.', tags: ['helecho', 'crecimiento', 'interior'], speciesIdx: 4 },
      { title: 'Ficus Lyrata: antes y despues', desc: 'Transformacion de mi Ficus en 6 meses. Cambio de ubicacion y riego fue clave para su recuperacion.', tags: ['ficus', 'transformacion', 'cuidados'], speciesIdx: 5 },
      { title: 'Cactus San Pedro floreciendo', desc: 'Despues de 3 años, finalmente mi cactus San Pedro florece. Las flores nocturnas son espectaculares.', tags: ['cactus', 'floracion', 'desertico'], speciesIdx: 6 },
      { title: 'Anturios rojos perfectos', desc: 'Los anturios son mis favoritos. Aqui les muestro como logro ese color rojo intenso y brillante.', tags: ['anturio', 'rojo', 'tropical'], speciesIdx: 7 },
      { title: 'Sansevieria: la planta indestructible', desc: 'Si eres principiante, la Sansevieria es para ti. Requiere minimo cuidado y purifica el aire.', tags: ['sansevieria', 'facil', 'purificadora'], speciesIdx: 8 },
      { title: 'Calathea y sus patrones', desc: 'Las Calatheas tienen los patrones mas hermosos. Esta Calathea ornata es mi orgullo.', tags: ['calathea', 'patron', 'follaje'], speciesIdx: 9 },
      { title: 'Propagacion de Aloe Vera', desc: 'Tutorial paso a paso para propagar Aloe Vera desde hijuelos. Muy facil y efectivo.', tags: ['aloe', 'propagacion', 'tutorial'], speciesIdx: 10 },
      { title: 'Begonia Rex multicolor', desc: 'La variedad de colores en las Begonias Rex es asombrosa. Esta es mi ultima adquisicion.', tags: ['begonia', 'colorida', 'variedad'], speciesIdx: 11 },
      { title: 'Filodendro trepador', desc: 'Mi filodendro ha trepado toda la pared. Les muestro como guiar su crecimiento vertical.', tags: ['filodendro', 'trepador', 'vertical'], speciesIdx: 12 },
      { title: 'Planta de Jade centenaria', desc: 'Esta Crassula ovata tiene mas de 30 años. Herencia familiar que cuido con mucho cariño.', tags: ['jade', 'antigua', 'herencia'], speciesIdx: 13 },
      { title: 'Violetas africanas en floracion', desc: 'Mis violetas florecen todo el año. El secreto esta en la luz indirecta constante.', tags: ['violeta', 'floracion', 'interior'], speciesIdx: 14 },
      { title: 'ZZ Plant: resistencia extrema', desc: 'La Zamioculca sobrevivio a un mes sin riego. Perfecta para personas ocupadas.', tags: ['zz', 'resistente', 'facil'], speciesIdx: 15 },
      { title: 'Planta araña con bebes', desc: 'Mi Chlorophytum esta produciendo muchos hijuelos. Los estoy propagando para regalar.', tags: ['araña', 'bebes', 'propagacion'], speciesIdx: 16 },
      { title: 'Monstera Adansonii colgante', desc: 'Esta Monstera adansonii luce espectacular en maceta colgante. Sus hojas perforadas son únicas.', tags: ['monstera', 'colgante', 'perforada'], speciesIdx: 17 },
      { title: 'Pilea Peperomioides: la tendencia', desc: 'La planta de moda. Mi Pilea ha crecido perfectamente y produce muchos hijuelos.', tags: ['pilea', 'moderna', 'tendencia'], speciesIdx: 18 },
      { title: 'Dracena marginata de 2 metros', desc: 'Mi Dracena alcanzo los 2 metros de altura. Impresionante presencia en el living.', tags: ['dracena', 'alta', 'interior'], speciesIdx: 19 },
      { title: 'Hoya carnosa en floracion', desc: 'Las flores de cera de la Hoya son increiblemente fragantes. Florecio despues de 2 años.', tags: ['hoya', 'flor', 'fragante'], speciesIdx: 20 },
      { title: 'Maranta: la planta que reza', desc: 'La Maranta cierra sus hojas por la noche como si rezara. Fascinante movimiento natural.', tags: ['maranta', 'movimiento', 'nocturna'], speciesIdx: 21 },
      { title: 'Alocasia Amazonica impresionante', desc: 'Las hojas oscuras y venas blancas de esta Alocasia son dramaticas y hermosas.', tags: ['alocasia', 'dramatica', 'tropical'], speciesIdx: 22 },
      { title: 'Peperomia compacta y facil', desc: 'La Peperomia es perfecta para espacios reducidos. Requiere poco mantenimiento.', tags: ['peperomia', 'compacta', 'pequeña'], speciesIdx: 23 },
      { title: 'Mi jardin vertical urbano', desc: 'Transforme mi balcon en un jardin vertical con mas de 30 plantas diferentes.', tags: ['jardin', 'vertical', 'urbano'], speciesIdx: null },
      { title: 'Terrario de suculentas', desc: 'Cree un terrario con diferentes especies de suculentas. El resultado es un mini ecosistema.', tags: ['terrario', 'suculentas', 'decoracion'], speciesIdx: 3 },
      { title: 'Rotacion de plantas segun la luz', desc: 'Sistema de rotacion para que todas mis plantas reciban luz natural equilibrada.', tags: ['luz', 'rotacion', 'cuidados'], speciesIdx: null },
      { title: 'Macetas de ceramica artesanal', desc: 'Mis nuevas macetas hechas a mano complementan perfectamente mis plantas.', tags: ['macetas', 'ceramica', 'artesanal'], speciesIdx: null },
      { title: 'Control de plagas organico', desc: 'Metodos naturales para controlar plagas sin quimicos. Muy efectivos y seguros.', tags: ['plagas', 'organico', 'natural'], speciesIdx: null },
      { title: 'Fertilizante casero para plantas', desc: 'Receta de fertilizante organico casero que ha mejorado notablemente mis plantas.', tags: ['fertilizante', 'casero', 'organico'], speciesIdx: null },
      { title: 'Propagacion por esqueje en agua', desc: 'Tecnica de propagacion que uso para multiplicar mis plantas favoritas.', tags: ['propagacion', 'esqueje', 'agua'], speciesIdx: 2 },
      { title: 'Sustrato perfecto para tropicales', desc: 'Mi mezcla de sustrato para plantas tropicales. Drenaje y retencion de humedad ideal.', tags: ['sustrato', 'tropical', 'mezcla'], speciesIdx: 0 },
      { title: 'Humidificador para plantas', desc: 'Inversion que cambio la salud de mis plantas tropicales. Diferencia notable en crecimiento.', tags: ['humedad', 'humidificador', 'tropical'], speciesIdx: null },
      { title: 'Luz artificial para plantas', desc: 'Sistema de iluminacion LED que complementa la luz natural en invierno.', tags: ['luz', 'artificial', 'led'], speciesIdx: null },
      { title: 'Organizacion de mi invernadero', desc: 'Tour por mi pequeño invernadero casero donde cultivo plantas exoticas.', tags: ['invernadero', 'organizacion', 'tour'], speciesIdx: null },
      { title: 'Plantas purificadoras de aire', desc: 'Seleccion de plantas que mejoran la calidad del aire en interiores segun estudios.', tags: ['purificadora', 'aire', 'salud'], speciesIdx: 8 },
      { title: 'Riego automatico casero', desc: 'Sistema DIY de riego automatico para cuando salgo de vacaciones.', tags: ['riego', 'automatico', 'diy'], speciesIdx: null },
      { title: 'Plantas para baño con poca luz', desc: 'Especies que prosperan en la humedad del baño y no requieren mucha luz.', tags: ['baño', 'humedad', 'poca-luz'], speciesIdx: 4 },
      { title: 'Coleccion de cactus miniatura', desc: 'Mas de 40 especies diferentes de cactus en miniatura. Cada uno es único.', tags: ['cactus', 'miniatura', 'coleccion'], speciesIdx: 6 },
      { title: 'Plantas que sobrevivieron al invierno', desc: 'Balance de que plantas resistieron el invierno y cuales necesitaron mas cuidados.', tags: ['invierno', 'resistencia', 'balance'], speciesIdx: null },
      { title: 'Trasplante de Monstera grande', desc: 'Tutorial sobre como trasplantar una Monstera de gran tamaño sin dañar las raices.', tags: ['trasplante', 'monstera', 'tutorial'], speciesIdx: 0 },
      { title: 'Orquideas en corteza vs musgo', desc: 'Comparacion de medios de cultivo para orquideas. Cada uno tiene sus ventajas.', tags: ['orquidea', 'sustrato', 'comparacion'], speciesIdx: 1 },
      { title: 'Plantas toxicas para mascotas', desc: 'Informacion importante sobre plantas que pueden ser peligrosas para perros y gatos.', tags: ['toxicas', 'mascotas', 'seguridad'], speciesIdx: null },
      { title: 'Mi estanteria de plantas', desc: 'Diseñe esta estanteria especialmente para maximizar el espacio vertical.', tags: ['estanteria', 'diseño', 'vertical'], speciesIdx: null },
      { title: 'Plantas de bajo mantenimiento', desc: 'Top 10 de plantas para personas que viajan frecuentemente o son principiantes.', tags: ['facil', 'bajo-mantenimiento', 'principiantes'], speciesIdx: 15 },
      { title: 'Multiplicacion de suculentas', desc: 'Como obtener nuevas plantas de suculentas desde una sola hoja. Muy gratificante.', tags: ['suculentas', 'multiplicacion', 'hoja'], speciesIdx: 3 },
      { title: 'Plantas aromaticas en casa', desc: 'Cultivar hierbas aromaticas en interior. Frescas para cocinar siempre disponibles.', tags: ['aromaticas', 'hierbas', 'cocina'], speciesIdx: null },
      { title: 'Bonsai de Ficus para principiantes', desc: 'El Ficus es ideal para empezar en el arte del bonsai. Muy tolerante y moldeable.', tags: ['bonsai', 'ficus', 'arte'], speciesIdx: 5 },
      { title: 'Kokedama: plantas sin maceta', desc: 'Tecnica japonesa de cultivar plantas en bolas de musgo. Decorativo y funcional.', tags: ['kokedama', 'japones', 'musgo'], speciesIdx: null },
      { title: 'Plantas carnivoras exoticas', desc: 'Mi coleccion de plantas carnivoras. Fascinantes mecanismos de captura.', tags: ['carnivoras', 'exoticas', 'coleccion'], speciesIdx: null },
      { title: 'Macrame para macetas colgantes', desc: 'Aprendi a hacer macrame para colgar mis plantas. Proyecto creativo y util.', tags: ['macrame', 'colgante', 'diy'], speciesIdx: null },
      { title: 'Plantas que crecen en agua', desc: 'Experimento cultivando diferentes especies permanentemente en agua.', tags: ['hidroponico', 'agua', 'experimento'], speciesIdx: 2 },
      { title: 'Mi jardin botanico personal', desc: 'Recorrido por mi coleccion de mas de 150 plantas organizadas por familias.', tags: ['coleccion', 'botanico', 'tour'], speciesIdx: null },
      { title: 'Plantas raras y exoticas', desc: 'Adquisiciones recientes de especies poco comunes. Verdaderas joyas botanicas.', tags: ['raras', 'exoticas', 'especiales'], speciesIdx: 22 },
      { title: 'Calendario de cuidados mensual', desc: 'Organizo los cuidados de mis plantas con un calendario detallado por mes.', tags: ['calendario', 'organizacion', 'planificacion'], speciesIdx: null }
    ];

    let postDate = new Date('2025-09-01T08:00:00.000Z');
    for (let i = 0; i < postTitles.length; i++) {
      const pt = postTitles[i];
      const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      
      posts.push({
        user_id: randomUser._id,
        title: pt.title,
        description: pt.desc,
        media: { type: 'image', url: `https://drive.google.com/file/d/img/post_${i + 1}.jpg` },
        tags: pt.tags,
        species_id: pt.speciesIdx !== null ? insertedSpecies[pt.speciesIdx]._id : null,
        likes_count: 0,
        comments_count: 0,
        created_at: new Date(postDate)
      });

      // Increment date by random hours
      postDate = new Date(postDate.getTime() + (Math.random() * 12 + 4) * 3600000);
    }

    const insertedPosts = await Post.insertMany(posts);
    console.log(`Created ${insertedPosts.length} posts`);

    // Create Follows
    const follows = [];
    for (let i = 0; i < insertedUsers.length; i++) {
      for (let j = 0; j < insertedUsers.length; j++) {
        if (i !== j && Math.random() > 0.6) {
          follows.push({
            follower_id: insertedUsers[i]._id,
            following_id: insertedUsers[j]._id,
            created_at: new Date()
          });
        }
      }
    }
    const insertedFollows = await Follow.insertMany(follows);
    console.log(`Created ${insertedFollows.length} follows`);

    // Create Likes
    const likes = [];
    for (const post of insertedPosts) {
      const numLikes = Math.floor(Math.random() * 8) + 2;
      const likedBy = new Set();
      
      for (let i = 0; i < numLikes; i++) {
        const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
        if (!likedBy.has(randomUser._id.toString()) && randomUser._id.toString() !== post.user_id.toString()) {
          likedBy.add(randomUser._id.toString());
          likes.push({
            post_id: post._id,
            user_id: randomUser._id,
            created_at: new Date(post.created_at.getTime() + Math.random() * 86400000)
          });
        }
      }
      post.likes_count = likedBy.size;
    }
    const insertedLikes = await Like.insertMany(likes);
    console.log(`Created ${insertedLikes.length} likes`);

    // Create Comments
    const commentTexts = [
      'Increible! Me encanta esta planta.',
      'Donde conseguiste esta especie?',
      'Excelente trabajo, se ve muy saludable.',
      'Cuantas veces a la semana la riegas?',
      'Yo tengo una similar, es hermosa.',
      'Que tipo de sustrato usas?',
      'Necesito una de estas en mi coleccion.',
      'Perfecta para interior, verdad?',
      'Cuanto tiempo te llevo llegar a este tamaño?',
      'Consejos para principiantes?',
      'La ubicacion es clave para estas plantas.',
      'Que fertilizante recomiendas?',
      'Hermosa! Felicidades por tu cuidado.',
      'Puedo propagar esta especie facilmente?',
      'Requiere mucha luz directa?',
      'Es resistente a bajas temperaturas?',
      'Ideal para mi oficina.',
      'Gracias por compartir estos tips.',
      'La voy a buscar este fin de semana.',
      'Tu coleccion es inspiradora.',
      'Que humedad ambiente necesita?',
      'Ya la añadi a mi lista de deseos.',
      'Se puede tener en exterior?',
      'Cuanto crece aproximadamente por año?',
      'Muy informativo, gracias.',
      'La mia no crece tanto, que hago mal?',
      'Espectacular el follaje.',
      'Las flores son hermosas.',
      'Necesito mas plantas como esta.',
      'Perfecto para decoracion moderna.'
    ];

    const comments = [];
    for (const post of insertedPosts) {
      const numComments = Math.floor(Math.random() * 6) + 1;
      
      for (let i = 0; i < numComments; i++) {
        const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
        const randomText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
        
        comments.push({
          post_id: post._id,
          user_id: randomUser._id,
          text: randomText,
          created_at: new Date(post.created_at.getTime() + Math.random() * 86400000)
        });
      }
      post.comments_count = numComments;
    }
    const insertedComments = await Comment.insertMany(comments);
    console.log(`Created ${insertedComments.length} comments`);

    // Update posts with correct counts
    for (const post of insertedPosts) {
      await Post.updateOne(
        { _id: post._id },
        { $set: { likes_count: post.likes_count, comments_count: post.comments_count } }
      );
    }

    // Create Saves
    const saves = [];
    for (const user of insertedUsers) {
      const numSaves = Math.floor(Math.random() * 12) + 3;
      const savedPosts = new Set();
      
      for (let i = 0; i < numSaves; i++) {
        const randomPost = insertedPosts[Math.floor(Math.random() * insertedPosts.length)];
        if (!savedPosts.has(randomPost._id.toString())) {
          savedPosts.add(randomPost._id.toString());
          saves.push({
            user_id: user._id,
            post_id: randomPost._id,
            created_at: new Date()
          });
        }
      }
    }
    const insertedSaves = await Save.insertMany(saves);
    console.log(`Created ${insertedSaves.length} saves`);

    // Create Notifications
    const notifications = [];
    
    // Notifications for likes
    for (const like of insertedLikes) {
      const post = insertedPosts.find(p => p._id.equals(like.post_id));
      if (post && !post.user_id.equals(like.user_id)) {
        notifications.push({
          user_id: post.user_id,
          actor_id: like.user_id,
          type: 'like',
          data: { post_id: post._id, post_title: post.title },
          read: Math.random() > 0.5,
          created_at: like.created_at
        });
      }
    }

    // Notifications for comments
    for (const comment of insertedComments) {
      const post = insertedPosts.find(p => p._id.equals(comment.post_id));
      if (post && !post.user_id.equals(comment.user_id)) {
        notifications.push({
          user_id: post.user_id,
          actor_id: comment.user_id,
          type: 'comment',
          data: { post_id: post._id, post_title: post.title, comment_text: comment.text },
          read: Math.random() > 0.6,
          created_at: comment.created_at
        });
      }
    }

    // Notifications for follows
    for (const follow of insertedFollows) {
      notifications.push({
        user_id: follow.following_id,
        actor_id: follow.follower_id,
        type: 'follow',
        data: {},
        read: Math.random() > 0.4,
        created_at: follow.created_at
      });
    }

    const insertedNotifications = await Notification.insertMany(notifications);
    console.log(`Created ${insertedNotifications.length} notifications`);

    // Create Plant Profiles
    const plantProfiles = [];
    const nicknames = [
      'Bella', 'Verde', 'Gigante', 'Pequeña', 'Hermosa', 'Reina', 'Princesa',
      'Tesoro', 'Joya', 'Estrella', 'Luna', 'Sol', 'Amiga', 'Compañera',
      'Veterana', 'Nueva', 'Especial', 'Unica', 'Favorita', 'Mimada'
    ];

    for (const user of insertedUsers) {
      const numProfiles = Math.floor(Math.random() * 5) + 2;
      
      for (let i = 0; i < numProfiles; i++) {
        const randomSpecies = insertedSpecies[Math.floor(Math.random() * insertedSpecies.length)];
        const randomNickname = nicknames[Math.floor(Math.random() * nicknames.length)];
        
        plantProfiles.push({
          user_id: user._id,
          nickname: randomNickname,
          species_id: randomSpecies._id,
          notes: `Esta es mi ${randomSpecies.common_name}. La adquiri hace ${Math.floor(Math.random() * 24) + 1} meses y ha sido un placer cuidarla.`,
          profile_pic: `https://drive.google.com/file/d/img/profile_${randomSpecies.common_name.toLowerCase()}.jpg`,
          created_at: new Date(Date.now() - Math.random() * 365 * 24 * 3600000)
        });
      }
    }

    const insertedPlantProfiles = await PlantProfile.insertMany(plantProfiles);
    console.log(`Created ${insertedPlantProfiles.length} plant profiles`);

    console.log('\n=== SEEDING SUMMARY ===');
    console.log(`Users: ${insertedUsers.length}`);
    console.log(`Species: ${insertedSpecies.length}`);
    console.log(`Posts: ${insertedPosts.length}`);
    console.log(`Comments: ${insertedComments.length}`);
    console.log(`Follows: ${insertedFollows.length}`);
    console.log(`Likes: ${insertedLikes.length}`);
    console.log(`Saves: ${insertedSaves.length}`);
    console.log(`Notifications: ${insertedNotifications.length}`);
    console.log(`Plant Profiles: ${insertedPlantProfiles.length}`);
    console.log('======================\n');

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
