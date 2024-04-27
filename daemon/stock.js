// Built upon u/pwillia7 's stock script.
// u/ferrus_aub stock script using simple portfolio algorithm.
/** @param {NS} ns **/
import { updateValueViaPortChannel, clearPort, tryStartOnManager } from "/lib/_utils.js"

export const USED_PORT = 2
export const USED_CHANNELS = ["KEEP_MONEY"]

export async function main(ns) {
    if (tryStartOnManager(ns, ns.getHostname())) return
    var maxSharePer = 1.00
    var stockBuyPer = 0.60
    var stockVolPer = 0.05
    var moneyKeep = 1000000000  // $1b
    var minSharePer = 5

    while (true) {
        ns.disableLog('disableLog');
        ns.disableLog('sleep');
        ns.disableLog('getServerMoneyAvailable');
        moneyKeep = Number(updateValueViaPortChannel(ns, USED_PORT, 1, moneyKeep))
        clearPort(ns, USED_PORT)
        var stocks = ns.stock.getSymbols()
        for (const stock of stocks) {
            var position = ns.stock.getPosition(stock);
            if (position[0]) {
                //ns.print('Position: ' + stock + ', ')
                sellPositions(stock);
            }
            buyPositions(stock);
        }
        ns.printf('Cycle Complete');
        await ns.sleep(6000);
    }
    function buyPositions(stock) {
        var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[0];
        var askPrice = ns.stock.getAskPrice(stock);
        var forecast = ns.stock.getForecast(stock);
        var volPer = ns.stock.getVolatility(stock);
        var playerMoney = ns.getServerMoneyAvailable('home');
        
        if (forecast >= stockBuyPer && volPer <= stockVolPer) {
            if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock,minSharePer, "Long")) {
                var shares = Math.min((playerMoney - moneyKeep - 100000) / askPrice, maxShares);
                ns.stock.buyStock(stock, shares);
                //ns.print('Bought: '+ stock + '')
            }
        }      
    }
    function sellPositions(stock) {
        var forecast = ns.stock.getForecast(stock);
        if (forecast < 0.5) {
            ns.stock.sellStock(stock, position[0]);
            //ns.print('Sold: '+ stock + '')
        }
    }
}