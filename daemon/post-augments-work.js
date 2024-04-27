import { updateValueViaPortChannel, clearPort, tryStartOnManager } from "/lib/_utils.js"

export const USED_PORT = 4
export const USED_CHANNELS = ["WORKPLACE", "POSITION", "STUDYPLACE", "COURSE", "MONEY_TRESH", "FOCUS", "PAUSE"]

/** @param {NS} ns */
export async function main(ns) {
  if (tryStartOnManager(ns, ns.getHostname())) return
  var WORKPLACE = "Joe's Guns"
  var POSITION = "Part-time Employee"
  var STUDYPLACE = "Rothman University"
  var COURSE = 3
  var MONEY_TRESH = 5_000   // 5k, this is a starting script afterall
  var FOCUS = false
  var PAUSE = 0
  const COURSES = ["Computer Science", "Data Structures", "Networks", "Algorithms"]
  const COSTS = [0, 120, 240, 960]

  let MONEY = ns.getPlayer().money
  let RUN_FOR = -1
  ns.disableLog("sleep")
  while (true) {
    WORKPLACE = updateValueViaPortChannel(ns, USED_PORT, 1, WORKPLACE)
    POSITION = updateValueViaPortChannel(ns, USED_PORT, 2, POSITION)
    STUDYPLACE = updateValueViaPortChannel(ns, USED_PORT, 3, STUDYPLACE)
    COURSE = updateValueViaPortChannel(ns, USED_PORT, 4, COURSE)
    MONEY_TRESH = updateValueViaPortChannel(ns, USED_PORT, 5, MONEY_TRESH)
    FOCUS = updateValueViaPortChannel(ns, USED_PORT, 6, FOCUS)
    PAUSE = updateValueViaPortChannel(ns, USED_PORT, 7, PAUSE)
    clearPort(ns, USED_PORT)

    if (PAUSE > 0) {
      await ns.sleep(1000)
      continue
    }

    if (MONEY > 0) {
      ns.singularity.universityCourse(STUDYPLACE, COURSES[COURSE], FOCUS)
      while (true) {
        MONEY = ns.getPlayer().money
        if (MONEY <= 0) break
        await ns.sleep(1000)
      }
      await ns.sleep(RUN_FOR * 1000)
      ns.singularity.stopAction()
    }

    try {
      ns.singularity.workForCompany(WORKPLACE, FOCUS)
      while (true) {
        MONEY = ns.getPlayer().money
        if (MONEY >= MONEY_TRESH) break
        await ns.sleep(1000)
      }
      ns.singularity.stopAction()
    } catch (e) {
      ns.singularity.applyToCompany(WORKPLACE, POSITION)
    }

    ns.exec("auto-hack.js", "home")
  }
}