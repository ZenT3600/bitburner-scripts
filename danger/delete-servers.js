/** @param {NS} ns */
export async function main(ns) {
  const keep_going = await ns.prompt(
    "Dangerous script! Continue?",
    {
      type: "boolean"
    }
  )
  if (keep_going) {
    ns.getPurchasedServers().forEach((server) => {
      ns.killall(server)
      ns.deleteServer(server)
    })
  }
}