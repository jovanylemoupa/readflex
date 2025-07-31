const statistics = {
    "statistiques": {
    "totalLivres": 39,
    "livresPublics": 26,
    "livresPrives": 4,
    "livresRestreints": 9,
    "totalUtilisateurs": 30,
    "administrateurs": 2,
    "auteurs": 15,
    "utilisateursStandard": 5,
    "lecteurs": 8
  }
}

exports.getStatistics = (req, res) => {
    res.json(statistics);
}