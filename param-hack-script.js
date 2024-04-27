/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0]
    const securityThresh = ns.getServerMinSecurityLevel(target) + 1;
    var i = 0

    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else {
            await ns.hack(target);
            i++
            if (i == 3) {
              await ns.grow(target);
              i = 0
            }
        }
    }
}