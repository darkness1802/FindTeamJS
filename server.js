var teams = []

io.on(`connection`, (socket) => {

    socket.on('find-team', (data) => {
        console.log(data.username, "START FIND TEAM")
        //1. Checking exist user
        if (teams.includes(data.username)) {
            socket.emit(`error:find-team`, { exist: true, msg: `user ${data.username} existed` });
        } else {
            teams.push(data.username)

            //2. Join room (same tage, subject, part, ...)
            socket.join(`${data.tage + data.subject + data.part}`)
            if (teams.length >= 3) {
                teams = []
                io.to(`${data.tage + data.subject + data.part}`).emit('success:find-team', Math.round(Math.random() * 909090909090))
            } else {
                io.to(`${data.tage + data.subject + data.part}`).emit('pre:find-team', { payload: data.tage + data.subject + data.part, msg: `Some one joined` })
            }

        }
    })

    socket.on('left-queue', (data) => {
        teams = teams.filter(item => item !== data.username)
        socket.leave(`${data.command}`)
    })

})
