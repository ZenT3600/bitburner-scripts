import { scanTargets, tryStartOnManager } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  var ignore = [
    "home",
    "darkweb",
    ns.read("configs/current-manager.txt")
  ]
  ignore = ignore.concat(ns.getPurchasedServers())
  // if (tryStartOnManager(ns, ns.getHostname())) return
  const script = ns.args[0]
  const ram = ns.args[1] || ns.getServerMaxRam(ns.getHostname())
  ns.tprint("Hacking the world with " + script)
  const KEEP_RAM_PERCENT = 25
  const KEEP_RAM = ((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) / 100 * KEEP_RAM_PERCENT).toFixed(0)
  const targets = scanTargets(ns)
  const threadMax = Math.floor((ram - KEEP_RAM) / ns.getScriptRam(script))
  var validTargets = []
  targets.forEach((t) => {
    if (ignore.includes(t)) return;
    validTargets.push(t)
  })
  var threadEach = Math.floor(threadMax / validTargets.length)
  validTargets.forEach((t) => {
    while ((ns.run(script, threadEach, t) == 0) && (threadEach > 1)) threadEach--;
  })
}