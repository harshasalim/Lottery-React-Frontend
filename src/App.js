import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

//To get something from the contract on Blockchain
//Let the component render
//define componentDidMount lifecycle method and in it call methods on the contract
//then set the component level state with retrieved data
//If you are using metamask not necessary to specify the from value of sender who calls transaction - by default the first account in metamask

class App extends React.Component {
  //Refactor similar to constructor state initialization
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    //Ensure that the form does not attempt to call itself
    event.preventDefault();

    //Send a transaction to the enter function in the contract 

    //Since the transaction takes time show this message till it is complete
    this.setState({ message: 'Waiting on transaction success...'});

    //While retrieveing info was possible without mentioning the from property, for sending transactions its not possible.
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei( this.state.value, 'ether')
    });

    //After successful transaction, change message
    this.setState({ message: 'You have been entered!' });

  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'});

    await lottery.methods.pickWinner().send({
      from : accounts[0]
    });

    this.setState({ message: 'A winner has been picked'});

  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}. There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
        
        <hr />

        <form onSubmit = { this.onSubmit }>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              onChange = {event => this.setState({ value: event.target.value })}
              value = { this.state.value }
              />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick = { this.onClick } >Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;