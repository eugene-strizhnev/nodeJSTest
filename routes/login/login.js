/**
 * Created by Yevhen_Strizhnev on 01.12.13.
 */

exports.login = function (req, res) {
    if (req.param("username") && req.param("password")) {
        var answer = {
            response: "ok"
        }
        res.send(answer)

    } else {
        console.log("bla")
        res.render("login/login");
    }
}