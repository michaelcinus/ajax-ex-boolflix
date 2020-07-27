function generaFilm(){

    $.ajax({

        url: 'https://api.themoviedb.org/3/movie/550?api_key=34d6929b2eac3e033e5899c3f6db1104',
        method: 'GET',
        success: function(title,) {

            var  film = [
                {
                    "titolo" : title['title'],
                    "titolo_originale" : title['original_title'],
                    "lingua" : title['original_language'],
                    "voto" : title['vote_average'],
                },
            ];
            stampaFilm(film);

        },
        error: function(request,state,error){

        }

    })
}

function stampaFilm(film) {

    for (var i = 0; i < film.length; i++) {

            var filmSelez = film[i];
    
            var template = $('#template').html();
            var compiled = Handlebars.compile(template);
            var target = $('.film-container');
    
            var filmHTML = compiled({
    
                'titolo' : filmSelez['titolo'],
                'titolo_originale' : filmSelez['titolo_originale'],
                'lingua' : filmSelez['lingua'],
                'voto' : filmSelez['voto'],
    
            });
    
            target.append(filmHTML); 
            
    }

}

function init(){
    
    generaFilm();

}

$(document).ready(init);