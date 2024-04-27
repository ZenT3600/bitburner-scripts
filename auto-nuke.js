import { scanTargetsUnfiltered, portOpenersCount } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  var ignore = [
    "home",
    "darkweb",
    ...ns.getPurchasedServers()
  ]
  ignore = ignore.concat(ns.getPurchasedServers())
  const targets = scanTargetsUnfiltered(ns)
  var validTargets = []
  targets.forEach((t) => {
    if (ignore.includes(t)) return;
    if (ns.hasRootAccess(t)) return;
    if (ns.getServerRequiredHackingLevel(t) > ns.getHackingLevel()) return;
    if (ns.getServerNumPortsRequired(t) > portOpenersCount(ns)) return;
    validTargets.push(t)
  })
  let count = 0;
  validTargets.forEach((t) => {
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(t);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(t);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(t);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(t);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(t);
    }
    try {
      ns.nuke(t);
      count++;
    } catch (e) {
      ns.tprintf("ERROR Something went wrong! count: " + count + ", target: " + t)
    }
  })
  ns.tprint("Nuked " + count + " server(s)")
}