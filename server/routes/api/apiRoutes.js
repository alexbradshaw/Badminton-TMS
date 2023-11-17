const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
    
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username; 
     
            res.json(user);
          })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ 
            where: { 
                username: req.body.username 
            }, 
        }); 

        console.log(user);

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        const passCorrect = await user.isCorrectPassword(req.body.password); 

        if (!passCorrect) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username; 
    
            res.json(user);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({message: "Successfully logged out."});
      });
});

module.exports = router;