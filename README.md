其实很早就想做一个简化EOS操作的项目了，因为EOS探索过程遇到太多朋友咨询EOS编译问题，EOS更新导致操作错误问题。这还是那些有一定编程基础的伙伴，对于"小白"用户就更难了。昨天终于有时间实现了，用户只需通过npm一键安装js4eos,后面就可以通过js4eos玩转EOS生态了。且通过切换网络，可以很便捷的玩转其他EOS生态链。

# js4eos

js4eos is a Command Line javascript Application for EOS<br>
js4eos是一个javascript命令行程序, 包含一个可执行程序js4eos和npm库js4eos。可执行程序js4eos类似EOS的cleos, 完全一样的命令及参数传递方式，以命令行的方式执行EOS命令,一键安装即可立即使用，跨平台，极大降低了EOS使用操作的门槛。同时通过js4eos的npm库，js开发人员能非常简便的开发操作EOS。

# EOS“日常操作”用户

对于只是进行EOS日常操作(转账，调用action)的用户来说，只需安装js4eos执行程序即可。(ubuntu需要sudo)

```
npm install js4eos -g
```
然后就可以使用js4eos执行EOS cleos程序的操作，
比如
## 创建私钥
```
js4eos create key
```
## 转账

```
js4eos push action eosio.token transfer '["itleakstoken", "itleakstokem", "10.0000 EOS", "test"]' -p itleakstoken
```
## 其他接口
其他接口和EOS的cleos一模一样(包括参数名字传递方式)

## 新增的接口
js4eos config, 该接口用来设置系统配置，比如主网nodeos节点服务信息，网络chainid。通过该命令可以
切换EOS网络。
### 切到测试网络
比如从主网切到测试网络,只需更改chainid和url即可

```
js4eos config set --chainid=038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca --url=http://193.93.219.219:8888
```
### 切换到fibos
ENU, fibos修改了公钥前缀，因而需要通过keyprefix指定前缀
```
js4eos config  set --chainid=5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191 --url=http://se-rpc.fibos.io:8870 --keyprefix='FO'
```

# EOS javascript开发用户

```
npm install js4eos
```
然后参考js4eos库里的dev-demo.js使用js4eos

```
var Js4Eos = require('js4eos')
let info = await Js4Eos.getInfo();
Js4Eos.printJson(info)
let key = await Js4Eos.createKey();
```

# 文档查看(EOS网络切换文档)
目前js4eos支持主网，EosForce, 测试网络，ENU和FIBOS也在整理即将支持。切换网络就是修改chainid和httpEndpoint,具体操作详情请使用doc network命令查看

```
js4eos doc network
```

# 常用命令解读
下图的EOS请替换为具体网络的币符号
比如ENU网络替换为ENU，fibos替换为FO
## 生成公私钥
```
js4eos create key
```
## 导入私钥
```
js4eos wallet import xxxxx
```
导入私钥，才能执行该私钥对应的账号写操作，比如抵押CPU,NET等
## 创建账号
下面的EOS请使用上面的create key输出的公钥
```
js4eos system newaccount --stake-net "0.0000 EOS" --stake-cpu "0.0000 EOS" --buy-ram-kbytes 3  createraccount somenewaccount EOSxxxxx... EOSxxxxx... -p createraccount
```
## 查询账号
```
js4eos get account youraccount
```
## 购买RAM
```
js4eos system buyram payer receiver "0.0001 EOS"
```
## 出售RAM
```
js4eos system sellram payer bytes
```
## 抵押CPU,NET
```
js4eos system delegatebw payer receiver "0.0000 EOS" "0.1000 EOS"
```
第一个(0.0000 EOS)是net抵押量,第二个(0.1000 EOS)是cpu抵押量
你必须有payer账号的操作权限
## 取消抵押
```
js4eos system undelegatebw payer receiver "0.0000 EOS" "0.1000 EOS"
```
第一个(0.0000 EOS)是net抵押量,第二个(0.100 EOS)是cpu抵押量
你必须有payer账号的操作权限

## 部署合约
```
js4eos set contract xxx/xxx/contract_name
```
contract_name目录下需要有contract_name.abi和contract_name.wasm两个文件