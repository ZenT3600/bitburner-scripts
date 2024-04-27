import { tryStartOnManager, pingNfty } from "/lib/_utils.js"
import { generatePathRaw } from "/utils/l00k4theh111z.js"

function readFile(ns, file) {
  if (!ns.fileExists(file)) return undefined
  return ns.read(file).split("\n")
}

/** @param {NS} ns */
export async function main(ns) {
  if (tryStartOnManager(ns, ns.getHostname())) return
  const NOTHING_ACTION = "NOTHING"
  const CREATE_ACTION = "CREATE"
  const WORK_ACTION = "WORK"
  const WORK_FACTION_ACTION = "FACTION"
  const STUDY_ACTION = "STUDY"
  const SPAWN_ACTION = "SPAWN"
  const BACKDOOR_ACTION = "BACKDOOR"
  const NOTIFY_EXTRA = "NOTIFY"
  const FOCUS_EXTRA = "FOCUS"
  var ACTION_INDEX = 0
  var CURRENT_ACTION = NOTHING_ACTION
  const ACTIONS = ns.args.length > 1 ? [...ns.args] : readFile(ns, ns.args[0])
  if (!ACTIONS) return

  ns.disableLog("sleep")
  ns.tail()

  while (true) {
    await ns.sleep(1000)
    if (ACTION_INDEX >= ACTIONS.length) break
    
    try {
      ns.print("INFO Action index " + ACTION_INDEX)
      CURRENT_ACTION = ACTIONS[ACTION_INDEX].replace("\r", "")
      CURRENT_ACTION = CURRENT_ACTION.split(":-:")
      let FOCUS = CURRENT_ACTION.includes(FOCUS_EXTRA) ? true : false
      let NOTIFY = CURRENT_ACTION.includes(NOTIFY_EXTRA) ? true : false
      switch (CURRENT_ACTION[0]) {
        case CREATE_ACTION:
          ns.singularity.createProgram(CURRENT_ACTION[1], FOCUS)
          while (!ns.fileExists(CURRENT_ACTION[1], "home")) await ns.sleep(1000)
          break;
        case WORK_ACTION:
          if (ns.singularity.workForCompany(CURRENT_ACTION[1], FOCUS)) {
            await ns.sleep(Number(CURRENT_ACTION[2]) * 1000)
          }
          break;
        case WORK_FACTION_ACTION:
          if (ns.singularity.workForFaction(CURRENT_ACTION[1], CURRENT_ACTION[2], FOCUS)) {
            await ns.sleep(Number(CURRENT_ACTION[3]) * 1000)
          }
          break;
        case STUDY_ACTION:
          if (ns.singularity.universityCourse(CURRENT_ACTION[1], CURRENT_ACTION[2], FOCUS)) {
            await ns.sleep(Number(CURRENT_ACTION[3]) * 1000)
          }
          break;
        case SPAWN_ACTION:
          ns.spawn(CURRENT_ACTION[1])
          break;
        case BACKDOOR_ACTION:
          let path = await generatePathRaw(ns, CURRENT_ACTION[1])
          for (let step of path) {
            ns.singularity.connect(step)
          }
          await ns.singularity.installBackdoor()
          ns.singularity.connect("home")
          break;
        case NOTHING_ACTION:
          break;
      }
      if (NOTIFY) {
        pingNfty("bitburner", ns.getScriptName(), "Just completed the following action: " + ACTIONS[ACTION_INDEX], "computer,bell")
      }
      ns.singularity.stopAction()
      ACTION_INDEX++
    } catch (e) {
      ns.printf("ERROR invalid action, skipping...")
      ns.printf("ERROR Details: " + e)
      ns.printf("ERROR Action: " + CURRENT_ACTION)
      ns.singularity.stopAction()
      ACTION_INDEX++
    }
  }
}