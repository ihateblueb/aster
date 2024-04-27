const router = require('express').Router();

router.get('/users/:userid', (req, res) => {
    if (!userid) {
        return res.status(400).send('Bad request');
    } else if (userid === "blueb") {
        res.json({
            "@context": [
                "https://www.w3.org/ns/activitystreams",
                "https://w3id.org/security/v1"
            ],
        
            "id": "https://shit1.blueb.me/users/blueb",
            "type": "Person",
            "preferredUsername": "blueb",
            "inbox": "https://shit1.blueb.me/users/blueb/inbox",
        
            "publicKey": {
                "id": "https://shit1.blueb.me/users/blueb#main-key",
                "owner": "https://shit1.blueb.me/users/blueb",
                "publicKeyPem": "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6x7mU1kZXOcyOGyzMzL RL3X/5Jt21asBxMQaFbZokOD+C6lBP6zm/RcM+lVOf12JCdHCNWLsBMPRUxJuXHU IR8M+5RvBMuvW6gtKHlj4u7AZESo4oEoqqgHF+IqFaJArXHTWom/8h3hLoUEEyfz FpbRp2bpvOMW0WevoAAtxJh0dk0kQXrFiM9fNi+l1SvXjjm2aY8+VmSC4t8Ew402 sVmoP25b10GjfamTDq+hZ060zgyHIt4P4lp7+mDQXqZMGCDzo8RidmkyWbo+1APd 9MmeN+o0ZrJzjU/D9PAelsyhjQVt0itl6kYB20ZyZLOOmn6+/lnJCLfiMyMduqGE WwIDAQAB-----END PUBLIC KEY-----"
            }
        })
    }
})

module.exports = router;
