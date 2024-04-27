/** @param {NS} ns */
export async function main(ns) {
  const PREFIX = ns.args[0]
  const FOLDER = ns.args[1]
  ns.ls("home", PREFIX).forEach((file) => {
    const newFile = file.replace(PREFIX, FOLDER + "/")
    ns.mv("home", file, newFile)
  })
}