/** @param {NS} ns */
export async function main(ns) {
  const server = ns.args[0];
  const n = ns.args[1];
  const mult = ns.args[2]

  for (let i = 0; i < n; i++) {
    ns.exec("/basic/weaken.js", server + "-" + i, 72817 * mult, "n00dles");
  }
}