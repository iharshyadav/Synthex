import { httpRouter } from "convex/server";
import { userCreated } from "./message";


const http = httpRouter();

http.route({
    path : "/clerk-webhook",
    method : "POST",
    handler : userCreated
})


export default http;