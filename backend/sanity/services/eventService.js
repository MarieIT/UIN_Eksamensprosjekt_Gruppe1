import { client } from "../client";

export async function fetchSanityEvent(apiid){
    const data = await client.fetch(`*[_type == 'event' && apiid == '${apiid}']{
            title, 
            apiid,
            "wishlistreference": *[_type == 'user' && ^._id in wishlist[]._ref]{
                name,
                "image": image.asset -> url,
            },
            "previouspurchasereference": *[_type == 'user' && ^._id in previouspurchase[]._ref]{
                age,
                "image": image.asset -> url,
            }
        }`)
    return data
}