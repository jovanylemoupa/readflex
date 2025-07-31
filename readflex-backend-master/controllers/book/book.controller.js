

const books = {
  "livres": [
    {
      "id": "1",
      "titre": "Les Secrets du Code Quantique",
      "description": "Un thriller technologique sur l'informatique quantique",
      "auteurId": "user_03",
      "statut": "public",
      "tags": ["sci-fi", "technologie", "thriller"],
      "dateCreation": "2024-01-15",
      "likes": 245,
      "vues": 1520
    },
    {
      "id": "2",
      "titre": "Mémoires d'un Développeur Freelance",
      "description": "Les hauts et bas de la vie d'un développeur indépendant",
      "auteurId": "user_05",
      "statut": "public",
      "tags": ["autobiographie", "tech", "développement"],
      "dateCreation": "2024-02-03",
      "likes": 189,
      "vues": 890
    },
    {
      "id": "3",
      "titre": "L'Art de la Cuisine Moléculaire",
      "description": "Guide complet pour maîtriser la gastronomie moderne",
      "auteurId": "user_08",
      "statut": "restreint",
      "tags": ["cuisine", "guide", "gastronomie"],
      "dateCreation": "2024-01-28",
      "likes": 67,
      "vues": 340
    },
    {
      "id": "4",
      "titre": "Voyages dans l'Espace-Temps",
      "description": "Nouvelles de science-fiction sur les voyages temporels",
      "auteurId": "user_12",
      "statut": "public",
      "tags": ["sci-fi", "voyage temporel", "nouvelles"],
      "dateCreation": "2024-03-10",
      "likes": 312,
      "vues": 1840
    },
    {
      "id": "5",
      "titre": "Les Mystères de l'Intelligence Artificielle",
      "description": "Exploration des enjeux éthiques de l'IA",
      "auteurId": "user_15",
      "statut": "public",
      "tags": ["IA", "éthique", "technologie"],
      "dateCreation": "2024-02-20",
      "likes": 456,
      "vues": 2100
    },
    {
      "id": "6",
      "titre": "Journal d'un Photographe de Rue",
      "description": "Récits et images de la vie urbaine",
      "auteurId": "user_18",
      "statut": "prive",
      "tags": ["photographie", "urbain", "journal"],
      "dateCreation": "2024-01-05",
      "likes": 34,
      "vues": 120
    },
    {
      "id": "7",
      "titre": "Les Algorithmes de l'Amour",
      "description": "Comment les apps de rencontre changent nos relations",
      "auteurId": "user_03",
      "statut": "public",
      "tags": ["sociologie", "technologie", "relations"],
      "dateCreation": "2024-03-15",
      "likes": 278,
      "vues": 1650
    },
    {
      "id": "8",
      "titre": "Guide du Parfait Nomade Digital",
      "description": "Conseils pratiques pour travailler en voyageant",
      "auteurId": "user_22",
      "statut": "restreint",
      "tags": ["voyage", "travail", "guide"],
      "dateCreation": "2024-02-14",
      "likes": 145,
      "vues": 780
    },
    {
      "id": "9",
      "titre": "L'Histoire Secrète des Jeux Vidéo",
      "description": "Les coulisses de l'industrie du gaming",
      "auteurId": "user_25",
      "statut": "public",
      "tags": ["gaming", "histoire", "industrie"],
      "dateCreation": "2024-01-22",
      "likes": 567,
      "vues": 3200
    },
    {
      "id": "10",
      "titre": "Méditations sur le Minimalisme",
      "description": "Philosophie de vie simple et consciente",
      "auteurId": "user_28",
      "statut": "public",
      "tags": ["philosophie", "minimalisme", "bien-être"],
      "dateCreation": "2024-03-01",
      "likes": 198,
      "vues": 950
    },
    {
      "id": "11",
      "titre": "Les Derniers Hackers",
      "description": "Thriller cyberpunk dans un futur dystopique",
      "auteurId": "user_12",
      "statut": "public",
      "tags": ["cyberpunk", "thriller", "hacking"],
      "dateCreation": "2024-02-08",
      "likes": 423,
      "vues": 2400
    },
    {
      "id": "12",
      "titre": "Recettes de Grand-Mère 2.0",
      "description": "Cuisine traditionnelle revisitée avec des techniques modernes",
      "auteurId": "user_08",
      "statut": "public",
      "tags": ["cuisine", "tradition", "modernité"],
      "dateCreation": "2024-01-30",
      "likes": 234,
      "vues": 1100
    },
    {
      "id": "13",
      "titre": "L'Économie de l'Attention",
      "description": "Comment les réseaux sociaux capturent notre temps",
      "auteurId": "user_15",
      "statut": "restreint",
      "tags": ["économie", "réseaux sociaux", "psychologie"],
      "dateCreation": "2024-03-05",
      "likes": 156,
      "vues": 670
    },
    {
      "id": "14",
      "titre": "Aventures en Terres Inconnues",
      "description": "Récits d'exploration dans des contrées perdues",
      "auteurId": "user_32",
      "statut": "public",
      "tags": ["aventure", "exploration", "voyage"],
      "dateCreation": "2024-02-25",
      "likes": 389,
      "vues": 1950
    },
    {
      "id": "15",
      "titre": "Le Syndrome de l'Imposteur",
      "description": "Guide psychologique pour vaincre ses doutes",
      "auteurId": "user_35",
      "statut": "public",
      "tags": ["psychologie", "développement personnel", "confiance"],
      "dateCreation": "2024-01-18",
      "likes": 445,
      "vues": 2300
    },
    {
      "id": "16",
      "titre": "Codes et Légendes",
      "description": "L'histoire fascinante de la cryptographie",
      "auteurId": "user_03",
      "statut": "prive",
      "tags": ["cryptographie", "histoire", "sécurité"],
      "dateCreation": "2024-03-12",
      "likes": 87,
      "vues": 340
    },
    {
      "id": "17",
      "titre": "La Révolution du Télétravail",
      "description": "Impact sociétal du travail à distance",
      "auteurId": "user_22",
      "statut": "public",
      "tags": ["travail", "société", "télétravail"],
      "dateCreation": "2024-02-18",
      "likes": 267,
      "vues": 1450
    },
    {
      "id": "18",
      "titre": "Chasseurs de Bugs",
      "description": "Aventures d'une équipe de testeurs logiciels",
      "auteurId": "user_05",
      "statut": "public",
      "tags": ["programmation", "tests", "humour"],
      "dateCreation": "2024-01-12",
      "likes": 178,
      "vues": 820
    },
    {
      "id": "19",
      "titre": "L'Art de la Négociation Digitale",
      "description": "Techniques de négociation à l'ère numérique",
      "auteurId": "user_38",
      "statut": "restreint",
      "tags": ["négociation", "business", "digital"],
      "dateCreation": "2024-03-08",
      "likes": 123,
      "vues": 560
    },
    {
      "id": "20",
      "titre": "Symphonie pour un Monde Connecté",
      "description": "Poésie sur l'hyperconnexion moderne",
      "auteurId": "user_41",
      "statut": "public",
      "tags": ["poésie", "connexion", "modernité"],
      "dateCreation": "2024-02-12",
      "likes": 92,
      "vues": 480
    },
    {
      "id": "21",
      "titre": "Les Gardiens de la Blockchain",
      "description": "Roman d'aventure dans l'univers des cryptomonnaies",
      "auteurId": "user_25",
      "statut": "public",
      "tags": ["blockchain", "crypto", "aventure"],
      "dateCreation": "2024-01-25",
      "likes": 334,
      "vues": 1720
    },
    {
      "id": "22",
      "titre": "Manuel du Parfait Procrastinateur",
      "description": "Guide humoristique sur l'art de reporter",
      "auteurId": "user_18",
      "statut": "public",
      "tags": ["humour", "procrastination", "guide"],
      "dateCreation": "2024-03-18",
      "likes": 521,
      "vues": 2800
    },
    {
      "id": "23",
      "titre": "Écosystèmes Virtuels",
      "description": "L'impact environnemental du numérique",
      "auteurId": "user_44",
      "statut": "public",
      "tags": ["environnement", "numérique", "écologie"],
      "dateCreation": "2024-02-05",
      "likes": 287,
      "vues": 1380
    },
    {
      "id": "24",
      "titre": "Carnets d'un UX Designer",
      "description": "Réflexions sur l'expérience utilisateur",
      "auteurId": "user_47",
      "statut": "restreint",
      "tags": ["UX", "design", "utilisateur"],
      "dateCreation": "2024-01-08",
      "likes": 156,
      "vues": 720
    },
    {
      "id": "25",
      "titre": "L'Odyssée des Startups",
      "description": "Épopée entrepreneuriale en terre numérique",
      "auteurId": "user_15",
      "statut": "public",
      "tags": ["startup", "entrepreneuriat", "business"],
      "dateCreation": "2024-03-22",
      "likes": 398,
      "vues": 2150
    },
    {
      "id": "26",
      "titre": "Secrets de la Productivité",
      "description": "Méthodes avancées d'optimisation personnelle",
      "auteurId": "user_28",
      "statut": "prive",
      "tags": ["productivité", "méthodes", "optimisation"],
      "dateCreation": "2024-02-28",
      "likes": 89,
      "vues": 420
    },
    {
      "id": "27",
      "titre": "La Danse des Algorithmes",
      "description": "Poétique informatique et beauté du code",
      "auteurId": "user_41",
      "statut": "public",
      "tags": ["algorithmes", "poésie", "informatique"],
      "dateCreation": "2024-01-20",
      "likes": 167,
      "vues": 890
    },
    {
      "id": "28",
      "titre": "Révolutions Silencieuses",
      "description": "Les innovations qui changent le monde discrètement",
      "auteurId": "user_32",
      "statut": "public",
      "tags": ["innovation", "technologie", "société"],
      "dateCreation": "2024-03-14",
      "likes": 445,
      "vues": 2400
    },
    {
      "id": "29",
      "titre": "Guide du Streaming Éthique",
      "description": "Comment consommer du contenu responsable",
      "auteurId": "user_44",
      "statut": "public",
      "tags": ["streaming", "éthique", "consommation"],
      "dateCreation": "2024-02-22",
      "likes": 234,
      "vues": 1200
    },
    {
      "id": "30",
      "titre": "L'Empire des Données",
      "description": "Thriller géopolitique sur la guerre des données",
      "auteurId": "user_12",
      "statut": "restreint",
      "tags": ["données", "géopolitique", "thriller"],
      "dateCreation": "2024-01-16",
      "likes": 178,
      "vues": 850
    },
    {
      "id": "31",
      "titre": "Métamorphoses Digitales",
      "description": "Comment la technologie change notre humanité",
      "auteurId": "user_35",
      "statut": "public",
      "tags": ["digital", "humanité", "transformation"],
      "dateCreation": "2024-03-06",
      "likes": 356,
      "vues": 1900
    },
    {
      "id": "32",
      "titre": "Le Laboratoire des Idées",
      "description": "Expérimentations créatives et innovations",
      "auteurId": "user_47",
      "statut": "public",
      "tags": ["créativité", "innovation", "expérimentation"],
      "dateCreation": "2024-02-16",
      "likes": 289,
      "vues": 1550
    },
    {
      "id": "33",
      "titre": "Chroniques d'un Futur Probable",
      "description": "Anticipation technologique et sociétale",
      "auteurId": "user_25",
      "statut": "public",
      "tags": ["futur", "anticipation", "société"],
      "dateCreation": "2024-01-29",
      "likes": 412,
      "vues": 2300
    },
    {
      "id": "34",
      "titre": "L'Art de Déboguer sa Vie",
      "description": "Méthodes de développeur appliquées au quotidien",
      "auteurId": "user_05",
      "statut": "public",
      "tags": ["développement personnel", "debug", "méthodes"],
      "dateCreation": "2024-03-11",
      "likes": 378,
      "vues": 1850
    },
    {
      "id": "35",
      "titre": "Territoires Numériques",
      "description": "Géographie des espaces virtuels",
      "auteurId": "user_38",
      "statut": "restreint",
      "tags": ["géographie", "numérique", "espaces virtuels"],
      "dateCreation": "2024-02-09",
      "likes": 145,
      "vues": 680
    },
    {
      "id": "36",
      "titre": "La Bibliothèque Infinie",
      "description": "Philosophie de l'information à l'ère numérique",
      "auteurId": "user_28",
      "statut": "public",
      "tags": ["philosophie", "information", "numérique"],
      "dateCreation": "2024-01-14",
      "likes": 267,
      "vues": 1320
    },
    {
      "id": "37",
      "titre": "Pixels et Émotions",
      "description": "L'art numérique comme langage des sentiments",
      "auteurId": "user_41",
      "statut": "public",
      "tags": ["art numérique", "émotions", "pixels"],
      "dateCreation": "2024-03-20",
      "likes": 198,
      "vues": 950
    },
    {
      "id": "38",
      "titre": "Les Architectes du Web",
      "description": "Portraits des pionniers d'Internet",
      "auteurId": "user_22",
      "statut": "public",
      "tags": ["internet", "pionniers", "portraits"],
      "dateCreation": "2024-02-26",
      "likes": 345,
      "vues": 1780
    },
    {
      "id": "39",
      "titre": "Réseaux de Confiance",
      "description": "Sociologie des communautés en ligne",
      "auteurId": "user_44",
      "statut": "public",
      "tags": ["sociologie", "communautés", "confiance"],
      "dateCreation": "2024-01-31",
      "likes": 223,
      "vues": 1150
    }
  ],
  
}

exports.getBooks = (req, res) => {
  res.status(200).json(books);
}


exports.getBookById = (req, res) => {
  console.log("Fetching book with ID:", req.params);
  const bookId = req.params.id;
  const book = books.livres.find(b => b.id === bookId);
  
  if (book) {
    console.log("Book found:", book);
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}


exports.deleteBookById = (req, res) => {
  const bookId = req.params.id;
  const bookIndex = books.livres.findIndex(b => b.id === bookId);
  
  if (bookIndex !== -1) {
    books.livres.splice(bookIndex, 1);
    res.status(200).json({message: 'Book deleted successfully'});
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}


exports.createBook = (req, res) => {

  const newBook = req.body;

  if (!newBook || !newBook.titre || !newBook.auteurId) {
    return res.status(400).json({ error: "Données incomplètes" });
  }

  newBook.id = (books.livres.length + 1).toString();
  books.livres.push(newBook);

  res.status(201).json(newBook);
};


exports.updateBookById = (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;

  const bookIndex = books.livres.findIndex(b => b.id === bookId);
  
  if (bookIndex !== -1) {
    const book = books.livres[bookIndex];
    books.livres[bookIndex] = { ...book, ...updatedData };
    res.status(200).json(books.livres[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

