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
            type: "array", 
            title: "Tidligere kjøp", 
            of: [
                {
                    type: "reference", 
                    to: [{type: "event"}]
                }
            ]
        }, 

        {
            name: "wishlist", 
            type: "array", 
            title: "Ønskeliste",
            of: [
                {
                    type: "reference", 
                    to: [{type: "event"}]
                }
            ]
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
            type: "array", 
            title: "Venner", 
             of: [
                {
                    type: "reference", 
                    to: [{type: "user"}]
                }
            ]
        }, 

        {
            name: "image", 
            type: "image", 
            title: "Bilde"
        }
    ]
}

export default user

