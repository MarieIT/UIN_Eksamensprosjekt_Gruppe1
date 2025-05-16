import { client } from "../client";

export async function fetchProfilePageInfo(username){
    const data = await client.fetch(`*[_type == 'user' && username == '${username}']{
            "image": image.asset -> url,
            name,
            "prevpurchase": previouspurchase[]->{apiid},
            wishlist[]->{apiid, title},
            friends[] -> {name, "image": image.asset -> url}
        }`)
    return data
}