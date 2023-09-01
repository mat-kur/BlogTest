const User = require("../../db/models/user-model");


class Register {

    async registerSystem (req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            commentNumber: 0,
            isAdmin: 1,
        });

        if (req.files) {
            user.avatar = req.files;
        }

        try {
            await user.save()
            res.status(200).json({message: 'Register succes!'})
        } catch (e) {
            res.status(500).json({ message: "Błąd serwera", errors: { email: "Taki email jest już zajęty", username: "Taka nazwa użytkownika jest już zajęta" } });
        }
    }

}



module.exports = new Register()
