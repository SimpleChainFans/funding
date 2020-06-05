import React, { Component } from 'react';
import { getFundingDetails, handleInvestFunc } from '../../eth/interation';
import CardList from '../common/CardList';
import web3 from "../../utils/initWeb3";

import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react';


class FaucetTab extends Component {

    state = {
        active:false,
        allFundingDetails: [],
        selectedFundingDetail:'',
    }

    async getAccount(pass) {
       return web3.eth.personal.newAccount(pass)

    }

    async takeTestCoin(to){
        let accounts = await web3.eth.getAccounts()

        return web3.eth.sendTransaction({from: accounts[0], to,value: 10*10**18,data:"",gas:100000});
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleGetAccount = async () => {
        this.setState({active:true})
        let { password} = this.state
        try {
            const customAccount = await this.getAccount(password)
            this.setState({customAccount})
            this.setState({active:false})
        } catch (error) {
            console.log(error)
            this.setState({active:false})
        }
    }

    handleInvest = async () => {
        this.setState({active:true})
        let { customAccount} = this.state
        await this.takeTestCoin(customAccount)
        try {
            this.setState({active:false})
        } catch (error) {
            console.log(error)
            this.setState({active:false})
        }
    }

    render() {
        let {customAccount, password} = this.state
        return (
            <div>
                <div>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleGetAccount}>
                            <Form.Input required type='text' placeholder='请输入密码' name='password'
                                        value={password} label='密码:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='获取账户' />
                        </Form>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input required type='text' name='customAccount'
                                        value={customAccount || ''} label='我的账户:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='获取测试币' />
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>


        )
    }
}

export default FaucetTab
