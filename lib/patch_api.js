var Config = require("./config").getConfig()
var Patches = require("./patches")
module.exports = function(eosjs)
{
	Object.assign(eosjs.modules.json.schema, {
		//TODO:Add new API here for some special EOS eco
	});

	var ecc = eosjs.modules.ecc;

	function patchPubKey(pub_key) {
		let toString = pub_key.toString;
		pub_key.toString = (pubkey_prefix = Config.keyPrefix) => {
			var str = toString(pubkey_prefix);
			if (str === Config.keyPrefix + '859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM')
				return 'EOS859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM';
			return str;
		}

		return pub_key;
	}

	var privateToPublic = ecc.privateToPublic;
	ecc.privateToPublic = function (wif, pubkey_prefix = Config.keyPrefix) {
		return privateToPublic(wif, pubkey_prefix);
	}

	var PubKey = ecc.PublicKey;
	ecc.PublicKey = Q => {
		return patchPubKey(PubKey(Q));
	}

	var fromPoint = PubKey.fromPoint;
	PubKey.fromPoint = function (Q) {
		return patchPubKey(fromPoint(Q));
	};

	var fromBuffer = PubKey.fromBuffer;
	PubKey.fromBuffer = function (buffer) {
		return patchPubKey(fromBuffer(buffer));
	};

	var fromString = PubKey.fromString;
	PubKey.fromString = function (public_key, pubkey_prefix = Config.keyPrefix) {
		return fromString(public_key, pubkey_prefix);
	}

	var fromStringOrThrow = PubKey.fromStringOrThrow;
	PubKey.fromStringOrThrow = function (public_key, pubkey_prefix = Config.keyPrefix) {
		if (public_key === 'EOS859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM')
			public_key = Config.keyPrefix + '859gxfnXyUriMgUeThh1fWv3oqcpLFyHa3TfFYC4PK2HqhToVM';
		console.log("sjj0", ret)
		let ret = fromStringOrThrow(public_key, pubkey_prefix);
		// console.log("sjj", ret)
		return ret
	};
	let patchFunc = Patches[Config.keyPrefix]
	if (patchFunc) {
		eosjs = patchFunc(eosjs)
	}
	return eosjs;
};