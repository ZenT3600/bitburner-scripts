import { updateValueViaPortChannel, clearPort, tryStartOnManager } from "/lib/_utils.js"

export const USED_PORT = 1
export const USED_CHANNELS = ["KEEP_MONEY", "STOP_AT_PROFIT"]

// https://stackoverflow.com/a/55332581
function keyByLowestValue(obj) {
  var [lowestItems] = Object.entries(obj).sort(([ ,v1], [ ,v2]) => v1 - v2);
  return lowestItems[0]
}

/** @param {NS} ns */
function getTotalHacknetProfit(ns) {
  let count = 0
  for (let i = 0; i < ns.hacknet.numNodes(); i++) {
    count += ns.hacknet.getNodeStats(i).production
  }
  return count
}

/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL")
  if (tryStartOnManager(ns, ns.getHostname())) return
  // const SLEEP_DELAY = 3 * 1000 // Default
  const SLEEP_DELAY = 0           // Scary! don't do this unless you're sure!
  var KEEP_MONEY = 10_000_000  // 10m
  var STOP_AT_PROFIT = 1_250_000  // 1.25m

  let last_print_was_sleep = false
  while (true) {
    await ns.sleep(SLEEP_DELAY + 100)
    KEEP_MONEY = Number(updateValueViaPortChannel(ns, USED_PORT, 1, KEEP_MONEY))
    STOP_AT_PROFIT = Number(updateValueViaPortChannel(ns, USED_PORT, 2, STOP_AT_PROFIT))
    clearPort(ns, USED_PORT)
    if (getTotalHacknetProfit(ns) >= STOP_AT_PROFIT) {
      break
    }

    let node_count = ns.hacknet.numNodes()
    let upgrade_map = {}
    upgrade_map["buy-0"] = ns.hacknet.getPurchaseNodeCost()
    for (let i = 0; i < node_count; i++) {
      upgrade_map["level-" + i] = ns.hacknet.getLevelUpgradeCost(i)
      upgrade_map["ram-" + i] = ns.hacknet.getRamUpgradeCost(i)
      upgrade_map["core-" + i] = ns.hacknet.getCoreUpgradeCost(i)
    }
    let most_profitable_move = keyByLowestValue(upgrade_map)
    let available_money = ns.getPlayer().money - KEEP_MONEY
    if (upgrade_map[most_profitable_move] > available_money) {
      if (!last_print_was_sleep) {
        ns.printf("WARN Not enough money to perform the upgrade...")
        last_print_was_sleep = true
      }
      continue
    }

    let split = most_profitable_move.split("-")
    let action = split[0]
    let node = split[1]
    let human_readable_move = "TRANSLATION ERROR"
    if (split[0] == "buy") {
      human_readable_move = "Buying a new node"
    } else {
      human_readable_move = "Upgrading " + action + " on node " + node
    }
    ns.printf("INFO Proceeding with the most profitable move of " + human_readable_move)
    last_print_was_sleep = false

    switch (action) {
      case "buy":
        ns.hacknet.purchaseNode()
        break;
      case "level":
        ns.hacknet.upgradeLevel(node)
        break;
      case "ram":
        ns.hacknet.upgradeRam(node)
        break;
      case "core":
        ns.hacknet.upgradeCore(node)
        break;
      default:
        ns.printf("ERROR Something went wrong performing the upgrade!")
        last_print_was_sleep = false
        break;
    }
  }
  ns.printf("INFO Exit case reached.")
}