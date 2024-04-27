import { portOpenersCount, scanTargets } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  const portOpeners = portOpenersCount(ns)
  const forgivness = 1;
  const ignoreTargets = [
    "home",
    "darkweb",
    ...ns.getPurchasedServers(),
    ns.read("configs/current-manager.txt")
  ];

  const script = ns.args[0];
  ns.tprint("Pinning buddies against eachother with " + script)
  const scriptCost = ns.getScriptRam(script);
  const visibleTargets = scanTargets(ns)

  var actualTargets = visibleTargets;
  for (var i = 0; i < visibleTargets.length; i++) {
    if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(actualTargets[i])) {
      actualTargets.splice(i, 1)
      i--
      continue
    }
    if (scriptCost > ns.getServerMaxRam(actualTargets[i])) {
      actualTargets.splice(i, 1)
      i--
      continue
    }
    if (portOpeners < ns.getServerNumPortsRequired(actualTargets[i])) {
      actualTargets.splice(i, 1)
      i--
      continue
    }
    if (ignoreTargets.includes(actualTargets[i])) {
      actualTargets.splice(i, 1)
      i--
      continue
    }
  }

  var i = 0;
  var toIgnore = [];
  actualTargets.forEach((aTarget) => {
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(aTarget);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(aTarget);
    }
    try {
      ns.nuke(aTarget);
      ns.scp(script, aTarget)
    } catch {
      toIgnore.push(i);
    }
    i++;
  })

  for (var i = 0; i < actualTargets.length; i += 2) {
    if (toIgnore.includes(i)) {
      continue;
    }
    if ((i + 1) < actualTargets.length) {
      // --- Server A
      var serverMemA = ns.getServerMaxRam(actualTargets[i])
      var maxThreadsA = Math.round(serverMemA / scriptCost) - forgivness
      ns.exec(script, actualTargets[i], maxThreadsA, actualTargets[i + 1])

      // --- Server B
      var serverMemB = ns.getServerMaxRam(actualTargets[i + 1])
      var maxThreadsB = Math.round(serverMemB / scriptCost) - forgivness
      ns.exec(script, actualTargets[i + 1], maxThreadsB, actualTargets[i])
    } else {
      // --- Server Last
      var serverMem = ns.getServerMaxRam(actualTargets[i])
      var maxThreads = Math.round(serverMem / scriptCost) - forgivness
      ns.exec(script, actualTargets[i], maxThreads, actualTargets[0])
    }
  }
}