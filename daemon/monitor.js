import * as Charts from '/lib/_asciichart.js'
import { updateValueViaPortChannel, clearPort, tryStartOnManager } from "/lib/_utils.js"

export const USED_PORT = 3
export const USED_CHANNELS = ["ACTION"]

var ACTION = null

async function plotFunction(ns, LOGFILE, MAX, f) {
  ns.write("/logs/" + LOGFILE, "" + f() + "\n", "a")
  var OLD_ACTION = null
  while (true) {
    OLD_ACTION = ACTION
    ACTION = updateValueViaPortChannel(ns, USED_PORT, 1, ACTION)
    clearPort(ns, USED_PORT)
    if (OLD_ACTION != ACTION) {
      break
    }
    ns.clearLog()
    ns.write("/logs/" + LOGFILE, "" + f() + "\n", "a")
    var data = ns.read("/logs/" + LOGFILE).split("\n").map(Number)
    data.pop(data.length - 1)
    let start = data.length < MAX ? 0 : data.length - MAX
    let end = data.length
    var newData = data.splice(start, end - start)
    ns.print(Charts.plot(newData))
    await ns.sleep(1000)
  }
}


/** @param {NS} ns */
export async function main(ns) {
  if (tryStartOnManager(ns, ns.getHostname())) return
  const LOGFILE_END = ".user.txt"
  const MULTIPLE_ACTIONS = ns.args || [ "MONEY" ]
  const MAX = 35
  ns.disableLog("ALL")
  ns.tail()
  if (MULTIPLE_ACTIONS.length > 1) {
    ACTION = MULTIPLE_ACTIONS[MULTIPLE_ACTIONS.length - 1]
    MULTIPLE_ACTIONS.pop()
    ns.exec(ns.getScriptName(), "home", 1, ...MULTIPLE_ACTIONS)
  } else {
    ACTION = MULTIPLE_ACTIONS[0]
  }
  while (true) {
    ns.setTitle("Monitoring " + ACTION + "...")

    switch (ACTION) {
      case "MONEY":
        await plotFunction(ns, "money" + LOGFILE_END, MAX, function() { return ns.getServerMoneyAvailable("home") })
        break;
      case "HACK":
        await plotFunction(ns, "hack" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.hacking })
        break;
      case "CHARISMA":
        await plotFunction(ns, "charisma" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.charisma })
        break;
      case "STRENGTH":
        await plotFunction(ns, "strength" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.strength })
        break;
      case "DEFENSE":
        await plotFunction(ns, "defense" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.defense })
        break;
      case "DEXERITY":
        await plotFunction(ns, "dexerity" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.dexterity })
        break;
      case "AGILITY":
        await plotFunction(ns, "agility" + LOGFILE_END, MAX, function() { return ns.getPlayer().exp.agility })
        break;
      case "STOCK":
        await plotFunction(ns, "stock" + LOGFILE_END, MAX, function() {
          let value = 0
          for (const stock of ns.stock.getSymbols()) {
            var position = ns.stock.getPosition(stock);
            if (position[0]) {
              value += position[0] * position[1]
            }
          }
          return value
        })
        break;
      default:
        await ns.sleep(1000);
    }
  }
}