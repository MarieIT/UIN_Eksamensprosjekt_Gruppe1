//Oppretter bruker innholdstype 

const user = {
    title: "Bruker", 
    name: "user", 
    type: "document", 
    fields: [
        
        {
            name: "name", 
            type: "string", 
            title: "Navn"
        }, 

        {
            name: "gender", 
            type: "string", 
            title: "Kjønn"
        }, 

        {
            name: "age", 
            type: "number",
            title: "Alder" 
        }, 

        {
            name: "previouspurchase", 
            type: "reference", 
            title: "Tidligere kjøp", 
            to: [{type: "event"}]
        }, 

        {
            name: "wishlist", 
            type: "reference", 
            title: "Ønskeliste", 
            to: [{type: "event"}]
        }, 

        {
            name: "username", 
            type: "string", 
            title: "Brukernavn"
        }, 

        {
            name: "password",
            type: "string", 
            title: "Passord"
        }, 

        { 
            name: "friends", 
            type: "reference", 
            title: "Venner", 
            to: [{type: "user"}]
        }, 

        {
            name: "image", 
            type: "image", 
            title: "Bilde"
        }
    ]
}

export default user

