import { pingNfty } from "/lib/_utils.js"

/** @param {NS} ns */
export async function main(ns) {
  const title = ns.args[0] || "Bitburner"
  const text = ns.args[1] || "Sample message"
  const emoji = "computer"
  pingNfty("bitburner", title, text, emoji)
}