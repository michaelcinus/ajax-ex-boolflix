function clickBtn() {

    var btn = $('#cerca');
    btn.click(genera);


}

function genera(){

    var input = $('#input-film');
    var inputFilm = input.val();
    input.val('');

    generaFilm(inputFilm);
    generaSerie(inputFilm);

}

function generaFilm(inputFilm){

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

function generaSerie(inputFilm){

    $.ajax({

        url: 'https://api.themoviedb.org/3/search/tv',
        method: 'GET',
        data : {

            'api_key' : '34d6929b2eac3e033e5899c3f6db1104' ,
            'query' : inputFilm

        },
        success: function(data) {

            var  film = data['results'];
            stampaSerie(film);

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

                'poster' : filmSelez['poster_path'],
                'titolo' : filmSelez['title'],
                'titolo_originale' : filmSelez['original_title'],
                'lingua' : creaBandiera(lingua),
                'stella1' : stella[0],
                'stella2' : stella[1],
                'stella3' : stella[2],
                'stella4' : stella[3],
                'stella5' : stella[4],
                'overview' : filmSelez['overview']

    
            });

            target.append(filmHTML); 
            
    }

}

function stampaSerie(film) {

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

                'poster' : filmSelez['poster_path'],
                'nome' : filmSelez['name'],
                'nome_originale' : filmSelez['original_name'],
                'lingua' : creaBandiera(lingua),
                'stella1' : stella[0],
                'stella2' : stella[1],
                'stella3' : stella[2],
                'stella4' : stella[3],
                'stella5' : stella[4],
                'overview' : filmSelez['overview']

    
            });

            target.append(filmHTML); 
            
    }

}


function creaBandiera(lingua) {

    if (lingua == "en") {

        return "./img/en.svg"
    } else if (lingua == "it") {

        return "./img/it.png"

    } else if (lingua == "fr") {
        
        return "./img/fr.svg"
    } else if (lingua == "es") {

        return "./img/es.jpg" 
    } else {
        return lingua
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