/** @param {NS} ns */
export async function main(ns) {
    const ram = ns.args[0];
    const count = ns.args[1];
    const prefix = ns.args[2];
    const scripts = ns.ls("home", ".js");

    for (var i = 0; i < count; i++) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            let hostname = ns.purchaseServer(prefix + "-" + ram + "-" + i, ram);
            ns.scp(scripts, hostname)
        }
    }

    return 99
}