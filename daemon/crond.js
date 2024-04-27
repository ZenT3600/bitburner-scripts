import { updateValueViaPortChannel, clearPort, tryStartOnManager } from "/lib/_utils.js"

export const USED_PORT = 5
export const USED_CHANNELS = ["UPDATE_CONF"]

var TIMINGS = 0
var COUNTERS = []
var COUNTERS_BASE = []

function calcMcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return calcMcd(b, a % b);
  }
}

function calcMcdN(nums) {
  let mcd = nums[0]
  for (let i = 1; i < nums.length; i++) {
    mcd = calcMcd(mcd, nums[i])
  }
  return mcd
}

function calculateTimings(conf) {
  let NUMS = []
  for (let LINE of conf) {
    NUMS.push(Number(LINE.replace("\r", "").split(":")[0]))
  }
  return calcMcdN(NUMS)
}

function calculateCounters(conf, timings) {
  for (let LINE of conf) {
    let DATA = LINE.replace("\r", "").split(":")
    COUNTERS.push([Math.floor(Number(DATA[0]) / timings), DATA[1]])
  }
  COUNTERS_BASE = [...COUNTERS]
}

/** @param {NS} ns */
async function readConfig(ns, file) {
  let conf = ns.read(file).split("\n")
  TIMINGS = calculateTimings(conf)
  calculateCounters(conf, TIMINGS)
  return conf
}

/** @param {NS} ns */
export async function main(ns) {
  const CONFIG_FILE = ns.args[0] || "configs/crontab.txt"
  await readConfig(ns, CONFIG_FILE)

  while (true) {
    if (updateValueViaPortChannel(ns, USED_PORT, 1, null)) {
      await readConfig(ns, CONFIG_FILE)
    }
    clearPort(ns, USED_PORT)
    for (let i = 0; i < COUNTERS.length; i++) {
      let INSTRUCTION = COUNTERS[i]
      COUNTERS[i][0] = INSTRUCTION[0] - 1
      if (INSTRUCTION[0] - 1 == 0) {
        ns.run(INSTRUCTION[1])
        COUNTERS[i][0] = COUNTERS_BASE[i][0]
      }
    }

    if (TIMINGS > 0) {
      await ns.sleep(TIMINGS * 1000)
    } else {
      await ns.sleep(1000)
    }
  }  
}