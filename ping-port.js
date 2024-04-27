import { getPortFrom, getChannelFrom, getFileFrom } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  const port = Number.isInteger(ns.args[0]) ? ns.args[0] : await getPortFrom(ns, ns.args[0])
  const file = await getFileFrom(ns, port)
  const channel = Number.isInteger(ns.args[1]) ? ns.args[1] : await getChannelFrom(ns, file, ns.args[1])
  const value = ns.args[2]
  ns.getPortHandle(port).clear()
  ns.getPortHandle(port).write(channel + ":---:" + value)
  ns.tprint("Sent " + value + " over port " + port + " on channel " + channel)
}