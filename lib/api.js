/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var fs = require("fs");
var EosHelper = require('./eoshelper');

function getAsset(assetStr) {
    if (!assetStr) {
        return null
    }
    let tmps = assetStr.split(" ")
    return {
        amount:tmps[0],
        symbol:tmps.length > 1 ? tmps[1] : null
    }
}

function printJson(data) {
    if (data) {
        console.log(JSON.stringify(data, null, 4))
    }
}

exports.printJson = printJson;

exports.getInfo = async function() {
    try {
        let ret = await EosHelper.EOS.getInfo({});
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getBlock = async function(height) {
    try {
        let ret = await EosHelper.EOS.getBlock(height);
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getTransaction = async function(txHash) {
    try {
        let ret = await EosHelper.EOS.getTransaction(txHash);
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getAccount = async function(account) {
    try {
        let ret = await EosHelper.EOS.getAccount("" + account);
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getAbi = async function(contract_name) {
    try {
        let ret = await EosHelper.EOS.getAbi("" + contract_name);
        return ret;
    } catch (e) {

    }
    return null;
}

exports.getCurrencyBalance = async function(contract, account, symbol) {
    try {
        let ret = await eos.getCurrencyBalance("" + contract, "" + account, symbol ? symbol : null)
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getCurrencyStats = async function(contract, symbol) {
    try {
        let ret = await eos.getCurrencyStats("" + contract, symbol)
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.getTable = async function(contract_name, scope, table) {
    try {
        let ret = await EosHelper.EOS.getTableRows(true, "" + contract_name, scope, table);
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.setContract = async function(account, dir) {
    let arr = dir.split('/');
    let last = arr[arr.length-1] || arr[arr.length-2];
    let wasm = fs.readFileSync(dir + "/" + last + ".wasm");
    let abi = fs.readFileSync(dir + "/" + last + ".abi");

    try {
        await EosHelper.EOS.setcode(account, 0, 0, wasm);
        let ret = await EosHelper.EOS.setabi(account, JSON.parse(abi));
        return ret;
    } catch (e) {
        console.log(e)
    }
    return null;
}

exports.pushAction = async function(contract_name, action, data, actor, permission) {
    try {
        let tr = await EosHelper.EOS.transaction(
            {
                actions: [
                    {
                        account: "" + contract_name,
                        name: action,
                        authorization: [{
                          actor: "" + actor,
                          permission: permission
                        }],
                        data,
                    }
                ]
            }
        )
        return tr;
    } catch(e) {
        console.log(e)
    }
    return null
}

function parseActor(actorStr) {
    if (!actorStr) {
        return
    }
    let tmps = actorStr.split('@')
    return {
        actor:tmps[0],
        permission:tmps.length > 1 ? tmps[1] : 'active'
    }
}

exports.pushRawAction = async function(contractName, actionName, dataStr, actorStr) {

    let ret = await this.getAbi(contractName)
    if (!ret || !ret.abi) {
        console.log("invalid contract")
        return;
    }
    let abi = ret.abi
    let actionType = null;
    for (let action of abi.actions) {
        if (action.name == actionName) {
            actionType = action.type
            break
        }
    }
    if (!actionType) {
        console.log("action", actionName, "not found")
        return;
    }

    let fields = null;
    for (let struct of abi.structs) {
        if (struct.name == actionType) {
            fields = struct.fields;
            break;
        }
    }

    let dataInfo = JSON.parse(dataStr)
    let data = {}
    for(let i=0; i<fields.length; i++) {
        data[fields[i].name] = "" + dataInfo[i]
    }

    let actor = parseActor(actorStr)
    ret = await this.pushAction(contractName, actionName, data, actor.actor, actor.permission)
    return ret;
}

exports.exchange = async function(contract, account, quantity, actorStr) {
    console.log(contract, account, quantity, actorStr)
    var ctx = await EosHelper.EOS.contract(contract);
    console.log(ctx.exchange)
    try {
    let ret = await ctx.exchange(account, "" + quantity, "0.0000 FO@eosio", "exchange EOS to FO", {
        authorization: account
    });
    return ret;
}catch(e) {
    console.log(e)
}
}

exports.delegatebw = async function(from, receiver, stake_net_quantity, stake_cpu_quantity, transfer, actorStr) {
    let data = {
        from,
        receiver,
        stake_net_quantity,
        stake_cpu_quantity,
        transfer
    }
    //TODO:
    let actorInfo = parseActor()
    if (!actorInfo) {
        actorInfo = {}
        actorInfo.actor = from
        actorInfo.permission = 'active'
    }
    let ret = await this.pushAction('eosio', 'delegatebw', data, actorInfo.actor, actorInfo.permission)
    return ret;
}

exports.undelegatebw = async function(from, receiver, unstake_net_quantity, unstake_cpu_quantity, actorStr) {
    let data = {
        from,
        receiver,
        unstake_net_quantity,
        unstake_cpu_quantity,
    }
    let actorInfo = parseActor()
    if (!actorInfo) {
        actorInfo = {}
        actorInfo.actor = from
        actorInfo.permission = 'active'
    }
    let ret = await this.pushAction('eosio', 'undelegatebw', data, actorInfo.actor, actorInfo.permission)
    return ret;
}

exports.buyRam = async function(payer, receiver, ramEos) {
    // console.log(payer, receiver, ramEos)
    try {
        let tr = await EosHelper.EOS.transaction(eos =>
            {
                eos.buyram({
                    payer: payer,
                    receiver: receiver,
                    quant: ramEos,
                })
            }
        )
        return tr;
    } catch (e) {
        console.log("fail", e)
    }
}

exports.sellRam = async function(account, ramBytes) {
    try {
        let tr = await EosHelper.EOS.transaction(eos =>
            {
                eos.sellram({
                    account,
                    bytes: ramBytes
                })
            }
        )
        return tr;
    } catch (e) {
        console.log("fail", e)
    }
}

exports.newAccount = async function(creator, name, ownerkey, activeKey, stake_net_quantity, stake_cpu_quantity, ramEos, ramBytes, transfer) {
    try {
        let tr = await EosHelper.EOS.transaction(eos =>
            {
                eos.newaccount({
                    creator: creator,
                    name: name,
                    owner: ownerkey,
                    active: activeKey
                })
                if (ramEos) {
                    eos.buyram({
                        payer: creator,
                        receiver: name,
                        quantity: ramEos,
                    })
                } else if (ramBytes) {
                    eos.buyrambytes({
                        payer: creator,
                        receiver: name,
                        bytes: ramBytes
                    })
                }
                if (stake_net_quantity && stake_cpu_quantity) {
                    let netAsset = getAsset(stake_net_quantity)
                    if (!netAsset || !netAsset.symbol) {
                        console.log("Invalid net asset")
                        return;
                    }
                    let cpuAsset = getAsset(stake_cpu_quantity)
                    if (!cpuAsset || !cpuAsset.symbol) {
                        console.log("Invalid cpu asset")
                        return;
                    }
                    if (netAsset.amount > 0 || cpuAsset.amount > 0) {
                        eos.delegatebw({
                            from: creator,
                            receiver: name,
                            stake_net_quantity,
                            stake_cpu_quantity,
                            transfer
                        })
                    }
                }
            }
        )
        return tr;
    } catch (e) {
        console.log("fail", e)
    }
    return null
}
