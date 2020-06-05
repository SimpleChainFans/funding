import React from 'react';
import { Tab } from 'semantic-ui-react';
import AllFundingTab from './allFundingTab/AllFundingTab';
import SupportFundingTab from "./supporterFundingTab/SupportFundingTab";
import CreatorFundingTab from "./creatorFundingTab/CreatorFundingTab";

const panes = [
    { menuItem: '众筹项目', render: () => <Tab.Pane><AllFundingTab /></Tab.Pane> },
    { menuItem: '发起众筹', render: () => <Tab.Pane><CreatorFundingTab /></Tab.Pane> },
    { menuItem: '参与项目', render: () => <Tab.Pane><SupportFundingTab/> </Tab.Pane> },
]

const TabCenter = () => <Tab panes={panes} />

export default TabCenter

