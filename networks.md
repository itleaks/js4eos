# 简述
其实最开始设计是直接将这些配置都放在config文件里，然后通过js4eos switch network name的方式来切换，但是考虑到httpEndpoint的不稳定性和网络切换误操作问题，还是通过显示的命令执行来更改网络更为稳妥。

# 主网(mainnet)

```
js4eos config  set --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```

# Eos原力(Eosforce)
```
js4eos config  set --chainid=bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b --url=http://47.97.115.84:8888
```


# jungle测试网络(jungle testnet)

```
js4eos config  set --chainid=038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca --url=http://193.93.219.219:8888
```

# ENU牛油果(整理中)
# FIBOS（整理中)

