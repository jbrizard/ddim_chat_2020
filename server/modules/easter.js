/*
* Nom : Easter eggs Bot
* Description : Trouverez-vous les easter eggs ?
* Auteur(s) : Romain-Maxime
 */
module.exports =  {
    handleEaster: handleEaster
}


function handleEaster(io, message)
{
    // Passe le message en minuscules (recherche insensible à la casse)
    message = message.toLowerCase();
        
    // Est-ce qu'il contient une référence à Easter ?
    if (message.includes('!easter'))
    {
        // Si oui, envoie la réponse de Easter...
        io.sockets.emit('new_message',
        {
            name:'Easter!!',
            message:'Trouvez l\'easter egg le plus vite possible !',
            avatar:'/modules/easter/egg.png'
        });
        
        // Si oui, envoie la réponse de Easter...
        io.sockets.emit('easter_pos',
        {
            x: Math.random(),
            y: Math.random()
        });
    }
}

function easterFound(io)
{
    io.sockets.emit('easter_end');
}