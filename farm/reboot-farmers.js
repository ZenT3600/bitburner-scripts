/** @param {NS} ns */
export async function main(ns) {
  const FARMER_PREFIX = "farmer-"
  var weaken_not_grow = true
  ns.getPurchasedServers().forEach((s) => {
    if (!s.startsWith(FARMER_PREFIX)) return
    let mult = ns.getServerMaxRam(s) / 131072
    ns.killall(s)
    ns.exec(weaken_not_grow ? "/basic/weaken.js" : "/basic/grow.js", s, 72817 * mult, "foodnstuff");
    weaken_not_grow = !weaken_not_grow
  })
}