//Oppretter event innholdstype

const event = {
    title: "Event",
    name: "event",
    type: "document",
    fields: [
        
        {
            name: "title",
            type: "string", 
            title: "Tittel på arrangementet",
        }, 

        {
            name: "apiid", 
            type: "string",
            title: "ApiID", 
        }
    ]
}

export default event 