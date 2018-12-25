# js4eos

js4eos is a javascript Command Line  Application for EOS. All commands are same as cleos. You don't need to build eos or setup a eos docker.<br>
js4eos is also a Testing Framework for EOS Smart Contract just like truffle on ethereum<br>
<a href='https://github.com/itleaks/js4eos/blob/master/README_zh.md'>中文请点击这里</a>
# install js4eos
```
npm install js4eos -g
```
update node if there is a error when install js4eos
```
npm install -g npm
npm install -g node
```
you may add sudo in linux-based operation

# create wallet
create default wallet
```
js4eos wallet create
```
create another wallet
```
js4eos wallet create -n name
```
# unlock wallet
unlock wallet before any operation.<br>
You don't need to unlock again in 30 minutes.
```
js4eos wallet unlock
```
# create the first account
## jungle testnet
```
js4eos config set --network jungle
js4eos faucet accountxxx
```
accountxxx is the new account name，length 12, and must be 'a-z，1-5'<br>
you can switch to other network to create your first account
```
js4eos config set --network mainnet/kylin/fibos
js4eos faucet accountxxx
```
## import private key of account
you must import the private key of a account before using this account.
private key only exists in local ram, and only encrypted key saves to file.
```
js4eos wallet unlock （then please input password of wallet）
js4eos wallet import keyxxx
```
keyxxx is the private key of account you want to operate.
# compile contract

## compile wasm
this will run offline if there is a local compiler, or will run online.
```
cd xxx
js4eos compile -o xxx.wasm xxx.cpp
```
use compile2 if your code follows eosio.cdt rule.
```
js4eos compile2 -o xxx.wasm xxx.cpp
```
## generate abi
```
js4eos compile -g xxx.abi xxx.cpp
```
code with cdt rule
```
js4eos compile2 -g xxx.abi xxx.cpp --contract contractclass
```
you will find three files xxx.cpp, xxx.abi, xxx.wasm in folder 'xxx'
# buyram
hello contract needs almost 52k ram<br>
you can get free eos for your account in jungle network. <br>
http://jungle.cryptolions.io/#faucet <br>
then buyram for your account to deploy a contract
```
js4eos system buyram acountxxx acountxxx "10.0000 EOS"
```
must keep four decimal places. '.0000'
# deploy contract
```
js4eos set contract accountxxx xxx
```
ensure xxx.wasm and xxx.abi have already exist in folder 'xxx'

# other commands
all commands are same with that of cleos

# new apis
js4eos config
## switch network
for example, switch between mainnet/kylin/jungle/enu/fibos networks
```
js4eos config set --network mainnet/kylin/jungle/enu/fibos
```

## change chainid, httpendpoint
change chainid, httpendpoint of current network
```
js4eos config  set --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
## change chainid, httpendpoint, network
change network, and then change chainid, httpEndpoint of this network
```
js4eos config  set --network mainnet --chainid=aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906 --url=http://bp.cryptolions.io:8888
```
## sync configuration
We maintain well-work httpEndpoints, so you can sync the newest configuration file with below command.
```
js4eos config sync
```
## reset configuration
you may come across some issues, and then you can try reset configuration to fix it.
```
js4eos config reset
```
# view documents

```
js4eos doc network
```

# issues
update js4eos firstly with below command if you run into a problem.
```
npm install -g js4eos
```
Try below solutions if the issue is still not fixed.
## key problem
unlock wallet if encounter below problem.
```
missing key, check your keyprovider
```
you can reset wallet if the issue is still going.
```
js4eos wallet stop
js4eos wallet delete
js4eos wallet create
js4eos wallet import xxx
```
## network problem
check network or httpEndpoint if it is 'fetch error'
```
{ FetchError: request to
```
change httpEndpoint
```
js4eos config choose url
```
## compile issue
compile needs network if no local compiler
## how to do when have no idea
firstly,
reset config and sync config
```
#(ubuntu等需要sudo)
npm install -g js4eos@latest
js4eos config reset
js4eos config sync
```
secondly,
reset all if above solution not work
```
npm install -g js4eos@latest
js4eos reset
```
finally, restart you machine.Report a issue in github or contact wechat:itleaks
## windows compatible issue
Not recommended to use js4eos in mingwin or cygwin.Pleas use powershell or normal terminal of windows.
You may need to escape quote of a command.For example
```
js4eos push action eosio.token transfer '["youraccount", "account2", "1.0000 EOS", "test"]' -p youraccount
```
you need replace '"' to '""' in normal terminal
```
js4eos push action eosio.token transfer "[""youraccount"", ""account2"", ""1.0000 EOS"", ""test""]" -p youraccount
```
you need add '\' in PowerShell
```
js4eos push action eosio.token transfer '[\"youraccount\", \"account2\", \"1.0000 EOS\", \"test\"]' -p youraccount
```

<a href='https://blog.csdn.net/ITleaks/article/details/83651513'>vscode is recommendded</a>

# More commands
## create keys
```
js4eos create key
```
## import key
```
js4eos wallet import xxxxx
```
## create a new account
```
js4eos system newaccount --stake-net "0.0000 EOS" --stake-cpu "0.0000 EOS" --buy-ram-kbytes 3  createraccount somenewaccount EOSxxxxx... EOSxxxxx... -p createraccount
```
## transfer
```
js4eos push action eosio.token transfer '["itleakstoken", "itleakstokem", "10.0000 EOS", "test"]' -p itleakstoken
```
## get account info
```
js4eos get account youraccount
```
## buy ram
```
js4eos system buyram payer receiver "0.0001 EOS"
```
## sell RAM
```
js4eos system sellram payer bytes
```
## delegate CPU,NET
```
js4eos system delegatebw payer receiver "0.0000 EOS" "0.1000 EOS"
```
the first "0.0000 EOS" is network, and the second "0.1000 EOS" is cpu
## undelegate
```
js4eos system undelegatebw payer receiver "0.0000 EOS" "0.1000 EOS"
```

## deploy contract
```
js4eos set contract xxx/xxx/contract_name
```
contract_name.abi and contract_name.wasm must exist

## choose httpendpoint
httpendpoint may halt, and you can change to another endpoint.
```
$ js4eos config choose url
Choose one httpEndpoint for mainnet:
	*[0] http://bp.cryptolions.io:8888
	 [1] https://mainnet.genereos.io
	 [2] https://mainnet.meet.one
	 [3] http://mainnet.eoscalgary.io
please input[0~3]>
```
## choose network
```
$ js4eos config choose network
Choose one network:
	*[0] mainnet
	 [1] localnet
	 [2] eosforce
	 [3] jungle
	 [4] kylin
	 [5] enu
	 [6] fibos
please input[0~6]>
```
# Eos Testing framework
js4eos is also a testing framework
### initail a contract application
```
mkdir js4eos-dapp
cd js4eos-dapp
js4eos dapp init
or
// a version support IDE 'vscode'
js4eos dapp init -v vscode
```
### create contract
```
js4eos dapp create anewcontract
```
### compile contract
```
js4eos dapp compile hello
```
### deploy contract
```
js4eos dapp deploy hello
```
### test hello contract
Only test hello test units with option '-g'
'-g hi' means grep pattern 'hi' and then test
```
js4eos dapp test -g hi
```
test all test
```
js4eos dapp test
```
### Configure your dapp
Configuration of dapp is in file "js4eos_config.js"<br>
please modify this configuration to change deploy config such as deploy account.
# Contact
Feel free to add my wechat:itleaks<br>
<img src="https://raw.githubusercontent.com/itleaks/eos-contract/master/files/weixin.png" width=220 height=224 /><br>