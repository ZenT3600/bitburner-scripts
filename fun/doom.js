/** @param {NS} ns */
export async function main(ns) {
  const doc = eval("document")
  await ns.run("fun/inject-into-term.js", 1, "raw", '<iframe style="height: 100%" id="jsdos" frameborder="0" src="https://dos.zone/player/?bundleUrl=https://cdn.dos.zone/custom/dos/doom.jsdos&anonymous=1" allowfullscreen></iframe>', "full-terminal")

  eval("window").addEventListener("message", (e) => {
    if (e.data.message === "dz-player-exit") {
      doc.getElementById("jsdos").style.display = "none";
    }
  })
  while (true) {
    await ns.asleep(1000)
  }
}