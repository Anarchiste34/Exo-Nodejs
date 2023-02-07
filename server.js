//Faire un import de la function et créer un rappel pour express
const express = require('express');
//faire un import de la function et créer un rappel pour fs
const fs = require('fs');
//Créer ma const expresse
const app = express();
//Initialisation du chemin de base
app.get('/', (requete, response) => {
    response.send('Hello World');
})
//Créer le serveur et indiquer qu'il tourne sur le port 3000
app.listen(3000, () => {
    console.log('L\'app tourne sur le port 3000');
})
//Création du chemin /data
app.get("/data", (request, response) => {
//Lecture du fichier data.son
    fs.readFile("server.json", (err, data) => {
// première boucle si une erreur indiquer par un message code 500
      if (err) {
        response.status(500).json({
          message: "Une erreur lors de la lecture des données",
          error: err
        });
//deuxième boucle si pas d'erreur indiquer par un message code 200
      } else {
        response.status(200).json(JSON.parse(data));
      }
    });
  });

  // C'est uen route qui permet d'afficher une chaine de caractères en prenant 2 paramètre (:name, :surname)
  // GET "/name/:name/surname/:surname"
  // Ex: http://localhost:3000/name/jean/surname/francis
  app.get("/name/:name/surname/:surname", (request, response) => {
  // On utilise la réponse du middleware d'Express, pour envoyez sur le portquand cette route est trigger
  response.send(
    `Bonjour ${request.params.name.toUpperCase()} ${request.params.surname.toUpperCase()}`
  );
  });


// C'est une route qui me permet d'insérer de la données dans mon fichier data.json
// GET "/data"
// Ex: http://localhost:3000/data
app.get("/Entree", (request, response) => {
  // lire le contenu du fichier
  fs.readFile("server.json", (err, data) => {
    // si une erreur sur la lecture du fichier
    if (err) {
      response.status(500).json({
        message: "Une erreur est survenue lors de la lecture des données",
      });
    } else {
      // stocker les données existante
      const existingData = JSON.parse(data);
      // rajouter ma donnée à moi
      existingData.data.push(request.body);
      // je vais reécrire le fichier avec les nouvelles données
      fs.writeFile("server.json", JSON.stringify(existingData), (writeErr) => {
        // si il ya une erreur au moment de l'écriture
        if (writeErr) {
          response.status(500).json({
            message: "Une erreur est survenue lors de l'écriture des données",
          });
        } else {
          response.status(200).json({
            message: "Les données ont été ajouter avec succès",
          });
        }
      });
    }
  });
});

// On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
// Je vais dire à Express d'utiliser bodyParser pour lire le contenue du body en json
app.use(bodyParser.json());