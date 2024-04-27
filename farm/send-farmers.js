/** @param {NS} ns */
export async function main(ns) {
  const FARMER_PREFIX = "farmer-"
  const FILE = ns.args[0]
  ns.getPurchasedServers().forEach((s) => {
    if (!s.startsWith(FARMER_PREFIX)) return
    ns.scp(FILE, s)
  })
}