class Player {
    constructor(cards, numer){
        this.cards = cards
        this.numer = numer
    }

    getTopCard(){
        return this.cards.pop()
    }

    setCardToBottom(cards){
        this.cards = cards.concat(this.cards)
    }
}


class Botva {
    players = []
    turn = 0
    isFinished = false
    finishStatus = 0

    constructor(maxPlayers = 2, maxTurns = 100){
        this.maxPlayers = maxPlayers
        this.maxTurns = maxTurns
    }

    cardDistribution(){
        const playersCard = this.players.map(player => player.getTopCard())
        if (playersCard.every(card => card === playersCard[0])) {
            return
        }
        const maximum = Math.max(...playersCard)
        const indexPlayer = playersCard.indexOf(maximum)
        const cardsWithoutWinner = playersCard.slice(0, indexPlayer).concat(playersCard.slice(indexPlayer + 1))
        this.players[indexPlayer].setCardToBottom([maximum, ...cardsWithoutWinner])
    }

    play() {
        this.cardDistribution()
        return this.checkFinishGame()
    }

    checkFinishGame(){
        this.finishStatus = this.checkStatus() //?
        if (this.finishStatus > 0) {
            this.isFinished = true
            return true
        }
        return false
    }

    checkPlayerWin(player) {
        if(!player.cards.length) return false
        const otherPlayers = this.players.filter(item => item !== player)
        if(otherPlayers.every(item=> !item.cards.length)) return true
        return false
    }

    checkStatus(){
        for(let player of this.players) {
            if (this.checkPlayerWin(player)) {
                return player.numer
            }
        }
        if(this.turn >= 100) return 3
        if(this.players.every(player => !player.cards.length)) return 3
        return 0
    }

    printResult(finishStatus){
        switch(finishStatus) {
            case 1:
                return `First player. Round: ${this.turn}`
            case 2:
                return `Second player. Round: ${this.turn}`
            default:
                return 'Botva'

        }
    }

    resetGame(){
        this.players = []
        this.turn = 0
        this.isFinished = false
        this.finishStatus = 0
    }

    run(cards1, cards2){
        const player1 = new Player(cards1, 1)
        const player2 = new Player(cards2, 2)
        this.players = [player1, player2]
        while(!this.isFinished){
            this.turn++
            this.play()
            this.finishStatus
        }
        let result = this.printResult(this.finishStatus)
        this.resetGame()
        return result
    }
}


const game = new Botva()
const player1 = new Player([1], 1)
const player2 = new Player([1], 2)

game.run(player1.cards, player2.cards) //?


const generateArray = (length, value) => Array.from({ length }, () => value);
const rounds = [
    [[1], [2], 'Second player. Round: 1'],
    [[2], [1], 'First player. Round: 1'],
    [[1], [1], 'Botva!'],
    [[1, 2], [3, 2], 'Second player. Round: 2'],
    [[1, 3], [2, 1], 'First player. Round: 4'],
    [generateArray(100, 1), generateArray(100, 1), 'Botva!'],
];

rounds.forEach(item => {
    game.run(item[0], item[1]) //?
})
