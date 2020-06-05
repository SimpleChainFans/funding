import React, { Component } from 'react';
import web3 from './utils/initWeb3'
//导出时如果不用default，需要用{}结构
import {fundingFactoryInstance} from './eth/fundingFactoryInstance'
import TabCenter from "./display/TabCenter";

class App extends Component {
    constructor(){
        super()
        this.state = {
            currentAccount:'',
        }

    }
    async componentWillMount(){
        let accounts = await web3.eth.getAccounts()
        console.log('accounts:',accounts)

        let platformManager = await fundingFactoryInstance.methods.platformManager().call()
        console.log('Manager',platformManager)

        this.setState({currentAccount:accounts[0]})
    }

    render() {
        return (
            <div>
                <h1>众筹平台</h1>
                <h3>当前为测试平台，以下请领用测试账户</h3>
                <TabCenter/>
            </div>

        );
    }

}

export default App;
