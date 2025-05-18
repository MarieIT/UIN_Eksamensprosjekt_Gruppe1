import { client } from "../client";

export async function fetchProfilePageInfo(username){
    const data = await client.fetch(`*[_type == 'user' && username == '${username}']{
            "image": image.asset -> url,
            name,
            "prevpurchase": previouspurchase[]->{apiid},
            wishlist[]->{apiid, title},
            friends[] -> {
                name, 
                "image": image.asset -> url,
                "commonEvents": wishlist[@._ref in ^.^.wishlist[]._ref] -> {
                    apiid,
                    title,
                }
            }
        }`)
    return data
}

export async function fetchLogginn(username, password) {
    const data = await client.fetch(`count(*[_type == 'user' && username == '${username}' && password == '${password}']) > 0`)
    return data
}