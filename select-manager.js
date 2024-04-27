/** @param {NS} ns */
export async function main(ns) {
  const newManager = ns.args[0]
  if (ns.fileExists("configs/current-manager.txt")) {
    let oldManager = ns.read("configs/current-manager.txt")
    ns.killall(oldManager)
  }
  ns.killall(newManager)
  ns.write("configs/current-manager.txt", newManager, "w")
}