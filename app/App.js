import React from 'react';
import ReactDOM from "react-dom";
import TradeView from './TradeView';
import "./app.css";
import { Button, ButtonToolbar } from "react-bootstrap";

const tradeList = ["btc_idr","bch_idr","eth_idr","etc_idr","ltc_idr","waves_idr","xrp_idr","xzc_idr","bts_btc","doge_btc","eth_btc","ltc_btc","nxt_btc","xrp_btc"];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category: "" };
        this.clickCategory = this.clickCategory.bind(this);
    }
    clickCategory(e) {
        this.setState({ category: e.target.value });
    }
    render() {
        let component;
        if (tradeList.indexOf(this.state.category) >= 0)
            component = <TradeView category={this.state.category}/>;
        else
            component = null;

        return (
            <div>
                <ButtonToolbar>
                    {tradeList.map((category, index) => (
                        <Button bsStyle={"default"} onClick={this.clickCategory} value={category} key={index} active={category===this.state.category}>
                            {category}
                        </Button>
                    ))}
                </ButtonToolbar>
                {component}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));