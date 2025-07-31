const users ={
     "utilisateurs": [
    {
      "id": "admin_01",
      "nom": "Marie Dupont",
      "email": "marie.dupont@admin.com",
      "role": "administrateur",
      "dateInscription": "2023-12-01",
      "statut": "actif"
    },
    {
      "id": "admin_02",
      "nom": "Jean Martin",
      "email": "jean.martin@admin.com",
      "role": "administrateur",
      "dateInscription": "2023-12-01",
      "statut": "actif"
    },
    {
      "id": "user_03",
      "nom": "Alex Chen",
      "email": "alex.chen@email.com",
      "role": "auteur",
      "dateInscription": "2024-01-10",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_05",
      "nom": "Sophie Laurent",
      "email": "sophie.laurent@email.com",
      "role": "auteur",
      "dateInscription": "2024-01-15",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_08",
      "nom": "Marc Dubois",
      "email": "marc.dubois@email.com",
      "role": "auteur",
      "dateInscription": "2024-01-20",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_12",
      "nom": "Emma Wilson",
      "email": "emma.wilson@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-01",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_15",
      "nom": "Thomas Müller",
      "email": "thomas.muller@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-05",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_18",
      "nom": "Lisa García",
      "email": "lisa.garcia@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-10",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_22",
      "nom": "David Kim",
      "email": "david.kim@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-15",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_25",
      "nom": "Anna Rossi",
      "email": "anna.rossi@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-20",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_28",
      "nom": "Carlos Silva",
      "email": "carlos.silva@email.com",
      "role": "auteur",
      "dateInscription": "2024-02-25",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_32",
      "nom": "Nina Petrov",
      "email": "nina.petrov@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-01",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_35",
      "nom": "Ahmed Hassan",
      "email": "ahmed.hassan@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-05",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_38",
      "nom": "Yuki Tanaka",
      "email": "yuki.tanaka@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-10",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_41",
      "nom": "Camille Moreau",
      "email": "camille.moreau@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-12",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_44",
      "nom": "Igor Volkov",
      "email": "igor.volkov@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-15",
      "statut": "actif",
      "livresPublies": 3
    },
    {
      "id": "user_47",
      "nom": "Priya Sharma",
      "email": "priya.sharma@email.com",
      "role": "auteur",
      "dateInscription": "2024-03-18",
      "statut": "actif",
      "livresPublies": 2
    },
    {
      "id": "user_50",
      "nom": "Pierre Leclerc",
      "email": "pierre.leclerc@email.com",
      "role": "user",
      "dateInscription": "2024-01-25",
      "statut": "actif"
    },
    {
      "id": "user_51",
      "nom": "Julie Bernard",
      "email": "julie.bernard@email.com",
      "role": "user",
      "dateInscription": "2024-02-03",
      "statut": "actif"
    },
    {
      "id": "user_52",
      "nom": "Michel Durand",
      "email": "michel.durand@email.com",
      "role": "user",
      "dateInscription": "2024-02-08",
      "statut": "actif"
    },
    {
      "id": "user_53",
      "nom": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "role": "user",
      "dateInscription": "2024-02-12",
      "statut": "actif"
    },
    {
      "id": "user_54",
      "nom": "Roberto González",
      "email": "roberto.gonzalez@email.com",
      "role": "user",
      "dateInscription": "2024-02-18",
      "statut": "actif"
    },
    {
      "id": "lecteur_60",
      "nom": "Nathalie Petit",
      "email": "nathalie.petit@email.com",
      "role": "lecteur",
      "dateInscription": "2024-01-30",
      "statut": "actif",
      "livresLus": 15
    },
    {
      "id": "lecteur_61",
      "nom": "François Roux",
      "email": "francois.roux@email.com",
      "role": "lecteur",
      "dateInscription": "2024-02-06",
      "statut": "actif",
      "livresLus": 22
    },
    {
      "id": "lecteur_62",
      "nom": "Laura Thompson",
      "email": "laura.thompson@email.com",
      "role": "lecteur",
      "dateInscription": "2024-02-14",
      "statut": "actif",
      "livresLus": 8
    },
    {
      "id": "lecteur_63",
      "nom": "Antonio López",
      "email": "antonio.lopez@email.com",
      "role": "lecteur",
      "dateInscription": "2024-02-22",
      "statut": "actif",
      "livresLus": 31
    },
    {
      "id": "lecteur_64",
      "nom": "Helena Schmidt",
      "email": "helena.schmidt@email.com",
      "role": "lecteur",
      "dateInscription": "2024-03-02",
      "statut": "actif",
      "livresLus": 12
    },
    {
      "id": "lecteur_65",
      "nom": "Kevin Brown",
      "email": "kevin.brown@email.com",
      "role": "lecteur",
      "dateInscription": "2024-03-08",
      "statut": "actif",
      "livresLus": 19
    },
    {
      "id": "lecteur_66",
      "nom": "Isabelle Blanc",
      "email": "isabelle.blanc@email.com",
      "role": "lecteur",
      "dateInscription": "2024-03-16",
      "statut": "actif",
      "livresLus": 7
    },
    {
      "id": "lecteur_67",
      "nom": "Hassan Al-Rashid",
      "email": "hassan.alrashid@email.com",
      "role": "lecteur",
      "dateInscription": "2024-03-20",
      "statut": "actif",
      "livresLus": 25
    }
  ],
}

exports.getUsers = (req, res) => {
    res.json(users);
}