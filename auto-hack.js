import { scanTargetsUnfiltered } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  const SCRIPT_WHITELIST = [
    ...ns.ls("home", "daemon/"),
    ...ns.ls("home", "exploit/"),
    ns.getScriptName()
  ]
  const targets = scanTargetsUnfiltered(ns)
  ns.tprint("Killall every known server")
  targets.forEach((t) => {
    if (ns.getPurchasedServers().includes(t)) return
    if (t == ns.read("configs/current-manager.txt")) return
    if (t != "home") ns.killall(t)
    else {
      ns.ps(t).forEach((p) => {
        if (!(SCRIPT_WHITELIST.includes(p.filename))) ns.kill(p.pid)
      })
    }
  })
  
  ns.run("auto-nuke.js")
  ns.run("htw.js", 1, "param-hack-script.js")
  ns.run("buddy-hack-init.js", 1, "param-hack-script.js")
}