$(document).on('click', '#btn-translate',function(){
	
	// récupération des valeurs du formulaire
	var langueSource = $(this).siblings("#translate-source").val();
	var langueCible = $(this).siblings("#translate-cible").val();
	var texte = $(this).siblings("#translate-text").val();

	// envoi des valeurs côté serveur
	socket.emit('boutonTranslate', langueSource, langueCible, texte);
})
