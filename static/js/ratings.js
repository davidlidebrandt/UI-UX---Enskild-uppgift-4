async function getRating() {
    const id = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    
    const res = await fetch(`/api/movies/${id}/rating`);
    const data = await res.json();
    const rating = data.rating;

    const pRateing = document.querySelector(".movie-rating");
    const container = document.querySelector("#rating-container-element");
    const ul = document.querySelector(".movie-rating-hats");
    
    pRateing.innerText = rating;

    if (rating !== "API Error") {
    
        for (let i=0; i<5; i++) {
            
            let li = document.createElement("li");
            
            if (i < rating) {
            
                if ( i == Math.floor(rating)) {
            
                    li.classList.add("hat-halffill");
            
                } else {
            
                    li.classList.add("hat-fill")
                }
            } else {

                li.classList.add("hat-nofill")
            }

            ul.appendChild(li);
        }

        container.append(ul);
    }
};

getRating();