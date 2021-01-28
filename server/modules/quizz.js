/*
 * Nom : Quizz !
 * Description : CE module sert a prouvé sa supériorité intellectuelle face aux autres utilisateurs
 * Auteur(s) : Léo Moscillo | Anaÿse Puybouffat
 */

const { tab_ques } = require("./question");

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleQuizz: handleQuizz
}

let quizzState = 'Stopped';
let quizzPlayers;
let timer;
let timerState;
let tableQuestion;
let timeQuestion;
let questionState;
let responseTable;
let tableRightAnswerPlayer;
let tablePoint;
let tablePointFinal;


/*
 *Fonction englobant tout le module afin de pouvoir utiliser io, message et name partout.
 */
function handleQuizz(io, message, name, socket)
{
    //verifie que le message contient la fonction pour lancer le quizz
    if (message.includes("!Quizz"))
    {

        //Si aucun quizz n'est lancé, on envoie alors le formulaire de lancement du quizz
        if (quizzState == "Stopped")
        {
            io.sockets.emit('quizzMessage', 
                {
                    message: 
                    '<div class="message" style="display: flex;">'
                    + '<label>Nombre de question'
                    + '<input class="varQuizz" type="number" value="10" min="2" max="20"></input>'
                    + '</label>'
                    + '<label>Temps de reponse'
                    + '<input class="varQuizz" type="number"  value="10" min="1" max="30" placeholder="Temps de réponse"></input>'
                    + '</label>'
                    + '<button id="startQuizzButton">Lancer le Quizz</button>'
                    + '</div>'
                }
                )
        }
        //Sinon, on indique a l'utilisateur que le quizz est deja en cours
        else
        {
            io.sockets.emit('quizzStart', 
                {
                    state:'error',
                    message:" Un quizz est deja en cours, veuillez attendre la fin de ce dernier pour en lancer un autre."
                }
            )
        }
    }

    /*
     *Si l'utilisateur envoie le formulaire, alors on lance le quizz
     */
    socket.on('buttonClick', startQuizz);
    function startQuizz(nbQ, tQ){
        //Reset toute les variables importante.
        quizzPlayers = [];
        timerState = false;
        tableQuestion;
        timeQuestion = 0;
        questionState = "off";
        responseTable = {};
        tableRightAnswerPlayer = [];
        tablePoint = {};
        tablePointFinal = [];

        //indique que le quizz est lancé
        quizzState = "Waiting";
        //Ajoute le créateur du quizz a la liste des joueurs
        quizzPlayers.push(name);
        timerTime = 15;
        messageSplit = message.split(" ");
        nbQuestionTotal = nbQ;
        timeQuestion = tQ;
        timer = setInterval(function(){quizzTimerStart()} , 1000);
        //indique aux autres utilisateurs que le quizz est lancé
        io.sockets.emit('quizzStart', 
            {
                name: name,
                message: name+ " a lancé le quizz ! Vous avez " + timerTime + " secondes pour taper '!JoinQuizz' afin de participer "
            }
        );
    }

    //Si le message contient la commande pour rejoindre le quizz :
    if (message.includes("!JoinQuizz"))
    {  
        //Si aucun quizz n'est lancé, un message d'erreur s'affiche
        if (quizzState == 'Stopped' || !timerState)
        {
            io.sockets.emit('joinQuizz', 
                {
                    name: name,
                    state:'error',
                    message:" Impossible de rejoindre le quizz car personne ne l'as créer, pour ca, veuillez taper '!StartQuizz' !"
                }
            );
        }
        //Si l'utilisateur participe deja au quizz, il ne peux pas rejoindre une deuxieme fois
        else if (quizzPlayers.indexOf(name) !== -1)
        {
            io.sockets.emit('joinQuizz', 
                {
                    state:'error',
                    message:" Impossible de rejoindre le quizz car vous participez déja !"
                }
            )
        }
        //Sinon il rejoint le quizz.
        else
        {
            quizzPlayers.push(name);
            io.sockets.emit('joinQuizz', 
                {
                    state:'',
                    message:name+ " a rejoint le quizz !"
                }
            );
        }
    }

    //Si je message contient A, B, C, D ou E :
    if (['A', 'B', 'C', 'D', 'E'].includes(message.toUpperCase()))
    {
        //Si le quizz est lancé et qu'une question est en cours, alors la réponse de l'utilisateur est enregistré
        if (quizzState == 'Playing' && questionState == "on")
        {
            responseTable[name] = message.toLowerCase();
            io.sockets.emit('quizzMessage', 
                {
                    message: "Vous avez répondu " + message.toUpperCase() + " a cette question. "
                }
            );
        }
    }

    /*
     *Fonction permettant de laisser aux joueurs le temps de rejoindre le quizz.
     */
    function quizzTimerStart()
    {
        timerTime--;
        timerState = true;
        if (timerTime <= 0)
        {
            timerState = false;
            clearInterval(timer);
            quizzState = "Playing";
            initQuestions();
        }
    }

    /*
     *Fonction générant un tableau de question aléatoire de longueur defini parmis celle du tableau quand question.js, sans doublons.
     */
    function initQuestions()
    {
        questionQuizz = [];
        tableQuestion = [];
        let ind;

        for (let i = 0; i < nbQuestionTotal; i++)
        {
            ind = Math.round(Math.random()*tab_ques.length);
            while(tableQuestion.indexOf(ind) !== -1)
            {
                ind = Math.round(Math.random()*tab_ques.length);
            }
            tableQuestion.push(ind);
        }
        for (let i = 0; i < tableQuestion.length; i++)
        {
            tableQuestion[i] = tab_ques[tableQuestion[i]];
        }

        nRound = 0;
        for (let i = 0; i < quizzPlayers.length; i++)
        {
            tablePoint[quizzPlayers[i]] = 0;
        }
        roundQuestion();
    }

    /*
     *Fonction permettant d'afficher la question a chaque round, et laissant le temps a l'utilisateur de répondre a la question, 
     *si on arrive au dernier round, on passe a la fonction de fin de quizz
     */
    function roundQuestion(){

        if (nRound < nbQuestionTotal)
        {
            displayQuestion(nRound);
            questionState = "on";
            responseTable = [];
            tableRightAnswerPlayer = [];

            timerTime = timeQuestion;
            timer = setInterval(function(){quizzTimerQuestion()}, 1000);

        }
        else
        {
        endQuizz();
        }
    }

    /*
     *Actualise le timer qui laisse le temps aux joueurs de répondre, puis, si il est terminé, vérifie quel(s) joueurs a/ont obtenu(s) la bonne réponse pour incrémenter ses/leurs points
     */
    function quizzTimerQuestion()
    {
        timerTime --;
        if (timerTime == 0)
        {
            questionState = "off";
            for (let i = 0; i < quizzPlayers.length; i++)
            {
                if (responseTable[quizzPlayers[i]] == tableQuestion[nRound].lettre.toLowerCase())
                {
                    tableRightAnswerPlayer.push(quizzPlayers[i]);
                }
            }
            for (let i = 0; i < tableRightAnswerPlayer.length; i++)
            {
                tablePoint[tableRightAnswerPlayer[i]] += 1;
            }
            var test = [];
            test['truc'] = 't';
            io.sockets.emit('points', 
            {
                tab: tablePoint,
                tabJ: quizzPlayers
            }
            )
            //Affiche un message en fonction du nombre de joueurs ayant obtenu la bonne réponse
            if (tableRightAnswerPlayer.length != 0 )
            {
                io.sockets.emit('quizzMessage', 
                {
                    message: 
                    '<div class="message">'
                    + "La bonne réponse était " + tableQuestion[nRound].lettre + ' ' + tableQuestion[nRound].bonnerep + "."
                    + '</div>'
                    + '<div class="message">'
                    + "Le(s) joueur(s) : " + tableRightAnswerPlayer + " a/ont obtenu 1 point pour avoir répondu correctement."
                    + '</div>'
                }
                )
            }
            else
            {
                io.sockets.emit('quizzMessage', 
                {
                    message: 
                    '<div class="message">'
                    + "La bonne réponse était " + tableQuestion[nRound].bonnerep + "."
                    + '</div>'
                    + '<div class="message">'
                    + "Personne n'as répondu correctement. Nullards"
                    + '</div>'
                }
                )
            }
            nRound++;
            clearInterval(timer);
            roundQuestion();
        }
        else
        {
            return false;
        }
    }
    /*
     * Affiche la question et les réponse possible dans le chat.
     */
    function displayQuestion(nRound)
    {
        io.sockets.emit('quizzMessage', 
        {
            message : '<div class="message question">'
                + tableQuestion[nRound].question
                + '</div>'
                + '<div class="message reponse">'
                + "A. " + tableQuestion[nRound].choix[0]
                + '</div>'
                + '<div class="message reponse">'
                + "B. " + tableQuestion[nRound].choix[1]
                + '</div>'
                + '<div class="message reponse">'
                + "C. " + tableQuestion[nRound].choix[2]
                + '</div>'
                + '<div class="message reponse">'
                + "D. " + tableQuestion[nRound].choix[3]
                + '</div>'
                + '<div class="message reponse">'
                + "E. " + tableQuestion[nRound].choix[4]
                + '</div>'
        }
        );
    }

    /*
     * Termine le quizz, calcul si il y a un gagnant et affiche le message correspondant.
     */
    function endQuizz()
    {
        let winners = [];
        for (let i = 0; i < quizzPlayers.length; i++)
        {
            tablePointFinal.push(tablePoint[quizzPlayers[i]]);
        }
        quizzPlayers.forEach(joueur => 
        {
            if (tablePoint[joueur] >= Math.max(tablePointFinal) && Math.max(tablePointFinal) > 0 )
            {
                winners.push(joueur);
            }
        });
            
        quizzState = 'Stopped';
        if (winners.length == 0)
        {
            io.sockets.emit('quizzMessage', 
            {
                message: 
                    '<div class="message">'
                    + "Le quizz est terminé !"
                    + '</div>'
                    + '<div class="gagnant">'
                    + "&#10024; &#10024; Il n'y as pas de gagnant (faites un effort quand même...) &#10024; &#10024;"
                    + '</div>'
            }
            )
        }
        else if (winners.length == 1)
        {
            io.sockets.emit('quizzMessage', 
            {
                message: 
                    '<div class="message">'
                    + "Le quizz est terminé !"
                    + '</div>'
                    + '<div class="gagnant">'
                    + "&#10024; &#10024; Le gagnant est " + winners.join(', ') +  " ! Bravo. &#10024; &#10024;"
                    + '</div>'
            }
            )
        }
        else
        {
            io.sockets.emit('quizzMessage', 
            {
                message: 
                    '<div class="message">'
                    + "Le quizz est terminé !"
                    + '</div>'
                    + '<div class="gagnant">'
                    + "&#10024; &#10024; Les gagnants sont " + winners.join(', ') +  " ! Bravo a eux. &#10024; &#10024;"
                    + '</div>'
            }
            )
        }
    }
}