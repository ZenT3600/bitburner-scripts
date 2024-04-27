import { tryStartOnManager } from "/lib/_utils.js"

let CHEATS = false
let STYLE = 1
const REPEAT = true

/** @param {NS} ns */
export async function main(ns) {
  if (tryStartOnManager(ns, ns.getHostname())) return
  ns.tail()
  ns.disableLog("ALL")
  const startBoard = ns.go.getBoardState()
  let inProgress = false
  let turn = 0
  for (let x = 0; x < startBoard[0].length; x++) {
    for (let y = 0; y < startBoard[0].length; y++) {
      if (startBoard[x][y] === "X") {
        inProgress = true
        turn = 3
        break
      }
    }
    if (inProgress) break
  }
  /*const facing = ns.go.getOpponent()
  switch (facing) {
    case "The Black Hand":
    case "Netburners":
      STYLE = 0
      break
    default:
      STYLE = 1
  }*/

  while (true) {
    turn++
    const board = ns.go.getBoardState()
    const contested = ns.go.analysis.getControlledEmptyNodes()
    const validMove = ns.go.analysis.getValidMoves()
    const validLibMoves = ns.go.analysis.getLiberties()
    const chains = ns.go.analysis.getChains()
    const size = board[0].length
    //Build a test board with walls
    const testBoard = []
    let testWall = ""
    let results;
    if (size === 13) testWall = "WWWWWWWWWWWWWWW"
    else if (size === 9) testWall = "WWWWWWWWWWW"
    else if (size === 7) testWall = "WWWWWWWWW"
    else if (size === 19) testWall = "WWWWWWWWWWWWWWWWWWWWW"
    else testWall = "WWWWWWW"
    testBoard.push(testWall)
    for (const b of board) testBoard.push("W" + b + "W")
    testBoard.push(testWall)
    //We have our test board

    if (turn < 3)// || (size === 19 && turn < 4))
      results = await movePiece(ns, getOpeningMove(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested)

    if (turn >= 4 || (size === 19 && turn >= 4)) {
      switch (STYLE) {
        case 0: //El Chupacabra - the relentless dog of the Black Hand //Netburners, The Black Hand
          if (results = await movePiece(ns, getRandomLibAttack(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomLibDefend(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 2), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomBolster(ns, board, validMove, validLibMoves, contested, chains, 2, 1), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 7), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, attackDragon(ns, board, validMove, validLibMoves, contested, 1), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 3), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 7), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomExpand(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomBolster(ns, board, validMove, validLibMoves, contested, chains, 3, 1), board, validMove, validLibMoves, contested) !== undefined) break

          if (results = await movePiece(ns, getRandomStrat(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          results = await ns.go.passTurn()
          break
        case 1: //El chupacabra!!
          if (results = await movePiece(ns, getRandomLibAttack(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomLibDefend(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 2), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomBolster(ns, board, validMove, validLibMoves, contested, chains, 2, 1), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 7), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 3), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, 3), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, getRandomAntiBolster(ns, board, validMove, validLibMoves, contested, chains, 1, 2), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, attackDragon(ns, board, validMove, validLibMoves, contested, 1), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, getRandomAttack(ns, board, validMove, validLibMoves, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 7), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 6), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 5), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, getRandomExpand(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          /*if (results = await movePiece(ns, attackGrowDragon(ns, board, validMove, validLibMoves, contested, 4), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, attackGrowDragon(ns, board, validMove, validLibMoves, contested, 3), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, attackGrowDragon(ns, board, validMove, validLibMoves, contested, 2), board, validMove, validLibMoves, contested) !== undefined) break
          if (results = await movePiece(ns, attackGrowDragon(ns, board, validMove, validLibMoves, contested, 1), board, validMove, validLibMoves, contested) !== undefined) break
          */
          if (results = await movePiece(ns, getRandomBolster(ns, board, validMove, validLibMoves, contested, chains, 3, 1), board, validMove, validLibMoves, contested) !== undefined) break
          //if (results = await movePiece(ns, growDragon(ns, board, validMove, validLibMoves, contested, 1), board, validMove, validLibMoves, contested) !== undefined) break

          if (results = await movePiece(ns, getRandomStrat(ns, board, validMove, validLibMoves, contested), board, validMove, validLibMoves, contested) !== undefined) break
          results = await ns.go.passTurn()
      } //End of style switch
    } // end of turn >= 3

    if (results?.type === "gameOver") {
      if (!REPEAT) return
      try { ns.go.resetBoardState(opponent2[Math.floor(Math.random() * opponent2.length)], 13) }
      catch { ns.go.resetBoardState(opponent[Math.floor(Math.random() * opponent.length)], 13) }
      inProgress = false
      turn = 0
      ns.clearLog()
      /*const newOpp = ns.go.getOpponent()
      switch (newOpp) {
        case "The Black Hand":
        case "Netburners":
          STYLE = 0
          break
        default:
          STYLE = 1
      }*/
    }
  }
}

/** @param {NS} ns */
function isPattern(ns, x, y, pattern, testBoard, validMove, contested, id) {
  // 4 by 4 will go outwards up to 3 squares, 7 square block
  //Move the pattern around with x/y loops, check if pattern matches IF a move is placed
  //We can assume that x and y are valid moves
  if (!validMove[x][y]) return false

  const size = testBoard[0].length
  let patterns;
  const patternSize = pattern.length
  switch (patternSize) {
    case 3:
      patterns = getAll3by3Patterns(pattern)
      break
    case 4:
      patterns = getAll4by4Patterns(pattern)
      break
    case 5:
      patterns = getAll5by5Patterns(pattern)
      break
    case 6:
      patterns = getAll6by6Patterns(pattern)
      break
    case 7:
      patterns = getAll7by7Patterns(pattern)
      break
  }

  for (const patternCheck of patterns) {
    //cx and cy - the spots of the pattern we are checking against the test board
    //For, say a 3x3 pattern, we do a grid of 0,0 -> 2, 2
    for (let cx = ((patternSize - 1) * -1); cx <= 0; cx++) { // We've added a wall around everything, so 0 is a wall
      if (cx + x + 1 < 0 || cx + x + 1 > size - 1) continue
      for (let cy = ((patternSize - 1) * -1); cy <= 0 - 1; cy++) {
        //We now have a cycle that will check each section of the grid against the pattern
        //Safety checks: We know 0,0 is safe, we were sent it, but each other section could be bad       
        if (cy + y + 1 < 0 || cy + y + 1 > size - 1) continue
        let count = 0
        let abort = false
        for (let px = 0; px < patternSize && !abort; px++) {
          if (x + cx + px + 1 < 0 || x + cx + px + 1 >= size) {  //Don't go off grid
            abort = true
            break
          }
          for (let py = 0; py < patternSize && !abort; py++) {
            if (y + cy + py + 1 < 0 || y + cy + py + 1 >= size) { //Are we off the map?
              abort = true
              break
            }
            if (cx + px === 0 && cy + py === 0 && !["X", "*"].includes(patternCheck[px][0][py])) {
              abort = true
              break
            }
            if (cx + px === 0 && cy + py === 0 && ["X"].includes(contested[x][y]) && patternCheck[px][0][py] !== "*") {
              abort = true
              break
            }
            //We now have a cycles for each spot in the pattern
            //0,0 -> 2,2 for a 3x3
            switch (patternCheck[px][0][py]) {
              case "X":
                if (testBoard[cx + x + 1 + px][cy + y + 1 + py] === "X" || (cx + px === 0 && cy + py === 0 && testBoard[cx + x + 1 + px][cy + y + 1 + py] === ".")) {
                  count++
                }
                else if (cx + px === 0 && cy + py === 0) {
                  count++ // Our placement piece
                }
                else abort = true
                break
              case "*": // Special case.  We move here next or break the test
                if (testBoard[cx + x + 1 + px][cy + y + 1 + py] === "." && cx + px === 0 && cy + py === 0) {
                  count++
                }
                else abort = true
                break
              case "O":
                if (testBoard[cx + x + 1 + px][cy + y + 1 + py] === "O")
                  count++
                else abort = true
                break
              case "x":
                if (["X", "."].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
              case "o":
                if (["O", "."].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
              case "?":
                count++
                break
              case ".":
                if (testBoard[cx + x + 1 + px][cy + y + 1 + py] === ".")
                  count++
                else abort = true
                break
              case "W":
                if (["W", "#"].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
              case "B":
                if (["W", "#", "X"].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
              case "b":
                if (["W", "#", "O"].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
              case "A":
                if (["W", "#", "X", "O"].includes(testBoard[cx + x + 1 + px][cy + y + 1 + py]))
                  count++
                else abort = true
                break
            }
            if (count === patternSize * patternSize) {
              ns.printf("Pattern: " + id)
              ns.printf("%s", pattern.join("\n"))
              ns.printf("-----------------")
              return true
            }
          }
        }
      }
    }
  }
  return false
}



/** @param {NS} ns */
function getAll3by3Patterns(pattern) {
  const rotations = [
    pattern,
    rotate90Degrees3(pattern),
    rotate90Degrees3(rotate90Degrees3(pattern)),
    rotate90Degrees3(rotate90Degrees3(rotate90Degrees3(pattern))),
  ]
  const mirrored = [...rotations, ...rotations.map(verticalMirror3)]
  return [...mirrored, ...mirrored.map(horizontalMirror3)]
}
/** @param {NS} ns */
function getAll4by4Patterns(pattern) {
  const rotations = [
    pattern,
    rotate90Degrees4(pattern),
    rotate90Degrees4(rotate90Degrees4(pattern)),
    rotate90Degrees4(rotate90Degrees4(rotate90Degrees4(pattern))),
  ]
  const mirrored = [...rotations, ...rotations.map(verticalMirror4)]
  return [...mirrored, ...mirrored.map(horizontalMirror4)]
}
/** @param {NS} ns */
function getAll5by5Patterns(pattern) {
  const rotations = [
    pattern,
    rotate90Degrees5(pattern),
    rotate90Degrees5(rotate90Degrees5(pattern)),
    rotate90Degrees5(rotate90Degrees5(rotate90Degrees5(pattern))),
  ]
  const mirrored = [...rotations, ...rotations.map(verticalMirror5)]
  return [...mirrored, ...mirrored.map(horizontalMirror5)]
}
/** @param {NS} ns */
function getAll6by6Patterns(pattern) {
  const rotations = [
    pattern,
    rotate90Degrees6(pattern),
    rotate90Degrees6(rotate90Degrees6(pattern)),
    rotate90Degrees6(rotate90Degrees6(rotate90Degrees6(pattern))),
  ]
  const mirrored = [...rotations, ...rotations.map(verticalMirror6)]
  return [...mirrored, ...mirrored.map(horizontalMirror6)]
}
/** @param {NS} ns */
function getAll7by7Patterns(pattern) {
  const rotations = [
    pattern,
    rotate90Degrees7(pattern),
    rotate90Degrees7(rotate90Degrees7(pattern)),
    rotate90Degrees7(rotate90Degrees7(rotate90Degrees7(pattern))),
  ]
  const mirrored = [...rotations, ...rotations.map(verticalMirror7)]
  return [...mirrored, ...mirrored.map(horizontalMirror7)]
}
/** @param {NS} ns */
function rotate90Degrees3(pattern) {
  return [
    [`${pattern[2][0][0]}${pattern[1][0][0]}${pattern[0][0][0]}`],
    [`${pattern[2][0][1]}${pattern[1][0][1]}${pattern[0][0][1]}`],
    [`${pattern[2][0][2]}${pattern[1][0][2]}${pattern[0][0][2]}`],
  ]
}
/** @param {NS} ns */
function rotate90Degrees4(pattern) {
  return [
    [`${pattern[3][0][0]}${pattern[2][0][0]}${pattern[1][0][0]}${pattern[0][0][0]}`],
    [`${pattern[3][0][1]}${pattern[2][0][1]}${pattern[1][0][1]}${pattern[0][0][1]}`],
    [`${pattern[3][0][2]}${pattern[2][0][2]}${pattern[1][0][2]}${pattern[0][0][2]}`],
    [`${pattern[3][0][3]}${pattern[2][0][3]}${pattern[1][0][3]}${pattern[0][0][3]}`],
  ]
}
/** @param {NS} ns */
function rotate90Degrees5(pattern) {
  return [
    [`${pattern[4][0][0]}${pattern[3][0][0]}${pattern[2][0][0]}${pattern[1][0][0]}${pattern[0][0][0]}`],
    [`${pattern[4][0][1]}${pattern[3][0][1]}${pattern[2][0][1]}${pattern[1][0][1]}${pattern[0][0][1]}`],
    [`${pattern[4][0][2]}${pattern[3][0][2]}${pattern[2][0][2]}${pattern[1][0][2]}${pattern[0][0][2]}`],
    [`${pattern[4][0][3]}${pattern[3][0][3]}${pattern[2][0][3]}${pattern[1][0][3]}${pattern[0][0][3]}`],
    [`${pattern[4][0][4]}${pattern[3][0][4]}${pattern[2][0][4]}${pattern[1][0][4]}${pattern[0][0][4]}`],
  ]
}
/** @param {NS} ns */
function rotate90Degrees6(pattern) {
  return [
    [`${pattern[5][0][0]}${pattern[4][0][0]}${pattern[3][0][0]}${pattern[2][0][0]}${pattern[1][0][0]}${pattern[0][0][0]}`],
    [`${pattern[5][0][1]}${pattern[4][0][1]}${pattern[3][0][1]}${pattern[2][0][1]}${pattern[1][0][1]}${pattern[0][0][1]}`],
    [`${pattern[5][0][2]}${pattern[4][0][2]}${pattern[3][0][2]}${pattern[2][0][2]}${pattern[1][0][2]}${pattern[0][0][2]}`],
    [`${pattern[5][0][3]}${pattern[4][0][3]}${pattern[3][0][3]}${pattern[2][0][3]}${pattern[1][0][3]}${pattern[0][0][3]}`],
    [`${pattern[5][0][4]}${pattern[4][0][4]}${pattern[3][0][4]}${pattern[2][0][4]}${pattern[1][0][4]}${pattern[0][0][4]}`],
    [`${pattern[5][0][5]}${pattern[4][0][5]}${pattern[3][0][5]}${pattern[2][0][5]}${pattern[1][0][5]}${pattern[0][0][5]}`],
  ]
}
/** @param {NS} ns */
function rotate90Degrees7(pattern) {
  return [
    [`${pattern[6][0][0]}${pattern[5][0][0]}${pattern[4][0][0]}${pattern[3][0][0]}${pattern[2][0][0]}${pattern[1][0][0]}${pattern[0][0][0]}`],
    [`${pattern[6][0][1]}${pattern[5][0][1]}${pattern[4][0][1]}${pattern[3][0][1]}${pattern[2][0][1]}${pattern[1][0][1]}${pattern[0][0][1]}`],
    [`${pattern[6][0][2]}${pattern[5][0][2]}${pattern[4][0][2]}${pattern[3][0][2]}${pattern[2][0][2]}${pattern[1][0][2]}${pattern[0][0][2]}`],
    [`${pattern[6][0][3]}${pattern[5][0][3]}${pattern[4][0][3]}${pattern[3][0][3]}${pattern[2][0][3]}${pattern[1][0][3]}${pattern[0][0][3]}`],
    [`${pattern[6][0][4]}${pattern[5][0][4]}${pattern[4][0][4]}${pattern[3][0][4]}${pattern[2][0][4]}${pattern[1][0][4]}${pattern[0][0][4]}`],
    [`${pattern[6][0][5]}${pattern[5][0][5]}${pattern[4][0][5]}${pattern[3][0][5]}${pattern[2][0][5]}${pattern[1][0][5]}${pattern[0][0][5]}`],
    [`${pattern[6][0][6]}${pattern[5][0][6]}${pattern[4][0][6]}${pattern[3][0][6]}${pattern[2][0][6]}${pattern[1][0][6]}${pattern[0][0][6]}`],
  ]
}
/** @param {NS} ns */
function verticalMirror3(pattern) {
  return [pattern[2], pattern[1], pattern[0]]
}
/** @param {NS} ns */
function verticalMirror4(pattern) {
  return [pattern[3], pattern[2], pattern[1], pattern[0]]
}
/** @param {NS} ns */
function verticalMirror5(pattern) {
  return [pattern[4], pattern[3], pattern[2], pattern[1], pattern[0]];
}
/** @param {NS} ns */
function verticalMirror6(pattern) {
  return [pattern[5], pattern[4], pattern[3], pattern[2], pattern[1], pattern[0]];
}
/** @param {NS} ns */
function verticalMirror7(pattern) {
  return [pattern[6], pattern[5], pattern[4], pattern[3], pattern[2], pattern[1], pattern[0]];
}

/** @param {NS} ns */
function horizontalMirror3(pattern) {
  return [
    [`${pattern[0][0][2]}${pattern[0][0][1]}${pattern[0][0][0]}`],
    [`${pattern[1][0][2]}${pattern[1][0][1]}${pattern[1][0][0]}`],
    [`${pattern[2][0][2]}${pattern[2][0][1]}${pattern[2][0][0]}`],
  ]
}
/** @param {NS} ns */
function horizontalMirror4(pattern) {
  return [
    [`${pattern[0][0][3]}${pattern[0][0][2]}${pattern[0][0][1]}${pattern[0][0][0]}`],
    [`${pattern[1][0][3]}${pattern[1][0][2]}${pattern[1][0][1]}${pattern[1][0][0]}`],
    [`${pattern[2][0][3]}${pattern[2][0][2]}${pattern[2][0][1]}${pattern[2][0][0]}`],
    [`${pattern[3][0][3]}${pattern[3][0][2]}${pattern[3][0][1]}${pattern[3][0][0]}`],
  ]
}
/** @param {NS} ns */
function horizontalMirror5(pattern) {
  return [
    [`${pattern[0][0][4]}${pattern[0][0][3]}${pattern[0][0][2]}${pattern[0][0][1]}${pattern[0][0][0]}`],
    [`${pattern[1][0][4]}${pattern[1][0][3]}${pattern[1][0][2]}${pattern[1][0][1]}${pattern[1][0][0]}`],
    [`${pattern[2][0][4]}${pattern[2][0][3]}${pattern[2][0][2]}${pattern[2][0][1]}${pattern[2][0][0]}`],
    [`${pattern[3][0][4]}${pattern[3][0][3]}${pattern[3][0][2]}${pattern[3][0][1]}${pattern[3][0][0]}`],
    [`${pattern[4][0][4]}${pattern[4][0][3]}${pattern[4][0][2]}${pattern[4][0][1]}${pattern[4][0][0]}`],
  ]
}
/** @param {NS} ns */
function horizontalMirror6(pattern) {
  return [
    [`${pattern[0][0][5]}${pattern[0][0][4]}${pattern[0][0][3]}${pattern[0][0][2]}${pattern[0][0][1]}${pattern[0][0][0]}`],
    [`${pattern[1][0][5]}${pattern[1][0][4]}${pattern[1][0][3]}${pattern[1][0][2]}${pattern[1][0][1]}${pattern[1][0][0]}`],
    [`${pattern[2][0][5]}${pattern[2][0][4]}${pattern[2][0][3]}${pattern[2][0][2]}${pattern[2][0][1]}${pattern[2][0][0]}`],
    [`${pattern[3][0][5]}${pattern[3][0][4]}${pattern[3][0][3]}${pattern[3][0][2]}${pattern[3][0][1]}${pattern[3][0][0]}`],
    [`${pattern[4][0][5]}${pattern[4][0][4]}${pattern[4][0][3]}${pattern[4][0][2]}${pattern[4][0][1]}${pattern[4][0][0]}`],
    [`${pattern[5][0][5]}${pattern[5][0][4]}${pattern[5][0][3]}${pattern[5][0][2]}${pattern[5][0][1]}${pattern[5][0][0]}`],
  ]
}
/** @param {NS} ns */
function horizontalMirror7(pattern) {
  return [
    [`${pattern[0][0][6]}${pattern[0][0][5]}${pattern[0][0][4]}${pattern[0][0][3]}${pattern[0][0][2]}${pattern[0][0][1]}${pattern[0][0][0]}`],
    [`${pattern[1][0][6]}${pattern[1][0][5]}${pattern[1][0][4]}${pattern[1][0][3]}${pattern[1][0][2]}${pattern[1][0][1]}${pattern[1][0][0]}`],
    [`${pattern[2][0][6]}${pattern[2][0][5]}${pattern[2][0][4]}${pattern[2][0][3]}${pattern[2][0][2]}${pattern[2][0][1]}${pattern[2][0][0]}`],
    [`${pattern[3][0][6]}${pattern[3][0][5]}${pattern[3][0][4]}${pattern[3][0][3]}${pattern[3][0][2]}${pattern[3][0][1]}${pattern[3][0][0]}`],
    [`${pattern[4][0][6]}${pattern[4][0][5]}${pattern[4][0][4]}${pattern[4][0][3]}${pattern[4][0][2]}${pattern[4][0][1]}${pattern[4][0][0]}`],
    [`${pattern[4][0][6]}${pattern[5][0][5]}${pattern[5][0][4]}${pattern[5][0][3]}${pattern[5][0][2]}${pattern[5][0][1]}${pattern[5][0][0]}`],
    [`${pattern[4][0][6]}${pattern[6][0][5]}${pattern[6][0][4]}${pattern[6][0][3]}${pattern[6][0][2]}${pattern[6][0][1]}${pattern[6][0][0]}`],
  ]
}
/** @param {NS} ns */
function getRandomLibAttack(ns, board, validMoves, validLibMoves, contested) {
  const moveOptions = []
  const size = board[0].length
  let highValue = 1
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      //The hanging lib
      //if (getSurroundEnemyLibs(x, y, board, validLibMoves) === 1 && getSurroundSpace(x, y, board) > 1) continue
      if (contested[x][y] === "X" || !validMoves[x][y] || validLibMoves[x][y] !== -1) continue

      let count = 0
      let chains = 0

      //We are only checking up, down, left and right
      if (x > 0 && board[x - 1][y] === "O" && validLibMoves[x - 1][y] === 1) {
        count++
        chains += getChainValue(x - 1, y, board, contested, "O")
      }
      if (x < size - 1 && board[x + 1][y] === "O" && validLibMoves[x + 1][y] === 1) {
        count++
        chains += getChainValue(x + 1, y, board, contested, "O")
      }
      if (y > 0 && board[x][y - 1] === "O" && validLibMoves[x][y - 1] === 1) {
        count++
        chains += getChainValue(x, y - 1, board, contested, "O")
      }
      if (y < size - 1 && board[x][y + 1] === "O" && validLibMoves[x][y + 1] === 1) {
        count++
        chains += getChainValue(x, y + 1, board, contested, "O")
      }
      if (count === 0) continue
      const enemyLibs = getSurroundEnemyLibs(x, y, board, validLibMoves)
      const space = enemyLibs <= 2 ? 1 : enemyLibs - 1
      const mySurroundLibs = getSurroundLibs(x, y, board, validLibMoves)
      const myLibs = mySurroundLibs <= 2 ? 1 : mySurroundLibs - 1
      const result = count * space * chains * myLibs
      if (result > highValue) {
        moveOptions.length = 0
        moveOptions.push([x, y])
        highValue = result
      }
      else if (result === highValue) moveOptions.push([x, y]);
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Lib Attack")
  return moveOptions[randomIndex] ?? []
}
/** @param {NS} ns */
function getRandomLibDefend(ns, board, validMoves, validLibMoves, contested) {
  const moveOptions = []
  const size = board[0].length
  let highValue = 1
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const surround = getSurroundLibs(x, y, board, validLibMoves, "X")
      if (surround < 2) continue //Abort.  Let it go, let it go...

      if (validLibMoves[x][y] === -1 && validMoves[x][y] === true) {
        let count = 0
        //We are only checking up, down, left and right
        if (x > 0 && validLibMoves[x - 1][y] === 1 && board[x - 1][y] === "X") count += getChainValue(x - 1, y, board, contested, "X")
        if (x < size - 1 && validLibMoves[x + 1][y] === 1 && board[x + 1][y] === "X") count += getChainValue(x + 1, y, board, contested, "X")
        if (y > 0 && validLibMoves[x][y - 1] === 1 && board[x][y - 1] === "X") count += getChainValue(x, y - 1, board, contested, "X")
        if (y < size - 1 && validLibMoves[x][y + 1] === 1 && board[x][y + 1] === "X") count += getChainValue(x, y + 1, board, contested, "X")
        if (count === 0) continue
        //Just HOW effective will this move be?  Counter attack if we can.
        let libCountMult = 1
        if (x > 0 && validLibMoves[x - 1][y] === 1 && board[x - 1][y] === "O") libCountMult += validLibMoves[x - 1][y] === 2 ? 1 : 0
        if (x < size - 1 && validLibMoves[x + 1][y] === 1 && board[x + 1][y] === "O") libCountMult += validLibMoves[x + 1][y] === 2 ? 1 : 0
        if (y > 0 && validLibMoves[x][y - 1] === 1 && board[x][y - 1] === "O") libCountMult += validLibMoves[x][y - 1] === 2 ? 1 : 0
        if (y < size - 1 && validLibMoves[x][y + 1] === 1 && board[x][y + 1] === "O") libCountMult += validLibMoves[x][y + 1]
        count *= libCountMult * surround

        if (count > highValue) {
          moveOptions.length = 0
          moveOptions.push([x, y])
          highValue = count
        }
        else if (count === highValue) moveOptions.push([x, y])
      }
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Lib Defend")
  return moveOptions[randomIndex] ?? []
}
/** @param {NS} ns */
function getRandomExpand(ns, board, validMoves, validLibMoves, contested) {
  const moveOptions = []
  const size = board[0].length;
  let highValue = 0
  // Look through all the points on the board
  const moves = getAllValidMoves(board, validMoves)
  for (const [x, y] of moves) {
    const surroundLibs = getSurroundLibs(x, y, board, validLibMoves, "X")
    if (contested[x][y] !== "?" || surroundLibs <= 2) continue

    const surroundChains = getChainSupport(x, y, board, contested)
    const surroundSpace = getSurroundSpaceFull(x, y, board) + 1
    const enemySurroundChains = getChainAttack(x, y, board, contested) + 1
    const myEyes = getEyeValue(x, y, board, contested, "X") + 1
    const enemies = getSurroundEnemiesFull(x, y, board, contested) + 1
    const enemyLibs = getSurroundEnemyLibs(x, y, board, validLibMoves) + 1
    const freeSpace = getFreeSpace(x, y, board, contested, "X") + 1
    const rank = surroundLibs * surroundChains * myEyes * enemyLibs * enemies * enemySurroundChains * surroundSpace * freeSpace

    if (rank > highValue) {
      moveOptions.length = 0
      moveOptions.push([x, y])
      highValue = rank
    }
    else if (rank === highValue) moveOptions.push([x, y]);
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Expansion")
  return moveOptions[randomIndex] ?? []
}
/** @param {NS} ns */
function getRandomBolster(ns, board, validMoves, validLibMoves, contested, chains, libRequired, savedNodesMin) {
  const moveOptions = [];
  const size = board[0].length;
  let highValue = 1
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!validMoves[x][y] === true || contested[x][y] !== "?") continue
      const surround = getSurroundLibs(x, y, board, validLibMoves, "X")
      const surroundChains = getChainSupport(x, y, board, contested)
      if (surround <= 2) continue
      let right = 0
      let left = 0
      let up = 0
      let down = 0

      //We are only checking up, down, left and right
      //We are checking for linking chains of friendlies, filtering out those already checked
      let checkedChains = []
      if (x + 1 < size - 1 && board[x + 1][y] === "X" && validLibMoves[x + 1][y] === libRequired) {
        right = getChainValue(x + 1, y, board, contested, "X")
        checkedChains.push(chains[x + 1][y])
      }
      if (x - 1 >= 0 && board[x - 1][y] === "X" && !checkedChains.includes(chains[x - 1][y]) && validLibMoves[x - 1][y] === libRequired) {
        left = getChainValue(x - 1, y, board, contested, "X")
        checkedChains.push(chains[x - 1][y])
      }
      if (y + 1 < size - 1 && board[x][y + 1] === "X" && !checkedChains.includes(chains[x][y + 1]) && validLibMoves[x][y + 1] === libRequired) {
        up = getChainValue(x, y + 1, board, contested, "X")
        checkedChains.push(chains[x][y + 1])
      }
      if (y - 1 >= 0 && board[x][y - 1] === "X" && !checkedChains.includes(chains[x][y - 1]) && validLibMoves[x][y - 1] === libRequired)
        down = getChainValue(x, y - 1, board, contested, "X")

      //const surround2 = getSurroundSpaceFull(x, y, board)
      let count = 0
      let total = 1
      if (right >= savedNodesMin) {
        count++
        total *= right
      }
      if (left >= savedNodesMin) {
        count++
        total *= left
      }
      if (up >= savedNodesMin) {
        count++
        total *= up
      }
      if (down >= savedNodesMin) {
        count++
        total *= down
      }
      if (count <= 0) continue
      const rank = total * count * surround * surroundChains
      if (rank > highValue) {
        moveOptions.length = 0
        moveOptions.push([x, y])
        highValue = rank
      }
      else if (rank === highValue) moveOptions.push([x, y]);
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Bolster - Libs: " + libRequired + "  Nodes: " + savedNodesMin)
  return moveOptions[randomIndex] ?? []
}

/** @param {NS} ns */
function getRandomAntiBolster(ns, board, validMoves, validLibMoves, contested, chains, libRequired, savedNodesMin) {
  const moveOptions = [];
  const size = board[0].length;
  let highValue = 0
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!validMoves[x][y] || contested[x][y] !== "?") continue
      if (getSurroundLibs(x, y, board, validLibMoves, "X") < 2) continue
      let right = 0
      let left = 0
      let up = 0
      let down = 0
      let count = 0
      let total = 1
      //We are only checking up, down, left and right
      //We are checking for linking chains of friendlies, filtering out those already checked
      let checkedChains = []
      if (x + 1 < size - 1 && board[x + 1][y] === "O" && validLibMoves[x + 1][y] <= libRequired) {
        right = getChainValue(x + 1, y, board, contested, "O")
        checkedChains.push(chains[x + 1][y])
        count++
        total *= right >= savedNodesMin ? right : 1
      }
      if (x - 1 >= 0 && board[x - 1][y] === "O" && !checkedChains.includes(chains[x - 1][y]) && validLibMoves[x - 1][y] <= libRequired) {
        left = getChainValue(x - 1, y, board, contested, "O")
        checkedChains.push(chains[x - 1][y])
        count++
        total *= left >= savedNodesMin ? left : 1
      }
      if (y + 1 < size - 1 && board[x][y + 1] === "O" && !checkedChains.includes(chains[x][y + 1]) && validLibMoves[x][y + 1] <= libRequired) {
        up = getChainValue(x, y + 1, board, contested, "O")
        checkedChains.push(chains[x][y + 1])
        count++
        total *= up >= savedNodesMin ? up : 1
      }
      if (y - 1 >= 0 && board[x][y - 1] === "O" && !checkedChains.includes(chains[x][y - 1]) && validLibMoves[x][y - 1] <= libRequired) {
        down = getChainValue(x, y - 1, board, contested, "O")
        count++
        total *= down >= savedNodesMin ? down : 1
      }
      const surround = getSurroundLibs(x, y, board, validLibMoves, "X")
      //const surround2 = getSurroundSpaceFull(x, y, board)


      if (count <= 1 || count === 4 || surround < 2) continue
      const rank = total * count * surround// * surround2
      if (rank > highValue) {
        moveOptions.length = 0
        moveOptions.push([x, y])
        highValue = rank
      }
      else if (rank === highValue) moveOptions.push([x, y]);
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Anti Bolster")
  return moveOptions[randomIndex] ?? []
}

/** @param {NS} ns */
function getChainValue(checkx, checky, board, contested, player) {
  const size = board[0].length
  const otherPlayer = player === "X" ? "O" : "X"
  const explored = new Set()
  if (contested[checkx][checky] === "?") return 0
  if (checkx + 1 < size - 1) explored.add(JSON.stringify([checkx + 1, checky]))
  if (checkx - 1 >= 0) explored.add(JSON.stringify([checkx - 1, checky]))
  if (checky - 1 >= 0) explored.add(JSON.stringify([checkx, checky - 1]))
  if (checky + 1 < size - 1) explored.add(JSON.stringify([checkx, checky + 1]))
  let count = 1
  for (const explore of explored) {
    const [x, y] = JSON.parse(explore)
    if (contested[x][y] === "?" || contested[x][y] === "#" || board[x][y] === otherPlayer) continue
    count++
    if (x + 1 < size - 1) explored.add(JSON.stringify([x + 1, y]))
    if (x - 1 >= 0) explored.add(JSON.stringify([x - 1, y]))
    if (y - 1 >= 0) explored.add(JSON.stringify([x, y - 1]))
    if (y + 1 < size - 1) explored.add(JSON.stringify([x, y + 1]))
  }
  return count
}

/** @param {NS} ns */
function getEyeValue(checkx, checky, board, contested, player) {
  const size = board[0].length
  const otherPlayer = player === "X" ? "O" : "X"
  const explored = new Set()
  if (checkx + 1 < size - 1) explored.add(JSON.stringify([checkx + 1, checky]))
  if (checkx - 1 >= 0) explored.add(JSON.stringify([checkx - 1, checky]))
  if (checky - 1 >= 0) explored.add(JSON.stringify([checkx, checky - 1]))
  if (checky + 1 < size - 1) explored.add(JSON.stringify([checkx, checky + 1]))
  let count = 0
  for (const explore of explored) {
    const [x, y] = JSON.parse(explore)
    if (contested[x][y] === "?" || contested[x][y] === "#" || board[x][y] === otherPlayer) continue
    if (contested[x][y] === player) count++
    if (x + 1 < size - 1) explored.add(JSON.stringify([x + 1, y]))
    if (x - 1 >= 0) explored.add(JSON.stringify([x - 1, y]))
    if (y - 1 >= 0) explored.add(JSON.stringify([x, y - 1]))
    if (y + 1 < size - 1) explored.add(JSON.stringify([x, y + 1]))
  }
  return count
}

/** @param {NS} ns */
function getFreeSpace(checkx, checky, board, contested, player) {
  const size = board[0].length
  const otherPlayer = player === "X" ? "O" : "X"
  if (contested[checkx][checky] !== "?") return 1
  const explored = new Set()
  if (checkx + 1 < size - 1) explored.add(JSON.stringify([checkx + 1, checky]))
  if (checkx - 1 >= 0) explored.add(JSON.stringify([checkx - 1, checky]))
  if (checky - 1 >= 0) explored.add(JSON.stringify([checkx, checky - 1]))
  if (checky + 1 < size - 1) explored.add(JSON.stringify([checkx, checky + 1]))
  let count = 0
  for (const explore of explored) {
    const [x, y] = JSON.parse(explore)
    if (contested[x][y] === "#" || board[x][y] === otherPlayer) continue
    if (contested[x][y] === "?") count++
    if (x + 1 < size - 1) explored.add(JSON.stringify([x + 1, y]))
    if (x - 1 >= 0) explored.add(JSON.stringify([x - 1, y]))
    if (y - 1 >= 0) explored.add(JSON.stringify([x, y - 1]))
    if (y + 1 < size - 1) explored.add(JSON.stringify([x, y + 1]))
  }
  return count
}
/** @param {NS} ns */
function getEyeValueFull(checkx, checky, board, contested, player) {
  const size = board[0].length
  const otherPlayer = player === "X" ? "O" : "X"
  const explored = new Set()
  if (checkx + 1 < size - 1) explored.add(JSON.stringify([checkx + 1, checky]))
  if (checkx - 1 >= 0) explored.add(JSON.stringify([checkx - 1, checky]))
  if (checky - 1 >= 0) explored.add(JSON.stringify([checkx, checky - 1]))
  if (checky + 1 < size - 1) explored.add(JSON.stringify([checkx, checky + 1]))
  if (checkx + 1 < size - 1 && checky + 1 < size - 1) explored.add(JSON.stringify([checkx + 1, checky + 1]))
  if (checkx - 1 >= 0 && checky + 1 < size - 1) explored.add(JSON.stringify([checkx - 1, checky + 1]))
  if (checkx + 1 < size - 1 && checky - 1 > 0) explored.add(JSON.stringify([checkx + 1, checky - 1]))
  if (checkx - 1 >= 0 && checky - 1 >= 0) explored.add(JSON.stringify([checkx - 1, checky - 1]))
  let count = 0
  for (const explore of explored) {
    const [x, y] = JSON.parse(explore)
    if (contested[x][y] === "?" || contested[x][y] === "#" || board[x][y] === otherPlayer) continue
    if (contested[x][y] === player) count++
    if (x + 1 < size - 1) explored.add(JSON.stringify([x + 1, y]))
    if (x - 1 >= 0) explored.add(JSON.stringify([x - 1, y]))
    if (y - 1 >= 0) explored.add(JSON.stringify([x, y - 1]))
    if (y + 1 < size - 1) explored.add(JSON.stringify([x, y + 1]))
  }
  return count
}
/** @param {NS} ns */
function getChainAttack(x, y, board, contested) {
  const size = board[0].length
  let count = 0
  if (x > 0 && board[x - 1][y] === "O") count += getChainValue(x - 1, y, board, contested, "O")
  if (x < size - 1 && board[x + 1][y] === "O") count += getChainValue(x + 1, y, board, contested, "O")
  if (y > 0 && board[x][y - 1] === "O") count += getChainValue(x, y - 1, board, contested, "O")
  if (y < size - 1 && board[x][y + 1] === "O") count += getChainValue(x, y + 1, board, contested, "O")

  return count
}
/** @param {NS} ns */
function getChainSupport(x, y, board, contested) {
  const size = board[0].length
  let count = 0
  if (x > 0 && board[x - 1][y] === "X") count += getChainValue(x - 1, y, board, contested, "X")
  if (x < size - 1 && board[x + 1][y] === "X") count += getChainValue(x + 1, y, board, contested, "X")
  if (y > 0 && board[x][y - 1] === "X") count += getChainValue(x, y - 1, board, contested, "X")
  if (y < size - 1 && board[x][y + 1] === "X") count += getChainValue(x, y + 1, board, contested, "X")

  return count
}
/** @param {NS} ns */
function getSurroundSpace(x, y, board) {
  const size = board[0].length
  let surround = 0

  if (x - 1 > 0 && board[x - 1][y] === ".") surround++
  if (x + 1 < size - 1 && board[x + 1][y] === ".") surround++
  if (y - 1 > 0 && board[x][y - 1] === ".") surround++
  if (y + 1 < size - 1 && board[x][y + 1] === ".") surround++
  return surround
}

/** @param {NS} ns */
function getSurroundSpaceFull(startx, starty, board, depth = 1) {
  const size = board[0].length
  let surround = 0
  for (let x = startx - depth; x <= startx + depth; x++)
    for (let y = starty - depth; y <= starty + depth; y++)
      if (x > 0 && x < size - 1 && y > 0 && y < size - 1 && board[x][y] === ".") surround++
  return surround
}

/** @param {NS} ns */
function getSurroundLibs(x, y, board, validLibMoves, player) {
  const size = board[0].length
  let surround = 0
  if (x > 0 && (board[x - 1][y] === "." || board[x - 1][y] === player)) surround += board[x - 1][y] === "." ? 1 : validLibMoves[x - 1][y] - 1
  if (x < size - 1 && (board[x + 1][y] === "." || board[x + 1][y] === player)) surround += board[x + 1][y] === "." ? 1 : validLibMoves[x + 1][y] - 1
  if (y > 0 && (board[x][y - 1] === "." || board[x][y - 1] === player)) surround += board[x][y - 1] === "." ? 1 : validLibMoves[x][y - 1] - 1
  if (y < size - 1 && (board[x][y + 1] === "." || board[x][y + 1] === player)) surround += board[x][y + 1] === "." ? 1 : validLibMoves[x][y + 1] - 1
  return surround
}

/** @param {NS} ns */
function getSurroundEmptyEnemy(x, y, board, player) {
  const size = board[0].length
  let surround = 0
  const otherPlayer = player === "X" ? "O" : "X"
  if (x > 0 && (board[x - 1][y] === "." || board[x - 1][y] === otherPlayer)) surround += board[x - 1][y] === otherPlayer ? 3 : board[x - 1][y] === player ? 0 : 1
  if (x < size - 1 && (board[x + 1][y] === "." || board[x + 1][y] === otherPlayer)) surround += board[x + 1][y] === otherPlayer ? 3 : board[x + 1][y] === player ? 0 : 1
  if (y > 0 && (board[x][y - 1] === "." || board[x][y - 1] === otherPlayer)) surround += board[x][y - 1] === otherPlayer ? 3 : board[x][y - 1] === player ? 0 : 1
  if (y < size - 1 && (board[x][y + 1] === "." || board[x][y + 1] === otherPlayer)) surround += board[x][y + 1] === otherPlayer ? 3 : board[x][y + 1] === player ? 0 : 1
  return surround
}

/** @param {NS} ns */
function getSurroundEnemyLibs(x, y, board, validLibMoves) {
  const size = board[0].length
  let surround = 0
  if (x > 0 && (board[x - 1][y] === "." || board[x - 1][y] === "O")) surround += board[x - 1][y] === "." ? 1 : validLibMoves[x - 1][y] - 1
  if (x < size - 1 && (board[x + 1][y] === "." || board[x + 1][y] === "O")) surround += board[x + 1][y] === "." ? 1 : validLibMoves[x + 1][y] - 1
  if (y > 0 && (board[x][y - 1] === "." || board[x][y - 1] === "O")) surround += board[x][y - 1] === "." ? 1 : validLibMoves[x][y - 1] - 1
  if (y < size - 1 && (board[x][y + 1] === "." || board[x][y + 1] === "O")) surround += board[x][y + 1] === "." ? 1 : validLibMoves[x][y + 1] - 1
  return surround
}

/** @param {NS} ns */
function getSurroundEnemies(x, y, board, contested) {
  const size = board[0].length
  let surround = 0
  if (x > 0 && board[x - 1][y] === "O") surround += getChainValue(x - 1, y, board, contested, "O")
  if (x < size - 1 && board[x + 1][y] === "O") surround += getChainValue(x + 1, y, board, contested, "O")
  if (y > 0 && board[x][y - 1] === "O") surround += getChainValue(x, y - 1, board, contested, "O")
  if (y < size - 1 && board[x][y + 1] === "O") surround += getChainValue(x, y + 1, board, contested, "O")
  return surround
}

/** @param {NS} ns */
function getSurroundEnemiesFull(x, y, board, contested) {
  const size = board[0].length
  let surround = 0
  if (x > 0 && board[x - 1][y] === "O") surround += getChainValue(x - 1, y, board, contested, "O")
  if (x < size - 1 && board[x + 1][y] === "O") surround += getChainValue(x + 1, y, board, contested, "O")
  if (y > 0 && board[x][y - 1] === "O") surround += getChainValue(x, y - 1, board, contested, "O")
  if (y < size - 1 && board[x][y + 1] === "O") surround += getChainValue(x, y + 1, board, contested, "O")

  if (x > 0 && y > 0 && board[x - 1][y - 1] === "O") surround += getChainValue(x - 1, y - 1, board, contested, "O")
  if (x < size - 1 && y > 0 && board[x + 1][y - 1] === "O") surround += getChainValue(x + 1, y - 1, board, contested, "O")
  if (y < size - 1 && x > 0 && board[x - 1][y + 1] === "O") surround += getChainValue(x - 1, y - 1, board, contested, "O")
  if (y < size - 1 && x < size - 1 && board[x + 1][y + 1] === "O") surround += getChainValue(x + 1, y + 1, board, contested, "O")

  return surround
}

/** @param {NS} ns */
function getRandomStrat(ns, board, validMoves, validLibMoves, contested) {
  const moveOptions = []
  const moveOptions2 = []
  const size = board[0].length

  // Look through all the points on the board
  let bestRank = 0
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (contested[x][y] !== "?") continue
      if (!validMoves[x][y] || contested[x][y] === "X") continue
      let isSupport = ((x > 0 && board[x - 1][y] === "X" && validLibMoves[x - 1][y] >= 1) || (x < size - 1 && board[x + 1][y] === "X" && validLibMoves[x + 1][y] >= 1) || (y > 0 && board[x][y - 1] === "X" && validLibMoves[x][y - 1] >= 1) || (y < size - 1 && board[x][y + 1] === "X" && validLibMoves[x][y + 1] >= 1)) ? true : false

      if (validMoves[x][y] && isSupport) {
        const surround = getSurroundSpace(x, y, board)
        if (surround > bestRank) {
          moveOptions.length = 0
          bestRank = surround
          moveOptions.push([x, y]);
        }
        else if (surround === bestRank) {
          moveOptions.push([x, y])
        }
      }
      else if (validMoves[x][y]) {
        moveOptions2.push([x, y])
      }
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length);
  const randomIndex2 = Math.floor(Math.random() * moveOptions2.length);
  moveOptions[randomIndex] ? ns.print("Random Safe") : ns.print("Random Unsafe")
  return moveOptions[randomIndex] ? moveOptions[randomIndex] : moveOptions2[randomIndex2] ? moveOptions2[randomIndex2] : [];
}

/** @param {NS} ns */
function getRandomAttack(ns, board, validMoves, validLibMoves, contested, libs) {
  const moveOptions = [];
  const size = board[0].length;
  let highestValue = 0
  // Look through all the points on the board
  const moves = getAllValidMoves(board, validMoves)
  for (const [x, y] of moves) {
    if (validLibMoves[x][y] !== -1) continue
    let isAttack = ((x > 0 && board[x - 1][y] === "O" && validLibMoves[x - 1][y] === libs) || (x < size - 1 && board[x + 1][y] === "O" && validLibMoves[x + 1][y] === libs) || (y > 0 && board[x][y - 1] === "O" && validLibMoves[x][y - 1] === libs) || (y < size - 1 && board[x][y + 1] === "O" && validLibMoves[x][y + 1] === libs)) ? true : false
    const surround = getSurroundLibs(x, y, board, validLibMoves, "X")
    const freeSpace = getFreeSpace(x, y, board, contested, "X")
    if (!validMoves[x][y] || !isAttack || surround <= 2) continue
    const enemyLibs = getSurroundEnemyLibs(x, y, board, validLibMoves)
    const atk = getChainAttack(x, y, board, contested) / enemyLibs * freeSpace// * surround
    if (atk > highestValue) {
      highestValue = atk
      moveOptions.push([x, y]);
    }
    else if (atk === highestValue) {
      highestValue = atk
      moveOptions.push([x, y]);
    }

  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Random Attack: " + libs)
  return moveOptions[randomIndex] ?? [];
}

/** @param {NS} ns */
function growDragon(ns, board, validMoves, contested, requiredEyes) {
  const moveOptions = [];
  const size = board[0].length;
  let highestValue = 1
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!validMoves[x][y] || contested[x][y] !== "?") continue
      const surround = getSurroundEmptyEnemy(x, y, board, "X")
      const myEyes = getEyeValue(x, y, board, contested, "X")
      if (!validMoves[x][y] || myEyes < requiredEyes || surround < 1) continue
      const result = myEyes * surround

      if (result > highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
      else if (result === highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Grow Dragon: " + requiredEyes)
  return moveOptions[randomIndex] ?? [];
}

/** @param {NS} ns */
function attackGrowDragon(ns, board, validMoves, validLibMoves, contested, requiredEyes) {
  const moveOptions = [];
  const size = board[0].length;
  let highestValue = 0
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!validMoves[x][y] || contested[x][y] !== "?") continue
      const surround = getSurroundEnemiesFull(x, y, board, contested)
      if (surround < 1) continue
      const enemyLibs = getSurroundEnemyLibs(x, y, board, validLibMoves)
      const myChains = getChainSupport(x, y, board, contested)
      let chains = 0
      if (x - 1 >= 0 && board[x - 1][y] === "X") chains += getChainAttack(x - 1, y, board, contested)
      if (x + 1 < size - 1 && board[x + 1][y] === "X") chains += getChainAttack(x + 1, y, board, contested)
      if (y + 1 < size - 1 && board[x][y + 1] === "X") chains += getChainAttack(x, y + 1, board, contested)
      if (y - 1 >= 0 && board[x][y - 1] === "X") chains += getChainAttack(x, y - 1, board, contested)

      const myEyes = getEyeValue(x, y, board, contested, "X")
      if (myEyes < requiredEyes) continue // || count === 3) continue
      const freeSpace = getFreeSpace(x, y, board, contested, "X")
      const result = myEyes * surround * enemyLibs * chains * myChains * freeSpace

      if (result > highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
      else if (result === highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Attack/Grow Dragon: " + requiredEyes)
  return moveOptions[randomIndex] ?? [];
}

/** @param {NS} ns */
function attackDragon(ns, board, validMoves, validLibMoves, contested, requiredEyes) {
  const moveOptions = [];
  const size = board[0].length;
  let highestValue = 1
  // Look through all the points on the board
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!validMoves[x][y] || contested[x][y] !== "?" || getFreeSpace(x, y, board, contested, "X") <= 9) continue
      const surround = getSurroundLibs(x, y, board, validLibMoves, "X")
      const theirEyes = getEyeValueFull(x, y, board, contested, "O")
      const myEyes = getEyeValue(x, y, board, contested, "X") + 1
      if (!validMoves[x][y] || theirEyes < requiredEyes || (surround <= 3 || myEyes < 1)) continue
      const myChains = getChainSupport(x, y, board, contested)
      const result = theirEyes * surround * myEyes * myChains

      if (result > highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
      else if (result === highestValue) {
        highestValue = result
        moveOptions.push([x, y]);
      }
    }
  }
  // Choose one of the found moves at random
  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  if (moveOptions[randomIndex]) ns.print("Attack Dragon: " + requiredEyes)
  return moveOptions[randomIndex] ?? [];
}

/** @param {NS} ns */
function getDefPattern(ns, board, testBoard, validLibMoves, validMove, contested, width) {
  const size = board[0].length
  // Look through all the points on the board
  let def;
  switch (width) {
    case 3:
      def = def3
      break
    case 4:
      def = def4
      break
    case 5:
      def = def5
      break
    case 6:
      def = def6
      break
    case 7:
      def = def7
      break
  }
  //def.sort(() => Math.random() - Math.random())
  const moves = getAllValidMoves(board, validMove)
  for (const [x, y] of moves) {
    for (const pattern of def)
      if (isPattern(ns, x, y, pattern, testBoard, validMove, contested, "Def Pattern: " + width))
        return ([x, y])
  }
  return []
}
/** @param {NS} ns */
function getAtkPattern(ns, board, testBoard, validLibMoves, validMove, contested, width) {
  const size = board[0].length
  // Look through all the points on the board
  let atk;
  switch (width) {
    case 3:
      atk = atk3
      break
    case 4:
      atk = atk4
      break
    case 5:
      atk = atk5
      break
    case 6:
      atk = atk6
      break
    case 7:
      atk = atk7
      break
  }
  //atk.sort(() => Math.random() - Math.random())
  const moves = getAllValidMoves(board, validMove)
  for (const [x, y] of moves) {
    for (const pattern of atk)
      if (isPattern(ns, x, y, pattern, testBoard, validMove, contested, "Atk Pattern: " + width))
        return ([x, y])
  }
  return []
}

/** @param {NS} ns */
async function movePiece(ns, coords, board, validMove, validLibMoves, constested) {
  debugger
  const [x, y] = coords
  if (x === undefined) return undefined

  if (CHEATS) {
    try {
      const chance = ns.go.cheat.getCheatSuccessChance()
      //ns.printf("Cheat chance: " + chance)
      if (chance < .7) return ns.go.makeMove(x, y)
      let [rndx, rndy] = getRandomLibDefend(ns, board, validMove, validLibMoves, constested, 1)
      if (rndx === undefined) [rndx, rndy] = getRandomAttack(ns, board, validMove, validLibMoves, constested, 3)
      if (rndx === undefined) [rndx, rndy] = getRandomAttack(ns, board, validMove, validLibMoves, constested, 4)
      if (rndx === undefined) [rndx, rndy] = getRandomAttack(ns, board, validMove, validLibMoves, constested, 2)
      if (rndx === undefined) [rndx, rndy] = getRandomStrat(ns, board, validMove, validLibMoves, constested)


      if (rndx !== undefined && (rndx !== x || rndy !== y)) {
        ns.print("Cheater!")
        return await ns.go.cheat.playTwoMoves(x, y, rndx, rndy)
      }
      else return await ns.go.makeMove(x, y)
    }
    catch {
      return await ns.go.makeMove(x, y)
    }
  }
  else return await ns.go.makeMove(x, y)
}

function countPieces(board, piece) {
  const size = board[0].length
  let count = 0
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      if (board[x][y] === piece) count++
  return count
}

function getRandomLocation(board, piece) {
  const size = board[0].length
  const moveOptions = []
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      if (board[x][y] === piece) moveOptions.push([x, y])

  const randomIndex = Math.floor(Math.random() * moveOptions.length)
  return moveOptions[randomIndex] ?? []
}

function getAllValidMoves(board, validMove) {
  let moves = []
  for (let x = 0; x < board[0].length; x++)
    for (let y = 0; y < board[0].length; y++)
      if (validMove[x][y]) moves.push([x, y])
  //Moves contains a randomized array of x,y
  moves = moves.sort(() => Math.random() - Math.random())
  return moves
}

function getOpeningMove(ns, board, validMove, validLibMoves, contested) {
  const size = board[0].length
  switch (size) {
    case 13:
      if (getSurroundSpace(2, 2, board) === 4 && validMove[2][2]) return ([2, 2])
      else if (getSurroundSpace(2, 10, board) === 4 && validMove[2][10]) return ([2, 10])
      else if (getSurroundSpace(10, 10, board) === 4 && validMove[10][10]) return ([10, 10])
      else if (getSurroundSpace(10, 2, board) === 4 && validMove[10][2]) return ([10, 2])
      else if (getSurroundSpace(3, 3, board) === 4 && validMove[3][3]) return ([3, 3])
      else if (getSurroundSpace(3, 9, board) === 4 && validMove[3][9]) return ([3, 9])
      else if (getSurroundSpace(9, 9, board) === 4 && validMove[9][9]) return ([9, 9])
      else if (getSurroundSpace(9, 3, board) === 4 && validMove[9][3]) return ([9, 3])
      else if (getSurroundSpace(4, 4, board) === 4 && validMove[4][4]) return ([4, 4])
      else if (getSurroundSpace(4, 8, board) === 4 && validMove[4][8]) return ([4, 8])
      else if (getSurroundSpace(8, 8, board) === 4 && validMove[8][8]) return ([8, 8])
      else if (getSurroundSpace(8, 4, board) === 4 && validMove[8][4]) return ([8, 4])
      else return getRandomStrat(ns, board, validMove, validLibMoves, contested)
    case 9:
      if (getSurroundSpace(2, 2, board) === 4 && validMove[2][2]) return ([2, 2])
      else if (getSurroundSpace(2, 6, board) === 4 && validMove[2][6]) return ([2, 6])
      else if (getSurroundSpace(6, 6, board) === 4 && validMove[6][6]) return ([6, 6])
      else if (getSurroundSpace(6, 2, board) === 4 && validMove[6][2]) return ([6, 2])
      else if (getSurroundSpace(3, 3, board) === 4 && validMove[3][3]) return ([3, 3])
      else if (getSurroundSpace(3, 5, board) === 4 && validMove[3][5]) return ([3, 5])
      else if (getSurroundSpace(5, 5, board) === 4 && validMove[5][5]) return ([5, 5])
      else if (getSurroundSpace(5, 3, board) === 4 && validMove[5][3]) return ([5, 3])
      else return getRandomStrat(ns, board, validMove, validLibMoves, contested)
    case 7:
      if (getSurroundSpace(2, 2, board) === 4 && validMove[2][2]) return ([2, 2])
      else if (getSurroundSpace(2, 4, board) === 4 && validMove[2][4]) return ([2, 4])
      else if (getSurroundSpace(4, 4, board) === 4 && validMove[4][4]) return ([4, 4])
      else if (getSurroundSpace(4, 2, board) === 4 && validMove[4][2]) return ([4, 2])
      else if (getSurroundSpace(3, 3, board) === 4 && validMove[3][3]) return ([3, 3])
      else if (getSurroundSpace(1, 1, board) === 4 && validMove[1][1]) return ([1, 1])
      else if (getSurroundSpace(5, 1, board) === 4 && validMove[5][1]) return ([5, 1])
      else if (getSurroundSpace(5, 5, board) === 4 && validMove[5][5]) return ([5, 5])
      else if (getSurroundSpace(1, 5, board) === 4 && validMove[1][5]) return ([1, 5])
      else return getRandomStrat(ns, board, validMove, validLibMoves, contested)
    case 5:
      if (getSurroundSpace(2, 2, board) === 4 && validMove[2][2]) return ([2, 2])
      else if (getSurroundSpace(3, 3, board) === 4 && validMove[3][3]) return ([3, 3])
      else if (getSurroundSpace(3, 1, board) === 4 && validMove[3][1]) return ([3, 1])
      else if (getSurroundSpace(1, 3, board) === 4 && validMove[1][3]) return ([1, 3])
      else if (getSurroundSpace(1, 1, board) === 4 && validMove[1][1]) return ([1, 1])
      else return getRandomStrat(ns, board, validMove, validLibMoves, contested)
    case 19:
      if (getSurroundSpace(10, 10, board) === 4 && validMove[10][10]) return ([10, 10])
      else if (getSurroundSpace(2, 2, board) === 4 && validMove[2][2]) return ([2, 2])
      else if (getSurroundSpace(16, 2, board) === 4 && validMove[16][2]) return ([16, 2])
      else if (getSurroundSpace(2, 16, board) === 4 && validMove[2][16]) return ([2, 16])
      else if (getSurroundSpace(16, 16, board) === 4 && validMove[16][16]) return ([16, 16])
      else if (getSurroundSpace(3, 3, board) === 4 && validMove[3][3]) return ([3, 3])
      else if (getSurroundSpace(3, 15, board) === 4 && validMove[3][15]) return ([3, 15])
      else if (getSurroundSpace(15, 15, board) === 4 && validMove[15][15]) return ([15, 15])
      else if (getSurroundSpace(15, 3, board) === 4 && validMove[15][3]) return ([15, 3])
      else if (getSurroundSpace(4, 4, board) === 4 && validMove[4][4]) return ([4, 4])
      else if (getSurroundSpace(4, 14, board) === 4 && validMove[4][14]) return ([4, 14])
      else if (getSurroundSpace(14, 14, board) === 4 && validMove[14][14]) return ([14, 14])
      else if (getSurroundSpace(14, 4, board) === 4 && validMove[14][4]) return ([14, 4])

      else return getRandomStrat(ns, board, validMove, validLibMoves, contested)
  }
}


//X,O = Me, You  x, o = Anything but the other person, "W" space is off the board, ? is anything goes
//B is blocking(Wall or you, not empty or enemy), b is blocking but could be enemy, A is All but . (Wall, Me, You, Blank)
//* is move here next if you can - no safeties
const atk3 = [
  [["oO."], ["OX."], ["..x"]], //Pattern# Safe Cut
  [["xX?"], ["OOX"], ["xx?"]], // Cut4
  [["X*."], ["?OX"], ["???"]], // Pattern #Conn311
  [["?XW"], ["XOW"], ["X.W"]], // Side chase
  [[".??"], ["*OX"], ["..."]], // Pattern# Sphyxis Enclosing Hane
  [["XO?"], ["XX?"], ["?O?"]], // Block join
  [["XO."], ["..."], ["?.?"]], // magari
  [[".O."], ["X.."], ["..."]], // Side Attach
  [["XO?"], ["O.x"], ["?x?"]], // Cut1 unprotected
  [["XO?"], ["O.X"], ["???"]], // Cut1 peeped
  [["?X?"], ["O.O"], ["xxx"]], // Cut2
  //[["OX?"], ["x.O"], ["???"]], // Cut3
  [["XX?"], ["OOX"], [".X?"]], // Cut4 prep
  [["xXO"], ["o.o"], ["WWW"]], // Side sagari
  [["?OX"], ["X.O"], ["WWW"]], // Side Cut
  [["xO?"], ["XOX"], ["X.."]], // Block surround
  [["xO?"], ["XOX"], ["oX."]], // Block surround
]
const atk4 = [
  [["??b?"], ["?b.b"], ["b.*b"], ["?bb?"]],  //Pattern# Sphyxis - buy a turn #GREAT
  [["?bb?"], ["b..b"], ["b.*b"], ["?bb?"]],  //Pattern# Sphyxis - buy a turn #GREAT
  [["??b?"], ["?b.b"], ["?b*b"], ["??b?"]], //Pattern# Sphyxis - Sacrifice to kill an eye
  //[["x.oo"], [".XOo"], ["x.oo"], ["????"]], //Pattern# Sphyxis - checkered attack
  //[["?x.x"], ["x.*."], ["?x.x"], ["????"]], //Paattern# Sphyxis - Attack eye formation safely
  //[["?OO?"], ["O.*O"], ["?OO?"], ["????"]],  //Pattern# Sphyxis - Attack possible weak eye
  //[["OOOx"], ["O.Ox"], ["OOXx"], ["?xxx"]], //Block an eye
  //[["OOOO"], ["O..O"], ["XOOO"], ["????"]], //Sacrifice to force an eye openeing if possible
]
const atk5 = [
  //[["xxx.O"], ["xx.X."], ["xxx.x"], ["?xxx?"], ["?????"]], //Pattern# Sphyxis - Safe Side Attach
  //[["?????"], ["?x..?"], ["?xXX."], ["?x..?"], ["?????"]], //Pattern# Sphyxis - Line jumping
  [["?.*.?"], ["?...?"], ["?BOB?"], ["?BOB?"], ["??B??"]], //Pattern# Sphyxis - Trap
  [["?bbb?"], ["b.*.b"], ["?bbb?"], ["?????"], ["?????"]], //Pattern# Sphyxis - Convert to 1 eye
  [["??OO?"], ["?O*.O"], ["?O..O"], ["??OO?"], ["?xxx?"]],  //Pattern# Sphyxis - Buy time
  [["WWW??"], ["WW.b?"], ["W.*b?"], ["WWW??"], ["?????"]], //Pattern# Sphyxis - 2x2 attack corner if possible
  [["??b??"], ["?b.b?"], ["?b*b?"], ["?b.A?"], ["??b??"]], //Pattern# Sphyxis - Break two eyes into 1, buy a turn
  [["??b??"], ["?b.b?"], ["??*.b"], ["?b?b?"], ["?????"]], //Pattern# Sphyxis - Break eyes, buy time

  //[["?x.x?"], ["x.x.x"], [".X.x?"], ["x.X.x"], ["??.??"]], //Pattern# Sphyxis - checkered
  //[["xx.xx"], ["xo.ox"], ["..X.x"], ["xo.ox"], ["xxoxx"]], //Pattern# Sphyxis - Take a mid point
  //[["xxoxx"], ["xo.ox"], ["x.X.x"], ["xo.ox"], ["xxoxx"]], //Pattern# Sphyxis - Take a mid point
  //[["?????"], ["?...."], ["?X.X."], ["?...."], ["?xxxx"]], //Pattern# Sphyxis - Checkered Advance
  //[["?????"], ["?.x.x"], [".*.X."], ["?.X.x"], ["?????"]], //Pattern# Sphyxis - Safe Expand
  //[["?..o?"], ["...??"], ["..XO?"], ["?..??"], ["?????"]], //Pattern# Sphyxis - Safe Magari
  //[["?...."], ["?.*.."], ["??OOO"], ["?XXOX"], ["?XXXX"]], //Pattern# Sphyxis - Attack the wall!
  //[["?????"], ["?.X??"], ["OO*.O"], ["ooooo"], ["?????"]], //Line Blockade
]

const atk6 = [
  [["?...??"], ["??.XX."], ["?*OOOX"], ["??.XX."], ["?...??"], ["??????"]], //Pattern# Sphyxis - Double sided attack, then kill with 2 liberties
]

const atk7 = [
  [["BBBBBBB"], ["......B"], ["......B"], [".X*...B"], [".OOX..B"], ["......B"], ["......B"]], //Pattern# Josekai Start
]



const eyes3 = [
  [["XXX"], ["X.X"], ["BBB"]], //Full Eye, either wall or regular
  [["XX."], ["X.X"], ["BBB"]], //Near Full Eye, either wall or regular
  [[".X."], ["X.X"], [".X."]], //Basic Eye
  [["XXX"], ["x.x"], [".X."]], //Basic Eye build
  [["XXX"], ["X.X"], ["XX."]], //Basic Eye build
  [["XX."], ["X.X"], ["xXx"]], //Basic Eye build
  [["BXX"], ["B.X"], ["BBB"]], //Corner eye
  [["BBB"], ["B.B"], ["xXx"]], //Basic side eye Lonely spot
]

const def3 = [
  //[["xXx"], ["Xxx"], ["???"]], // Side progress
  //[["..."], [".X."], ["..."]],  //Test
  [["xXx"], ["x.x"], ["xxx"]], //Pattern# Sphyxis - Bolster Eyes
  [["?X?"], ["XOX"], ["XOX"]], // Cap
  [["OX?"], ["OOX"], ["OX?"]], // Cap 2
  [["OX?"], ["OOX"], ["OX?"]], // Cap 2
  //[["?X?"], ["o.O"], ["WWW"]], // Block Connect
  //[["XO?"], ["XX?"], ["?O?"]], // Block join
  //[["OX?"], ["X.O"], ["WWW"]], // Block Cut

  //[[".O."], ["O.O"], [".*."]], // Block eye

  //[["OX?"], ["X.O"], ["WWW"]], // Block Cut
  //[["?X?"], ["o.O"], ["WWW"]], // Block Connect
  //[["oXo"], ["X.x"], ["oxo"]], // Build
  //[["?oX"], ["oXX"], ["XXo"]], //diagonal
]

const def4 = [
  //[["?BBB"], ["BB.B"], ["W..B"], ["?.*?"]], //Pattern# Sphyxis - 2x2 nook #GREAT
  //[["?BBB"], ["BB.B"], ["W..B"], ["?*x?"]], //Pattern# Sphyxis - 2x2 nook #GREAT
  //[[".BBB"], ["x*.B"], [".BBB"], ["????"]], //Pattern# Sphyxis - Dangling 2
  [["?x.?"], ["B.X."], ["?B.x"], ["??B?"]], //Pattern# Sphyxis - Diagonal
  //[[".X.O"], ["O*XO"], [".X.O"], ["????"]], //Pattern# Make Proper Eye
  //[["BBB?"], ["B.sX"], ["BBB?"], ["????"]], //Pattern# Sphyxis - Convert bad eye
  [["?*b?"], ["bXX."], ["bbb?"], ["????"]], //Pattern# Sphyxis - Look for a way out

]

const def5 = [
  //[["?O???"], ["?O???"], ["xOx??"], ["xXx??"], ["?x???"]], //Stop line progression
  [["....."], ["BxXxB"], ["B...B"], ["B...B"], ["?xxx?"]], //Pattern# Sphyxis - 3x3 wall
  [["....."], ["BxxXB"], ["B...B"], ["B...B"], ["?xxx?"]], //Pattern# Sphyxis - 3x3 wall
  //[["?BBB?"], ["B.*.B"], ["?BBB?"], ["?????"], ["?????"]], //Pattern# Sphyxis - Make 2 eyes
  [["?O?.?"], ["X.*xx"], ["X...."], ["x...."], ["BBBBB"]], //The jump under #Pattern EB112
  [["??bb?"], ["?.XXb"], ["?.*b?"], ["?????"], ["?????"]], //Pattern# Sphyxis-Defend against small net
  [["?XX??"], ["W.*XB"], ["WW.XB"], ["WWW??"], ["?xxx?"]],  //Pattern# Sphyxis - Attach to wall
  [["?XX??"], ["W.XXB"], ["WW.*B"], ["WWW??"], ["?xxx?"]],  //Pattern# Sphyxis - Attach to wall
  [["?XX??"], ["W.X*B"], ["WW.XB"], ["WWW??"], ["?xxx?"]],  //Pattern# Sphyxis - Attach to wall
  //[["??x.?"], ["??B.W"], ["??BXW"], ["??B.W"], ["???B?"]], //Pattern# Sphyxis - Build side eyes
  //[["?BB??"], ["BB.X?"], ["B.XX?"], ["BBB??"], ["?????"]], //Pattern# Sphyxis - Eyes in a nook
  //[["WWW??"], ["WW.X?"], ["W.*X?"], ["WWW??"], ["?????"]], //Pattern# Sphyxis - 2x2 corner contain #GREAT
  //[["BBB??"], ["BB.X?"], ["B..X?"], ["BBB??"], ["?????"]], //Pattern# Sphyxis - 2x2 corner contain #GREAT
  [["W.X.?"], ["W..??"], ["W.X.?"], ["??.??"], ["?????"]], //Pattern# Sphyxis - Wall Runner Spotted
  [["?????"], ["x?.??"], ["XxX.?"], ["x?.??"], ["?????"]], //Pattern# Sphyxis - Fill in the gaps - wide
  [["X.???"], ["...??"], ["?.X.?"], ["??.??"], ["?????"]], //Pattern# Sphyxis - Fill in the gaps - wide
  [["?.???"], [".X.??"], ["?.X.?"], ["??.??"], ["?????"]], //Pattern# Sphyxis - Fill in the diag
  [["?????"], ["?.?.?"], [".x.x."], ["?.?.?"], ["?.?.?"]], //Pattern# Sphyxis - Fill in the gaps




  //[["?????"], ["?OOOX"], [".XOX."], ["?.X.?"], ["??.??"]], //Net  very effective
  //[["?????"], ["XOOOX"], ["xXOXx"], ["?xXx?"], ["?????"]], //Net  very effective
  //[["?X???"], ["XOOOX"], ["xXOXx"], ["?xXx?"], ["?????"]], //Net2 very effective
  //[["?????"], ["?XOo?"], ["?XOo?"], ["?oXo?"], ["?????"]], //Net for 2
  //[["o????"], ["ooOo?"], ["oXOo?"], ["ooXo?"], ["oooo?"]], //Net for 2
  //[["?????"], ["?XXxx"], ["XOOXx"], ["?OOOX"], ["?????"]], //Half a large net
  //[["??.??"], ["?.x.?"], [".xOX."], ["?.x.?"], ["??.??"]], //Star capture - safe
  //[["?????"], ["?.x.?"], ["?XOX?"], ["?.x.?"], ["?????"]], //Star capture - side
  //[["??Ox?"], ["??Ox?"], ["OOXXX"], ["xxX??"], ["xxX??"]], //Blocking rejoinder
  //[["BBBBB"], ["B?X.X"], ["B?XXX"], ["B?X.X"], ["??XXX"]], //Window

]

const def6 = [
  [["?...??"], ["??.bb."], ["?.XXXb"], ["??*bb."], ["?...??"], ["??????"]], //Pattern# Sphyxis - Avoid net!
  //[["?....."], ["?....."], ["?..X.."], ["?....."], ["?....."], ["??????"]], //Big open area
]
const def7 = [
  [["BBBBBBB"], ["......B"], ["......B"], [".X*...B"], [".OOX..B"], ["......B"], ["......B"]], //Pattern# joseki
  [["???????"], ["???X???"], ["??XOX??"], ["?XOOOX?"], [".OOOOO."], ["???????"], ["???????"]], //7x7 net
  [["???????"], ["???X???"], ["??XOX??"], ["?XOOOX?"], ["XOOOOO."], ["???????"], ["???????"]], //7x7 net
  [["???????"], ["???X???"], ["??XOX??"], ["?XOOOX?"], ["XOOOOOX"], ["?????X?"], ["???????"]], //7x7 net
  [["???????"], ["???X???"], ["??XOX??"], ["?XOOOX?"], ["XOOOOOX"], ["?X?X?X?"], ["???????"]], //7x7 net
  [["???????"], ["???X???"], ["??XOX??"], ["?XOOOX?"], ["XOOOOOX"], ["?X?X?X?"], ["??X????"]], //7x7 net

  [["???????"], ["???????"], ["?O....?"], ["?OOX..?"], ["?O....?"], ["???????"], ["???????"]], //Encircle
  [["???????"], ["???????"], ["?OX...?"], ["?OOX..?"], ["?O....?"], ["???????"], ["???????"]], //Encircle

  [["???x???"], ["??xXx??"], ["?xxOxx?"], ["xxOoOxx"], ["?xxOxx?"], ["??xxx??"], ["???x???"]], //Pattern# Sphyxis - Star Net
  [["???x???"], ["??xxx??"], ["?xxOXx?"], ["xxOoOxx"], ["?xxOxx?"], ["??xxx??"], ["???x???"]], //Pattern# Sphyxis - Star Net

  //[["ooooooo"], ["ooooooo"], ["ooooooo"], ["xxxxXxx"], ["?OOOOO?"], ["???????"], ["???????"]], //Block Line
  //[["ooooooo"], ["ooooooo"], ["ooooooo"], ["??xXXx?"], ["?OOOOO?"], ["???????"], ["???????"]], //Block Line
]

const bail4 = [
  [["?b??"], ["bXO?"], ["bXO?"], ["b..*"]], //Pattern# Sphyxis-Don't let them chase the rabbit
]


const opponent = ["Netburners", "Slum Snakes", "The Black Hand"]
const opponent2 = ["Netburners", "Slum Snakes", "The Black Hand"]

//Original
//const opponent = ["Netburners", "Slum Snakes", "The Black Hand", "Tetrads", "Daedalus", "Illuminati"]
//const opponent2 = ["Netburners", "Slum Snakes", "The Black Hand", "Tetrads", "Daedalus", "Illuminati", "????????????"]