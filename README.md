其实很早就想做一个简化EOS操作的项目了，因为EOS探索过程遇到太多朋友咨询EOS编译问题，EOS更新导致操作错误问题。这还是那些有一定编程基础的伙伴，对于"小白"用户就更难了。昨天终于有时间实现了，用户只需通过npm一键安装js4eos,后面就可以通过js4eos玩转EOS生态了。且通过切换网络，可以很便捷的玩转其他EOS生态链。

# js4eos

js4eos is a Command Line javascript Application for EOS<br>
js4eos是一个javascript命令行程序, 包含一个可执行程序js4eos和npm库js4eos。可执行程序js4eos类似EOS的cleos, 完全一样的命令及参数传递方式，以命令行的方式执行EOS命令,一键安装即可立即使用，跨平台，极大降低了EOS使用操作的门槛。同时通过js4eos的npm库，js开发人员能非常简便的开发操作EOS。

# 安装js4eos
```
npm install js4eos -g
```
然后就可以使用js4eos执行EOS cleos程序的相似操作，比如
ubuntu等linux OS上需要加上sudo
# 创建钱包
js4eos只支持一个钱包，钱包可以管理很多key(账号)
```
js4eos wallet create
```
# 解锁钱包
js4eos的钱包是加密的，解锁前必须输入创建钱包时输出的密码
```
js4eos wallet unlock
```
# 创建新账号
测试网络账号创建
```
js4eos config set -n jungle
js4eos faucet accountxxx
```
这个 accountxxx 为你想要创建的新账号， 必须是12个字符，每个字符只能是a-z，1-4<br>
主网等其他网络创建请切换到对应网络
```
js4eos config -n mainnet/kylin/fibos
js4eos faucet accountxxx
```
# 导入账号私钥
你要操作某个账号，必须导入该账号的私钥，导入私钥必须先解锁钱包
```
js4eos wallet unlock （然后输入钱包的密码）
js4eos wallet import keyxxx
```
keyxxx 为前面账号生成时输出的privateKey
# 编译智能合约
目前只支持单个文件的编译。
合约目录结构为xxx/xxx.cpp
## 编译wasm程序
```
cd xxx
js4eos compile -o xxx.wasm xxx.cpp
```
## 生成abi文件
```
js4eos compile -g xxx.abi xxx.cpp
```
编译完成后xxx目录下有xxx.cpp, xxx.abi, xxx.wasm三个文件
# 部署智能合约
```
js4eos set contract accountxxx xxx
```
xxx是上面合约的目录，里面必须包含xxx.wasm和xxx.abi两个文件

# 其他接口
其他接口和EOS的cleos一模一样(包括参数名字传递方式)，比如
## 创建私钥
```
js4eos create key
```
## 转账
```
js4eos push action eosio.token transfer '["itleakstoken", "itleakstokem", "10.0000 EOS", "test"]' -p itleakstoken
```
# 新增的接口
js4eos config, 该接口用来设置系统配置，比如主网nodeos节点服务信息，网络chainid。通过该命令可以切换EOS网络。]可通过下面的命令来切换到不同网络
## 切换不同EOS链
比如在测试网络jungle,kylin麒麟和主网之间切换
```
js4eos config set --network mainnet/kylin/jungle/enu/fibos
```

## 修改当前网络参数（比如chainid, httpend的url)
以下命令会更改当前网络的参数
```
js4eos config  set --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
## 切换网络，同时修改该网络的参数
下面命令就会切换到mainnnet网络并且修改该网络参数
```
js4eos config  set --network mainnet --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
## 同步网络信息
由于httpendpoint有时可能会失效，我们的服务器会不定时更新节点信息，所以本地需要时可以通过config sync来同步
```
js4eos config sync
```
# 文档查看(EOS网络切换文档)
目前js4eos支持主网，EosForce, 测试网络，ENU和FIBOS也在整理即将支持。切换网络就是修改chainid和httpEndpoint,具体操作详情请使用doc network命令查看

```
js4eos doc network
```
# 水龙头(创建第一个账号)
由于EOS操作的复杂性，任何一个EOS公链侧链账号注册是一个高门槛。因而js4eos配置了水龙头功能，只需执行js4eos faucet youraccount，"youraccount"为你要注册的新账号

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