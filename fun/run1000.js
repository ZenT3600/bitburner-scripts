/** @param {NS} ns */
export async function main(ns) {
  const depth = ns.args[0]
  if (depth >= 10) {
    return
  }
  ns.run(ns.getScriptName(), depth + 1)
  ns.run(ns.getScriptName(), depth + 1)
  await ns.sleep(20 * 1000)
}