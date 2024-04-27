import { scanTargets } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  var ignore = [
    "home",
    "darkweb",
    ns.read("configs/current-manager.txt")
  ]
  const script = ns.args[0]
  ignore = ignore.concat(ns.getPurchasedServers())
  const targets = scanTargets(ns)
  var validTargets = []
  targets.forEach((t) => {
    if (ignore.includes(t)) return;
    validTargets.push(t)
  })
  validTargets.forEach((t) => {
    ns.exec(script, t)
  })
}