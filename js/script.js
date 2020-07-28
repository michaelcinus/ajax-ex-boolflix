function clickBtn() {

    var btn = $('#cerca');
    btn.click(generaFilm);


}

function generaFilm(){

    var input = $('#input-film');
    var inputFilm = input.val();
    input.val('');


    $.ajax({

        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data : {

            'api_key' : '34d6929b2eac3e033e5899c3f6db1104' ,
            'query' : inputFilm

        },
        success: function(data) {

            var  film = data['results'];
            stampaFilm(film);

        },
        error: function(request,state,error){

        }

    })

}

function stampaFilm(film) {

    var template = $('#template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.film-container');
    target.text('');

    for (var i = 0; i < film.length; i++) {

            var filmSelez = film[i];
    
            var filmHTML = compiled({
    
                'titolo' : filmSelez['title'],
                'titolo_originale' : filmSelez['original_title'],
                'lingua' : filmSelez['original_language'],
                'voto' : filmSelez['vote_average'],
    
            });
    
            target.append(filmHTML); 
            
    }

}

function init(){
    
    clickBtn();

}

$(document).ready(init);