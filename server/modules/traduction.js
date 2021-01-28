/*
 * Nom : Traduction
 * Description : Ce module sert à traduire des mots ou des phrases
 * Auteur(s) : Léo Moscillo | Anaÿse Puybouffat
 */

var unirest = require("unirest");
var req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
module.exports =  
{
	handleTranslate: handleTranslate
}
// on stocke dans un tableau les langues
let langue = 
[
    {
        acronyme : 'fr',
        langue : 'français'
    },
    {
        acronyme : 'en',
        langue : 'anglais'
    },
    {
        acronyme : 'es',
        langue : 'espagnol'
    },
    {
        acronyme : 'de',
        langue : 'allemand'
    },
    {
        acronyme : 'it',
        langue : 'italien'
    },
]
let option = '';

// initialisation du formulaire de traduction
req.headers(
    {
	"content-type": "application/x-www-form-urlencoded",
	"accept-encoding": "application/gzip",
	"x-rapidapi-key": "c623745c5bmsh7e03a23d08c167ap12a05fjsnd2c96208a349",
	"x-rapidapi-host": "google-translate1.p.rapidapi.com",
	"useQueryString": true
    }
);

// création des options qui seront ajouté à la liste des langues
for (let i = 0; i < langue.length;i++)
{
    option = option + '<option value="'+langue[i].acronyme+'">'+langue[i].langue+'</option>'
}

/** Manipulation de la traduction */
function handleTranslate(io, message, socket)
{
    // on regarde si le message contient !Translate
    if (message.toLowerCase().includes("!translate"))
    {
        // affichage du formulaire
        io.sockets.emit('new_message', 
        {
            name :'Translator',
            message: 
            'Langue source <select id="translate-source">'+
            option + 
            '</select><br><br>' +
            'Langue cible <select id="translate-cible">' + 
            option +
            '</select><br><br>' +
            'Texte <input type="text" id="translate-text" /><br><br>'+
            '<input type="submit" id="btn-translate" />'
        });

        // récupération du coté client des valeurs du formulaire
        socket.on('boutonTranslate',formLangue);

        /**Formulaire de traduction */
        function formLangue(langueSource, langueCible, texte)
        {
            // récupération du texte et des langues pour envoyé à a traduction
            req.form(
            {
                "q": texte,
                "source": langueSource,
                "target": langueCible
            }
            );
            // réponse du serveur et récupération de la traduction
            req.end(function (res) 
            {
                // affichage de la traduction sur le chat
                io.sockets.emit('new_message', 
                {
                    name : 'Translator',
                    message: "La traduction de '" + texte + "' en '" + langueCible + "' est : <strong>" + res.body.data.translations[0].translatedText+"</strong>"
                }
                );
            }
            );
        }

    }
}
