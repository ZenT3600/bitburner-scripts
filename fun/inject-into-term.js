/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL")
  const TYPE = ns.args[0]
  const DATA = ns.args[1]
  const EXTRA = ns.args[2]
  switch (TYPE) {
    case "img":
      await injectRaw("<img src='" + DATA + "'>", null)
      break
    case "txt":
      await injectRaw("<p style='color: white'>" + DATA + "</p>", null)
      break
    case "raw":
      await injectRaw(DATA, EXTRA)
      break
    default:
      break
  }
}

async function injectRaw(HTML, EXTRA) {
  const doc = eval("document")
  const term = doc.getElementById("terminal")
  if (!EXTRA) {
    term.insertAdjacentHTML("beforeend", "<li>" + HTML + "</li>")
  } else if (EXTRA == "full-terminal") {
    term.outerHTML = HTML
  }
}