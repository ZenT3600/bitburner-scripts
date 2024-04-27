/** @param {NS} ns */
export async function main(ns) {
    const ram = ns.args[0];
    ns.tprint(ns.getPurchasedServerCost(ram));
}