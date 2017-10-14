import React from 'react';
import 'whatwg-fetch';

// Parent Component
class Hello extends React.Component {
	constructor(){
		super(...arguments);
		this.state = {
			btc_idr:[]
		};
	}

	componentDidMount(){
		fetch('/btc_idr',{
			method: 'get',
			dataType: 'json',
			headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({btc_idr: responseData});
		})
		.catch((error)=>{
			console.log('Error fetching btc_idr',error);
		});
	}
	render() {
		let mans = this.state.btc_idr.map( (btc_idr) => {
			return <Total
					totalSell={btc_idr.totalSell}
					totalBuy={btc_idr.totalBuy}
					{...btc_idr}/>
		});

		return (
			<div>
				<h1>CalyFactory Developers</h1>
				<ul>
				{mans}
				</ul>
			</div>
		);
	}
}

// Child Component
class Total extends React.Component {
	render() {
		return (
			<div>
			<li>
				{`totalSell: ${this.props.totalSell}`}
			</li>
			<li>
				{`'totalBuy: ${this.props.totalBuy}`}
			</li>
			</div>
		);
	}
}
export default Hello;