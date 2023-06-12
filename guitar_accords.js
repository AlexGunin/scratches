const notes = {
    A: 'Ля',
    'A#': 'Ля диез',
    B: 'Си',
    C: 'До',
    'C#': 'До диез',
    D: 'Ре',
    'D#': 'Ре диез',
    E: 'Ми',
    F: 'Фа',
    'F#': 'Фа диез',
    G: 'Соль',
    'G#': 'Соль диез'
}
const listNotes = Object.entries(notes).map(([key, value]) => ({note: key, description: value}))
const getNoteByDescription = (note) => listNotes.find((item) => item.description === note)

const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result
}

class Guitar {
    guitarFormation = []
    allNotesByFrets = []
    emptyFret = []
    amountFrets = 0
    maxWidthChord = 0

    constructor(guitarFormation = [notes.E, notes.B, notes.G, notes.D, notes.A, notes.E], amountFrets = 16, maxWidthChord = 3) {
        this.guitarFormation = guitarFormation
        this.amountFrets = amountFrets;
        this.maxWidthChord = maxWidthChord;
        this.emptyFret = this.guitarFormation.map(getNoteByDescription)
        this.allNotesByFrets = this.getAllNotes()
    }

    getAllNotes = () => {
        const multiply = Math.ceil(this.amountFrets / listNotes.length)
        const reccuringListNotes = Array(multiply + 1).fill(null).reduce((acc) => [...acc, ...listNotes], [])

        return this.guitarFormation.map((startNote) => {
            const indexNote = reccuringListNotes.findIndex((item) => item.description === startNote)

            return reccuringListNotes.slice(indexNote, indexNote + this.amountFrets + 1)
        })
    }

    getNotesByFret = (value = 1) => this.allNotesByFrets.map(fret => fret[value])

    getNoteByFret = (fret, indexNote) => this.getNotesByFret(fret)[indexNote]

    checkIsChord = (notes, noteRepeat = 2, duplicateNotes = 2) => {
        return Object.values(notes.reduce((acc, {note}) => {
            acc[note] = acc[note] ? acc[note] + 1 : 1
            return acc
        }, {})).filter(item => item >= noteRepeat).length >= duplicateNotes
    }

    *getAllCombinations(frets = this.amountFrets, maxSize = 3){
        const currentShift = [0, 0, 0, 0, 0, 0]
        const cache = new Set()
        while (currentShift[currentShift.length - 1] !== frets) {
            const min = Math.min(...currentShift)
            const max = min + maxSize
            for (let i = 0; i < currentShift.length; i++) {
                if(currentShift[i] + 1 <= max && currentShift[i] + 1 <= frets) {
                    currentShift[i] += 1
                    const shiftPermutations = permutator(currentShift)
                    for (let j = 0; j < shiftPermutations.length; j++) {
                        const current = shiftPermutations[j]
                        const str = current.join('-')
                        if(cache.has(str)) continue

                        cache.add(str)
                        yield current
                    }
                    break
                }
            }
        }

        for (const cachedStr of cache) {
            const cachedShifts = cachedStr.split('-').map(Number)
            for (let i = 0; i < cachedShifts.length; i++) {
                const newShifts = cachedShifts.slice(0, i).concat(0).concat(cachedShifts.slice(i + 1))
                const str = newShifts.join('-')
                if(str === '0-0-0-0-0-0') console.log('HERE')
                if (cache.has(str)) continue

                cache.add(str)
                yield newShifts
            }
        }
    }

    updateShifts = (shifts, finishFret, maxSize) => {
        const min = Math.min(...shifts)
        const max = min + maxSize
        const result = [...shifts]
        let counter = 1
        while (counter > 0) {
            for (let i = 0; i < result.length; i++) {
                if(result[i] + 1 <= max && result[i] + 1 <= finishFret) {
                    result[i] += 1
                    counter--
                    break
                }
            }
            counter--
        }

        return result
    }

    *getChords(props) {
        const { startFret = 0, finishFret = this.amountFrets, maxSize = this.maxWidthChord, noteRepeat, duplicateNotes} = props ?? {}
        const notes = this.allNotesByFrets.slice(startFret, finishFret + 1)
        const allCombination = this.getAllCombinations(finishFret, maxSize)

        for (const combination of allCombination) {
            const chord = combination.map(this.getNoteByFret)
            if(this.checkIsChord(chord, noteRepeat, duplicateNotes)) {
                yield {
                    chord,
                    shifts: combination
                }
            }
        }
    }

    countSimilarityOfChords = (ch1, ch2) => {
        let counter = 0
        const chord1 = [...ch1]
        const chord2 = [...ch2]
        chord1.forEach(note => {
            const indexNoteInAnotherChord = chord2.findIndex((item) => item === note)
            if(indexNoteInAnotherChord === -1) return
            chord2.splice(indexNoteInAnotherChord, 1)
            counter++
        })
        return counter
    }

    *getSameChord(notes = [], similarity = 6) {
        if(notes.length < similarity) return false
        const allCombinationGenerator = this.getAllCombinations()

        for (const combination of allCombinationGenerator) {
            const chord = combination.map((item, index) => this.getNoteByFret(item,index).note)
            const countedSimilarity = this.countSimilarityOfChords(notes, chord)

            if(countedSimilarity >= similarity && chord.join('') !== notes.join('')) {
                yield {
                    chord,
                    shift: combination
                }
            }
        }

        return false
    }
}



const guitar = new Guitar()
const chordsGenerator = guitar.getChords({noteRepeat: 2, duplicateNotes: 3, maxSize: 6})//?
const GChord = [notes.E, notes.C, notes.G, notes.E, notes.C, notes.E].map((item) => getNoteByDescription(item).note)
const sameChordGenerator = guitar.getSameChord(GChord, 6)

sameChordGenerator.next() //?
sameChordGenerator.next() //?
