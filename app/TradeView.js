import React from 'react';
import "./app.css";
import { Table } from "react-bootstrap";

// Parent Component
class TradeView extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            tradesList: [],
            style: "color-change"
        };
        this.resultChanged = this.resultChanged.bind(this);
    }

    resultChanged() {
        this.setState((prevState, props) => ({ style: (prevState.style === "color-change")? "color-change2" : "color-change" }));
    }

    componentDidMount(){
        fetchTradeList(this.props.category, (responseData) => this.setState({ tradesList: responseData }), this.resultChanged);
        this.timerID = setInterval(
            () => fetchTradeList(this.props.category, (responseData) => this.setState({ tradesList: responseData }), this.resultChanged),
            10000
        );
    }

    componentWillReceiveProps(nextProps) {
        fetchTradeList(nextProps.category, (responseData) => this.setState({ tradesList: responseData }), this.resultChanged);
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => fetchTradeList(nextProps.category, (responseData) => this.setState({ tradesList: responseData }), this.resultChanged),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let tradesList = this.state.tradesList.map((trade, index) => (<Total key={trade.date} trade={trade} style={this.state.style}/>));

        return (
            <div>
                <Table className="table table-striped table-responsive">
                    <thead>
                    <tr>
                        <th>date</th>
                        <th>buy</th>
                        <th>sell</th>
                        <th>count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tradesList}
                    </tbody>
                </Table>
                <p>GMT+07:00 Indonesia Western Time</p>
                <p>Initial Record: October 15th 2017, 3:00am GMT+7</p>
            </div>
        );
    }
}

class Total extends React.Component {
    render() {
        return (
            <tr className={this.props.style}>
                <td>{this.props.trade.date}</td>
                <td>{this.props.trade.buy}</td>
                <td>{this.props.trade.sell}</td>
                <td>{this.props.trade.count}</td>
            </tr>
        );
    }
}

let fetchTradeList = (category, callback, styleCallback) => {
    fetch(`/daily_trades/${category}`,{
        method: 'get',
        dataType: 'json',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status === 200) {
                styleCallback();
            }
            return response.json();
        })
        .then((responseData) => {
            callback(responseData);
        })
        .catch((error)=>{
            console.log('Error fetching btc_idr',error);
        });
};

export default TradeView;