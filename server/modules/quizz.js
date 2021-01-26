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
let quizzPlayers = [];
let timer;
let timerState = false;
let tabQ;
let tempsQuestion = 0;
let QuestionState = "off";
let ReponseTab = {};
let tabJoueurBonneRéponse = [];
let tabPoints = {};
let tabPointFinaux = [];
let winner;

//Socket.id > socket.name car pas de doublons
function handleQuizz(io, message, name)
{
    if(message.includes("!StartQuizz"))
    {

        if(quizzState == "Stopped"){
            quizzState = "Waiting";
            quizzPlayers.push(name);
            timerTime = 5;
            messageSplit = message.split(" ");
            nbQuestionTotal = parseInt(messageSplit[1]) || 10;
            tempsQuestion = parseInt(messageSplit[2]) || 10;
            timer = setInterval(function(){quizzTimerStart()} , 1000);
            io.sockets.emit('quizzStart', 
                {
                    name: name,
                    message: name+ " a lancé le quizz ! Vous avez " + timerTime + " secondes pour taper '!JoinQuizz' afin de participer "
                }
            );
        }
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


    if(message.includes("!JoinQuizz"))
    {
        if(quizzState == 'Stopped' || !timerState){
            io.sockets.emit('joinQuizz', 
                {
                    name: name,
                    state:'error',
                    message:" Impossible de rejoindre le quizz car personne ne l'as créer, pour ca, veuillez taper '!StartQuizz' !"
                }
            );
        }
        else if(quizzPlayers.indexOf(name) !== -1)
        {
            io.sockets.emit('joinQuizz', 
                {
                    state:'error',
                    message:" Impossible de rejoindre le quizz car vous participez déja !"
                }
            )
        }
        else{
            quizzPlayers.push(name);
            io.sockets.emit('joinQuizz', 
                {
                    state:'',
                    message:name+ " a rejoint le quizz !"
                }
            );
        }
    }

    if (['A', 'B', 'C', 'D', 'E'].includes(message.toUpperCase()))
    {

        if(QuestionState == "on"){
            ReponseTab[name] = message.toLowerCase();
            io.sockets.emit('Repond', 
                {
                    message: "Vous avez répondu " + message.toUpperCase() + " a cette question. "
                }
            );
        }
    }


    function quizzTimerStart(){

        timerTime--;
        timerState = true;

        if(timerTime <= 0){
            timerState = false;
            clearInterval(timer);
            quizzState = "Playing";
            InitQuestions();
        }
    }

    function InitQuestions(){

        questionQuizz = [];
        tabQ = [];
        let ind;

        for(let i = 0; i < nbQuestionTotal; i++){
            ind = Math.round(Math.random()*tab_ques.length);
            while(tabQ.indexOf(ind) !== -1){
                ind = Math.round(Math.random()*tab_ques.length);
            }
            tabQ.push(ind);
        }
        for(let i = 0; i < tabQ.length; i++){
            tabQ[i] = tab_ques[tabQ[i]];
        }

        nRound = 0;
        for(let i = 0; i < quizzPlayers.length; i++){
            tabPoints[quizzPlayers[i]] = 0;
        }
        RoundQuestion();


    }

    function RoundQuestion(){

        if(nRound < nbQuestionTotal){
            DisplayQuestion(nRound);
            QuestionState = "on";
            ReponseTab = [];
            tabJoueurBonneRéponse = [];

            timerTime = tempsQuestion;
            timer = setInterval(function(){quizzTimerQuestion()}, 1000);

            function quizzTimerQuestion(){
                timerTime --;
                if(timerTime == 0){
                    QuestionState = "off";
                    for(let i = 0; i < quizzPlayers.length; i++){
                        if(ReponseTab[quizzPlayers[i]] == tabQ[nRound].lettre.toLowerCase()){
                            tabJoueurBonneRéponse.push(quizzPlayers[i]);
                        }
                    }
                    for(let i = 0; i < tabJoueurBonneRéponse.length; i++){
                        tabPoints[tabJoueurBonneRéponse[i]] += 1;
                    }
                    var test = [];
                    test['truc'] = 't';
                    io.sockets.emit('Points', 
                    {
                        tab: tabPoints,
                        tabJ: quizzPlayers
                    }
                    )
                    if(tabJoueurBonneRéponse.length != 0 ){
                        io.sockets.emit('Reponse', 
                        {
                            message: "La bonne réponse était " + tabQ[nRound].lettre + ' ' + tabQ[nRound].bonnerep + ".",
                            message2: "Le(s) joueur(s) : " + tabJoueurBonneRéponse + " a/ont obtenu 1 point pour avoir répondu correctement."
                        }
                        )
                    }
                    else{
                        io.sockets.emit('Reponse', 
                        {
                            message: "La bonne réponse était " + tabQ[nRound].bonnerep + ".",
                            message2: "Personne n'as répondu correctement. Nullards"
                        }
                        )
                    }
                    nRound++;
                    RoundQuestion();
                    clearInterval(timer);
                }
                else{
                    return false;
                }
            }
        }
        else{
           EndQuizz();
        }



        function DisplayQuestion(nRound){
            io.sockets.emit('displayQuestion', 
                {
                    tab: tabQ,
                    nRound: nRound,
                }
            );
        }

        function EndQuizz(){
            for(let i = 0; i < quizzPlayers.length; i++){
                tabPointFinaux.push(tabPoints[quizzPlayers[i]]);
            }
            quizzPlayers.forEach(joueur => {
                if(tabPoints[joueur] >= Math.max(tabPointFinaux)){
                    winner = joueur;
                }
            });
            quizzState = "Stopped";
            quizzPlayers = [];
            tabPointFinaux = [];
            nRound = 0;
            io.sockets.emit('EndQuizz', 
            {
                message: "Le quizz est terminé !",
                message2: "&#10024; &#10024; Le gagnant est " + winner +  " ! Bravo. &#10024; &#10024;"
            }
            )
        }

    }

}