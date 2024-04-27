/** @param {NS} ns */
export async function main(ns) {
  const name = "farmer"
  const count = ns.args[0]    // Each is $7_208_960_000 for mult 1 in BN1
  const mult = ns.args[1] || 1
  const ram = Math.floor(131072 * mult)
  const formatNums = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 3
  })
  const keep_going = await ns.prompt(
    "Total cost will be " + formatNums.format(ns.getPurchasedServerCost(ram) * count) + ". Continue?",
    {
      type: "boolean"
    }
  )
  if (keep_going) {
    ns.exec("employ-servers.js", "home", 1, ram, count, name)
    ns.exec("farm/manual-farmer-starter.js", "home", 1, name + "-" + ram, count, mult)
  }
}