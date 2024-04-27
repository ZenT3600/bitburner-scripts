import { portOpenersCount, tryStartOnManager } from '/lib/_utils.js'

/** @param {NS} ns */
async function traverse(ns, host) {
  var OUTPUT = ""
  let LASTLINE = ""
  const LINE_LENGTH = 88
  const LIGHT_GREEN = "\u001b[38;0;102;204;255m"
  const DARK_GREEN = "\u001b[38;2;0;179;60m"
  const DARK_RED = "\u001b[38;2;153;0;0m"
  const RED = "\u001b[38;2;255;77;77m"
  const BLUE = "\u001b[38;2;128;191;255m"
  const WHITE = "\u001b[38;2;255;255;255m"
  const GRAY = "\u001b[38;2;118;118;118m"

  const nums = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3
  })

  const currentHost = ns.getHostname()
  const manager = ns.read("configs/current-manager.txt")
  const knownHosts = []
  const result = []
  const hackingAvailable = ns.getPlayer().skills.hacking
  const openers = portOpenersCount(ns)

  /** @param {NS} ns */
  async function traverseInner(ns, host, depth) {
    depth = depth || 0
    if (knownHosts.includes(host)) return
    knownHosts.push(host)
    
    /*
    ns.scp(ns.ls("home", "/utils/"), host)
    ns.scp(ns.ls("home", "/lib/"), host)
    */

    let ram = ns.getServerMaxRam(host)
    let money = ns.getServerMoneyAvailable(host)
    let scripts = ns.ps(host).length
    let portsRequired = ns.getServerNumPortsRequired(host)
    let hacklevel = ns.getServerRequiredHackingLevel(host)
    let isRooted = ns.hasRootAccess(host)
    let numColor = hackingAvailable >= hacklevel ? LIGHT_GREEN : DARK_RED
    let nameColor = isRooted ? WHITE : RED
    let portsColor = openers >= portsRequired ? LIGHT_GREEN : DARK_RED
    numColor = isRooted ? BLUE : numColor
    portsColor = isRooted ? BLUE : portsColor
    nameColor = host == currentHost ? DARK_GREEN : nameColor
    LASTLINE = "\n" + WHITE + "|" + "-".repeat(depth >= 1 ? depth - 1 : 0) + " " + nameColor + host +
              numColor + " (" + hacklevel + ")" + portsColor + " (" + portsRequired + ") " +
              (host == manager ? DARK_GREEN + "(MANAGER)" : "")
    let ADDTOLINE = (money == 0 ? DARK_RED : GRAY) + " ($" + nums.format(money) + ") " +
              (ram == 0 ? DARK_RED : GRAY) + "(" + ram + "GB) " + 
              GRAY + "(" + scripts + " script(s))"
    let length = LASTLINE.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "").length
    let length2 = ADDTOLINE.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "").length
    let whitespace = LINE_LENGTH - length - length2
    OUTPUT += LASTLINE + GRAY + "-".repeat(whitespace) + ADDTOLINE

    let children = await ns.scan(host)
    for (const knownHost of knownHosts) {
      let i = children.indexOf(knownHost)
      if (i > -1) children.splice(i, 1)
    }
    if (!children) return
    result.push(children)
    for (const childNode of children) {
      await traverseInner(ns, childNode, depth + 1)
    }
  }
  
  await traverseInner(ns, host)

  return OUTPUT
}

/** @param {NS} ns */
export async function main(ns) {
  const EXTRA = ns.args.length > 0 ? ns.args[0] : false
  if (!EXTRA) {
    ns.tprint(await traverse(ns, "home"))
  } else {
    if (EXTRA == "daemon") {
      if (tryStartOnManager(ns, ns.getHostname())) return
      ns.tail()
      ns.disableLog("ALL")
      while (true) {
        ns.clearLog()
        ns.print(await traverse(ns, "home"))

        await ns.sleep(1000)
      }
    }
  }
}