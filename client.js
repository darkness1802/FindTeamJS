const findTeam = () => {

    socket.emit("find-team", {
        part:"some thing", 
        subject: "some thing", 
        tage: "some thing",
        username: "some thing"
    })

}

// On error or pre success find team :

useEffect(() => {

    socket.on(`error:find-team`, (data) => {
        console.log(data)
    }) 
    socket.on(`pre:find-team`, (data) => {
        console.log(data)
    })

}, [])

// On success :

useEffect(() => {

    socket.on(`success:find-team`, (data) => {
        let isOkay = window.confirm(`Founded,Join now ?`)
        if (isOkay) history.push(`/join/${data}`) // redirect to ...
    })

}, [])

// Exit queue :
const leftQueue = () => {
    socket.emit('left-queue', { command:"this is room name which get from pre:find-team event", username: "this is username" })
    setShowQueue(false)
}
