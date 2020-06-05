import React, { Component } from 'react';
import { getFundingDetails, showRequests, approveRequest } from '../../eth/interation';
import CardList from '../common/CardList';
import RequestTable from '../common/RequestTable';
import {Button, Dimmer, Form} from 'semantic-ui-react';
import web3 from "../../utils/initWeb3";


class SupportFundingTab extends Component {

    state = {
        supportFundingDetails: [],
        selectedFundingDetail: '',
        requestsDeatils:[], //所有的花费请求
        customAccount: '',
        password: '',
        office: ''
    }

    async componentWillMount() {
        let supportFundingDetails = await getFundingDetails(3)
        console.table(supportFundingDetails)

        this.setState({
            supportFundingDetails,
            office: "官方参与项目"
        })
    }

    async getCustom() {
        console.log(899, this.state)
        const result = await web3.eth.personal.unlockAccount(this.state.customAccount, this.state.password, 10000)
        console.log(343, result)
        let supportFundingDetails = await getFundingDetails(3, this.state.customAccount)
        console.table(supportFundingDetails)

        this.setState({
            supportFundingDetails,
            office: `账户: ${this.state.customAccount} 参与项目`
        })
    }

    //传递一个回调函数给CardList，将所选择的card的详细信息返回来
    onCardClick = (selectedFundingDetail) => {
        console.log('ccccc:', selectedFundingDetail)
        this.setState({
            selectedFundingDetail: selectedFundingDetail
        })
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleShowRequests = async () => {
        let fundingAddress = this.state.selectedFundingDetail.fundingAddress
        try {
            let requestsDeatils =  await showRequests(fundingAddress)
            console.log('requestsDeatils:',requestsDeatils)
            this.setState({
                requestsDeatils:requestsDeatils
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleApprove = async (index) => {
        console.log('批准按钮点击',index)
        //1.指定合约地址
        //2.指定选择请求的index
        try {
            await approveRequest(this.state.selectedFundingDetail.fundingAddress,index, this.state.customAccount)
        } catch (error) {
            console.log(error)
        }
    }

    handleCustom = async (index) => {
        try {

            await this.getCustom()
        } catch (error) {
            console.log(error)
        }
    }
    render() {

        let {selectedFundingDetail,requestsDeatils, customAccount, password} = this.state
        return (
            <div>

                <Form onSubmit={this.handleCustom}>
                    <Form.Input required type='text' name='customAccount'
                                value={customAccount || ''} label='我的账户:'
                                labelPosition='left'
                                onChange={this.handleChange}>
                        <input/>
                    </Form.Input>
                    <Form.Input required type='text' placeholder='密码' name='password'
                                value={password} label='密码:'
                                labelPosition='left'
                                onChange={this.handleChange}>
                        <input/>
                    </Form.Input>
                    <Form.Button primary content='提交' />
                </Form>
                <h3>{this.state.office}</h3>
                <CardList details={this.state.supportFundingDetails} onCardClick={this.onCardClick}/>

                {
                    selectedFundingDetail && (<div>
                        <Button onClick={this.handleShowRequests}>申请详情</Button>
                        <RequestTable
                            requestsDeatils={requestsDeatils}
                            handleApprove={this.handleApprove}
                            pageKey={3}
                            investorsCount={selectedFundingDetail.investorsCount}
                            />
                    </div>)
                }
            </div>

        )
    }
}

export default SupportFundingTab
