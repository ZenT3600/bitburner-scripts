/** @param {NS} ns */
export async function main(ns) {
  const keep_going = await ns.prompt(
    "Dangerous script! Continue?",
    {
      type: "boolean"
    }
  )
  if (keep_going) {
    ns.clearPort(Number(ns.args[0]))
  }
}