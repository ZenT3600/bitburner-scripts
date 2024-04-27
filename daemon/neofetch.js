import { tryStartOnManager } from "/lib/_utils.js"

/** @param {NS} ns */
function longest(arr) {
  return arr.reduce(
        function (a, b) {
            return a.length > b.length ? a : b;
        }
    )
}

/** @param {NS} ns */
function getTotalHacknetProfit(ns) {
  let count = 0
  for (let i = 0; i < ns.hacknet.numNodes(); i++) {
    count += ns.hacknet.getNodeStats(i).production
  }
  return count
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL")
  if (tryStartOnManager(ns, ns.getHostname())) return
  ns.tail()
  const formatNums = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3
  })
  var MANAGER = ""

  while (true) {
    ns.clearLog()
    var INFOS = []
    var VALUE = []
    MANAGER = ns.read("configs/current-manager.txt")

    var USED_RAM = ns.getServerUsedRam("home")
    var MAX_RAM = ns.getServerMaxRam("home")
    INFOS.push("Ram Usage on Home")
    VALUE.push(USED_RAM + "GB out of " + MAX_RAM + "GB")
    
    var CORES = ns.getServer("home").cpuCores
    INFOS.push("Available Cores on Home")
    VALUE.push(CORES + " core(s)")

    var MANAGER_USED_RAM = ns.getServerUsedRam(MANAGER)
    var MANAGER_MAX_RAM = ns.getServerMaxRam(MANAGER)
    INFOS.push("Ram Usage on Manager")
    VALUE.push(MANAGER_USED_RAM + "GB out of " + MANAGER_MAX_RAM + "GB")
    
    var MANAGER_CORES = ns.getServer(MANAGER).cpuCores
    INFOS.push("Available Cores on Manager")
    VALUE.push(MANAGER_CORES + " core(s)")

    var HOME_SCRIPTS = ns.ps("home")
    INFOS.push("Scripts on Home on Home")
    VALUE.push("" + HOME_SCRIPTS.length + " script(s)")

    var DAEMON_COUNT = 0
    for (var script of HOME_SCRIPTS) {
      if (script.filename.includes("daemon/")) DAEMON_COUNT++
    }
    INFOS.push("Daemons on Home")
    VALUE.push("" + DAEMON_COUNT + " daemon(s)")

    var MANAGER_SCRIPTS = ns.ps(MANAGER)
    INFOS.push("Scripts on Manager")
    VALUE.push("" + MANAGER_SCRIPTS.length + " script(s)")

    var MANAGER_DAEMON_COUNT = 0
    for (var script of MANAGER_SCRIPTS) {
      if (script.filename.includes("daemon/")) MANAGER_DAEMON_COUNT++
    }
    INFOS.push("Daemons on Manager")
    VALUE.push("" + MANAGER_DAEMON_COUNT + " daemon(s)")

    var HACKNET_PROFIT = getTotalHacknetProfit(ns)
    INFOS.push("Hacknet Profit")
    VALUE.push("$" +  formatNums.format(HACKNET_PROFIT) + "/s")

    var KARMA = ns.heart.break().toFixed(2)
    INFOS.push("Current Karma")
    VALUE.push("" + KARMA)

    let LONGEST_INFOS = longest(INFOS).length || 8
    let LONGEST_VALUE = longest(VALUE).length || 8
    ns.print("Info: " + " ".repeat(LONGEST_INFOS) + " | Value: " + " ".repeat(LONGEST_VALUE))
    ns.print("-".repeat(LONGEST_INFOS + LONGEST_VALUE))
    for (let i = 0; i < INFOS.length; i++) {
      ns.print(
        INFOS[i] + " ".repeat(LONGEST_INFOS - INFOS[i].length + 7) + "| " +
        VALUE[i] + " ".repeat(LONGEST_VALUE - VALUE[i].length + 8)
      )
    }
    await ns.sleep(1000)
  }
}