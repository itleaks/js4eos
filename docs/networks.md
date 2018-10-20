# 切换网络
可通过下面的命令来切换到不同网络
```
js4eos config set --network mainnet/kylin/jungle/enu/fibos 
```

# 修改当前网络参数（比如chainid, httpend的url)
以下命令会更改当前网络的参数
```
js4eos config  set --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
# 切换网络，同时修改该网络的参数
下面命令就会切换到mainnnet网络并且修改该网络参数
```
js4eos config  set --network mainnet --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
# 同步网络信息
由于httpendpoint有时可能会失效，我们的服务器会不定时更新节点信息，所以本地需要时可以通过config sync来同步
```
js4eos config sync
```