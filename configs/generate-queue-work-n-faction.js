/** @param {NS} ns */
export async function main(ns) {
  const SPLIT = ":-:"
  const WORK = ns.args[0]
  const FACTION = ns.args[1]
  const FACTION_TYPE = ns.args[2]
  const DURATION = ns.args[3]
  let ARGS_REMAINING = []
  for (let i = 3; 3 < ns.args.length; i++) {
    ARGS_REMAINING.push(ns.args[i])
  }
  const EXTRA = ARGS_REMAINING.length > 0 ? SPLIT + ARGS_REMAINING.join(SPLIT) : ""
  var STEPS = 2 * Math.floor(DURATION / 60)
  var STEP_DURATION = DURATION / STEPS

  let queue_string = "NOTHING"
  let is_faction = false
  for (let i = 0; i < STEPS; i++) {
    if (is_faction) {
      queue_string += "\nFACTION-" + FACTION + SPLIT + FACTION_TYPE + SPLIT + STEP_DURATION + EXTRA
    }
    else {
      queue_string += "\nWORK-" + WORK + SPLIT + STEP_DURATION + EXTRA
    }
    is_faction = !is_faction
  }
  ns.write("configs/work-n-faction.generated.queue.txt", queue_string, "w")
}