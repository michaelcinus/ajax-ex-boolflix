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
       // url : 'https://api.themoviedb.org/3/search/tv' ,
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
            var lingua = filmSelez['original_language'];
            var voto = parseInt(filmSelez['vote_average']/2);
            var stella = [];
            creaStelle(voto, stella);

            var filmHTML = compiled({
    
                'titolo' : filmSelez['title'],
                'nome' : filmSelez['name'],
                'titolo_originale' : filmSelez['original_title'],
                'nome_originale' : filmSelez['original_name'],
                'lingua' : lingua,
                'stella1' : stella[0],
                'stella2' : stella[1],
                'stella3' : stella[2],
                'stella4' : stella[3],
                'stella5' : stella[4]

    
            });

            target.append(filmHTML); 
            
    }

}

function creaStelle(voto, stella) {

    for (var i = 1; i <=5; i++) {

        if (voto < i ){

            stella.push('far')

        } else {

            stella.push('fas')
        }
    }

}


function init(){
    
    clickBtn();

}

$(document).ready(init);