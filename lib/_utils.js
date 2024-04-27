/** @param {NS} ns */
export function tryStartOnManager(ns, currHost) {
  const MANAGER = ns.read("configs/current-manager.txt")
  const NEEDED_RAM = ns.getScriptRam(ns.getScriptName())
  const MANAGER_RAM = ns.getServerMaxRam(MANAGER) - ns.getServerUsedRam(MANAGER)
  if (MANAGER_RAM >= NEEDED_RAM && currHost != MANAGER && ns.hasRootAccess(MANAGER)) {
    ns.scp(ns.getScriptName(), MANAGER)
    ns.scp(ns.ls("home", "utils/"), MANAGER)
    ns.scp(ns.ls("home", "configs/"), MANAGER)
    ns.scp(ns.ls("home", "lib/"), MANAGER)
    ns.exec(ns.getScriptName(), MANAGER, 1, ...ns.args)
    return true
  }
  return false
}

export function pingNfty(channel, title, text, emoji) {
  fetch('https://ntfy.sh/' + channel, {
    method: 'POST',
    body: text,
    headers: {
        'Title': title,
        'Tags': emoji
    }
  })
}

/** @param {NS} ns */
export function portOpenersCount(ns) {
  const openers = [
    "BruteSSH.exe",
    "FTPCrack.exe",
    "relaySMTP.exe",
    "HTTPWorm.exe",
    "SQLInject.exe"
  ]

  var c = 0;
  openers.forEach((file) => {
    if (ns.fileExists(file, "home")) c++;
  })
  return c
}

export async function getPortFrom(ns, file) {
  const prog = ns.read(file).split("\n")
  const search = "export const USED_PORT = "
  for (let i = 0; i < prog.length; i++) {
    let line = prog[i]
    if (line.startsWith(search)) {
      return Number(line.replace(search, ""))
    }
  }
  return -99
}

export async function getChannelFrom(ns, file, varname) {
  const prog = ns.read(file).split("\n")
  const search = "export const USED_CHANNELS = "
  for (let i = 0; i < prog.length; i++) {
    let line = prog[i]
    if (line.startsWith(search)) {
      return eval(line.replace(search, "")).indexOf(varname) + 1
    }
  }
  return []
}

export async function getFileFrom(ns, port) {
  for (let script of ns.ls("home", ".js")) {
    let cPort = await getPortFrom(ns, script)
    if (cPort == -99) continue
    if (cPort == port) return script
  }
  return "";
}

/** @param {NS} ns */
export function clearPort(ns, port) {
  ns.getPortHandle(port).clear()
}

/** @param {NS} ns */
export function updateValueViaPortChannel(ns, port, channel, defaultValue) {
  const handle = ns.getPortHandle(port)
  if (handle.empty()) {
    return defaultValue
  }
  let rawValue = handle.peek()
  let c = rawValue.split(":---:")[0]
  let value = rawValue.split(":---:")[1]
  if (Number(c) != channel) {
    return defaultValue
  }
  ns.printf("\u001b[38;2;190;190;190m[DEBUG] Received value " + value + " on port " + port + " in channel " + c + ". Updating...")
  return value
}

// Make this more modular
export function scanTargetsUnfiltered(ns) {
  const max = 1000;
  const ignoreTargets = [
    "home",
    "darkweb",
    ...ns.getPurchasedServers()
  ]
  ignoreTargets.push(ns.getHostname())

  var doneHosts = []
  var scansOut = ["home"]
  var depth = 0
  while (true) {
    if (depth >= max) break
    let cHost = null
    for (let k = 0; k < scansOut.length; k++) {
      if (!(doneHosts.includes(scansOut[k]))) {
        cHost = scansOut[k]
        break
      }
    }
    let cScans = ns.scan(cHost)
    doneHosts.push(cHost)
    scansOut = scansOut.concat(cScans)
    depth++
  }

  var uniqScans = [...new Set(scansOut)];
  return uniqScans
}

export function scanTargets(ns) {
  const portOpeners = portOpenersCount(ns)
  const max = 1000;
  const ignoreTargets = [
    "home",
    "darkweb",
    ...ns.getPurchasedServers()
  ]
  ignoreTargets.push(ns.getHostname())

  var doneHosts = []
  var scansOut = ["home"]
  var depth = 0
  while (true) {
    if (depth >= max) break
    let cHost = null
    for (let k = 0; k < scansOut.length; k++) {
      if (!(doneHosts.includes(scansOut[k]))) {
        cHost = scansOut[k]
        break
      }
    }

    let cScans = ns.scan(cHost)
    for (let j = 0; j < cScans.length; j++) {
      if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(cScans[j])) {
        cScans.splice(j, 1)
        j--
        continue
      }
      if (portOpeners < ns.getServerNumPortsRequired(cScans[j])) {
        cScans.splice(j, 1)
        j--
        continue
      }
      if (ignoreTargets.includes(cScans[j])) {
        cScans.splice(j, 1)
        j--
        continue
      }
    }
    
    doneHosts.push(cHost)
    scansOut = scansOut.concat(cScans)
    depth++
  }

  var uniqScans = [...new Set(scansOut)];
  return uniqScans
}