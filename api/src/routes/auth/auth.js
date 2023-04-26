import login from "../../business-logic/auth/login.js"
import register from "../../business-logic/auth/register.js"
import me from "../../business-logic/auth/me.js"
import logout from "../../business-logic/auth/logout.js"

export default function (app) {
    app.get("/auth/me", me)
    app.post("/auth/login", login)
    app.post("/auth/register", register)
    app.post("/auth/logout", logout);
}