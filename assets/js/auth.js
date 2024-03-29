var user = {}

$('document').ready(function () {
    
    var fetchAccessToken = function (code) {
        $.ajax({
                url: "https://discordapp.com/api/v6/oauth2/token",
                data: {
                    client_id: '570810906079133728',
                    client_secret: 'o07_FYGDHCOs2QTNRvR0JsGKlqgj3fTB',
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'https://lileu.github.io/SC_200/dashboard.html',
                    scope: 'identify email connections'
                },
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }


            })
            .then((resp) => {
                if (resp.error === "invalid_grant") {
                    window.location.replace("https://discordapp.com/api/oauth2/authorize?client_id=570810906079133728&redirect_uri=https%3A%2F%2Flileu.github.io%2FSC_200%2Fdashboard.html&response_type=code&scope=identify%20email%20connections%20guilds");
                }
                localStorage.setItem("refresh_token", resp.refresh_token);

                fetchuser(resp.access_token)
            })
            .fail(function (e) {
                console.log(e)
                localStorage.removeItem('user');
                window.location.replace("https://discordapp.com/api/oauth2/authorize?client_id=570810906079133728&redirect_uri=https%3A%2F%2Flileu.github.io%2FSC_200%2Fdashboard.html&response_type=code&scope=identify%20email%20connections%20guilds");
            })


    }

    if(localStorage.getItem('user') !== null ){
        user = JSON.parse(localStorage.getItem('user'));

        $('#user').text(user.username)

        $('#avatar').attr({
            src: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
        })

    }
    else{
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        fetchAccessToken(code);
    }

    var fetchuser = function (access_token) {

        $.ajax({
                url: "https://discordapp.com/api/v6/users/@me",

                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }

            })
            .then(
                (resp) => {
                    $('#user').text(resp.username)

                    $('#avatar').attr({
                        src: `https://cdn.discordapp.com/avatars/${resp.id}/${resp.avatar}`
                    })


                    user = resp;

                    localStorage.setItem('user', JSON.stringify(resp));

                }

            )
    }
});