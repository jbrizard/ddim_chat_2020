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
let tempsQuestion = 20;

function handleQuizz(io, message, name)
{
    if(message.includes("!StartQuizz"))
    {

        if(quizzState == "Stopped"){
            quizzState = "Waiting";
            quizzPlayers.push(name);
            timerTime = 15;
            timer = setInterval(function(){quizzTimerStart()} , 1000);
            io.sockets.emit('quizzStart', 
                {

                    message:name+ " a lancé le quizz ! Vous avez" + timerTime + " secondes pour taper '!JoinQuizz' afin de participer "
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

        for(let i = 0; i < 10; i++){
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
        RoundQuestion();


    }

    function RoundQuestion(){

        if(nRound < 10){
            console.log(nRound);
            DisplayQuestion(nRound);

            timerTime = tempsQuestion;
            timer = setInterval(function(){quizzTimerQuestion()}, 1000);

            function quizzTimerQuestion(){
                timerTime --;
                if(timerTime == 0){
                    nRound++;
                    console.log(nRound);
                    RoundQuestion();
                    clearInterval(timer);
                }
                else{
                    return false;
                }
            }
        }

        function DisplayQuestion(nRound){
            io.sockets.emit('displayQuestion', 
                {
                    tab: tabQ,
                    nRound: nRound,
                }
            );
        }

    }

}