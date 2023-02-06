const API_KEY = "6de06ef5"
const API_BASE = "https://www.omdbapi.com/?apikey=" + API_KEY;

export async function loadIMDBMovieRating (id, query = "&i=") {

    const res = await fetch(API_BASE + query + id);
    const data = await res.json();

    if (data.Response == 'False') {

        return data;

    } else {
        
        return data.imdbRating;
    }
    
}


