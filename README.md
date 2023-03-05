# Tomtens Biograf

[Whimsical](https://whimsical.com/tomtens-api-9m4LThum8Xc2tLJEWhHF7y) (meeting notes)

[Whimsical](https://whimsical.com/tomtens-api-9m4LThum8Xc2tLJEWhHF7y) (meeting notes)

## API DOCUMENTATION

### /api/screenings

GET: Get all the screenings  


---

### /api/movies/{id}

GET: Get movie with the {id}  


---

### /api/movies/{id}/screenings

*GET*: Get all screenings for moive with the {id}   

---

### /api/movies/{id}/reviews?page=1

*GET*: Get all the verified reviews for movie with the {id}

---

### /api/movies/{id}/reviews


*POST*: Add review for movie {id}
```
body: {
name: “”,
rating: 4,
comment: “”,
},
headers: { 
Authorization: “Bearer {token}” 
}
```

---



### /api/movies/{id}/rating

*GET*: Get the rating, from reviews that are verified, for the movie with the {id}

---

### /api/token

*POST*: Get JWT token

```
headers: { 
Authorization: “Basic {username}:{password} 
}
```
