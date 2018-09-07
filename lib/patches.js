function fibos(eosjs)
{
	Object.assign(eosjs.modules.json.schema, {
		retire: {
			"base": "",
			"action": {
				"name": "retire",
				"account": "eosio.token"
			},
			"fields": {
				"quantity": "asset",
				"memo": "string"
			}
		},
		close: {
			"base": "",
			"action": {
				"name": "close",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"symbol": "symbol"
			}
		},
		excreate: {
			"base": "",
			"action": {
				"name": "excreate",
				"account": "eosio.token"
			},
			"fields": {
				"issuer": "account_name",
				"maximum_supply": "asset",
				"connector_weight": "float64",
				"maximum_exchange": "asset",
				"reserve_supply": "asset",
				"reserve_connector_balance": "asset"
			}
		},
		exunlock: {
			"base": "",
			"action": {
				"name": "exunlock",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"quantity": "extended_asset",
				"expiration": "time_point_sec",
				"memo": "string"
			}
		},
		exlocktrans: {
			"base": "",
			"action": {
				"name": "exlocktrans",
				"account": "eosio.token"
			},
			"fields": {
				"from": "account_name",
				"to": "account_name",
				"quantity": "extended_asset",
				"expiration": "time_point_sec",
				"memo": "string"
			}
		},
		exissue: {
			"base": "",
			"action": {
				"name": "exissue",
				"account": "eosio.token"
			},
			"fields": {
				"to": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
		extransfer: {
			"base": "",
			"action": {
				"name": "extransfer",
				"account": "eosio.token"
			},
			"fields": {
				"from": "account_name",
				"to": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
		exretire: {
			"base": "",
			"action": {
				"name": "exretire",
				"account": "eosio.token"
			},
			"fields": {
				"from": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
		exclose: {
			"base": "",
			"action": {
				"name": "exclose",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"symbol": "extended_symbol"
			}
		},
		exdestroy: {
			"base": "",
			"action": {
				"name": "exdestroy",
				"account": "eosio.token"
			},
			"fields": {
				"symbol": "extended_symbol"
			}
		},
		exchange: {
			"base": "",
			"action": {
				"name": "exchange",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"quantity": "extended_asset",
				"tosym": "extended_symbol",
				"memo": "string"
			}
		},
		ctxrecharge: {
			"base": "",
			"action": {
				"name": "ctxrecharge",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
		ctxextract: {
			"base": "",
			"action": {
				"name": "ctxextract",
				"account": "eosio.token"
			},
			"fields": {
				"owner": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
		ctxtransfer: {
			"base": "",
			"action": {
				"name": "ctxtransfer",
				"account": "eosio.token"
			},
			"fields": {
				"from": "account_name",
				"to": "account_name",
				"quantity": "extended_asset",
				"memo": "string"
			}
		},
	});
	return eosjs;
};

module.exports={
	FO:fibos,
}