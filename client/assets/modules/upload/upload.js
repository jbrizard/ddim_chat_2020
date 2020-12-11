//Déclaration des différents type de fichier disponible à l'upload
var tabType = ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Détecte l'ajout d'un fichier par l'utilisateur
document.getElementById('upload').addEventListener('change', readFileAsString);

/**
 * Lorsqu'on choisit un fichier cette fonction lit le fichier et renvoi ses informations au serveur
 */
function readFileAsString() 
{
    var files = this.files;

    // Est-ce qu'un fichier a été choisit ?
    if (files.length === 0) 
    {
        // Si oui, on affiche un message dans la console
        console.log('Aucun fichier choisi');
        return;
    }

    // Creation d'une variable permettant la lecture de fichiers
    var reader = new FileReader();

    //On execute une fonction lorsque le fichier est chargé
    reader.onload = function (event) 
    {
        // Ajout à la variable fileType le type du fichier sélectionné
        fileType = files[0].type;
        // Est-ce que le type du fichier est parmis le tableau de type de fichier disponible ?
        if (tabType.includes(fileType)) 
        {
            // Si oui, on créer un tableau avec les différentes informations du fichier et on l'envoi au serveur
            var tab = { "file": event.target.result, 'fileName': files[0].name, 'fileType': fileType };
            socket.emit('file', tab);
        }
        else 
        {
            // Si non, on affiche une alerte à l'utilisateur
            alert('Type de fichier non autorisé');
        }
    };
    reader.readAsDataURL(files[0]);
}

/**
 * Permet de simuler un nouveau bouton car le bouton file initial n'est pas modifiable
 */
function getFile()
{
    document.getElementById('upload').click();
    document.getElementById('selectedfile').value = document.getElementById('upload').value
}