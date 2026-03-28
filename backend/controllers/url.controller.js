import { nanoid } from "nanoid"
import Url from "../models/url.model.js"
import ErrorClass from '../utilis/ErrorClass.js';
import wrapAsync from "../utilis/wrapAsnc.js";

export const index = wrapAsync(async (req, res, next) => {
    let { url } = req.body
    console.log(url)
    const alreadyExists = await Url.findOne({ full_url: url })
    console.log(alreadyExists)
if (alreadyExists) return res.send(alreadyExists)
    const shortUrl = new Url({
        full_url: url,
        short_url: nanoid(8) // use nanoid for unique short URL
    })
    const data = await shortUrl.save()
    console.log(data)
    if(data)  return res.send(data)
    // Pass error to next
    return next(new ErrorClass(400, "Bad request"))
})


export const redirectUrl = wrapAsync(async (req, res, next) => {
    let id = req.params.id
    console.log("id", id)
    let final = await Url.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } })
    if (final) {
        let redirectUrl = final.full_url
        if (!/^https?:\/\//i.test(redirectUrl)) {
            redirectUrl = "https://" + redirectUrl
        }
        return res.redirect(redirectUrl)
    }
    // Pass error to next
    return next(new ErrorClass(404, "Not found"))
})