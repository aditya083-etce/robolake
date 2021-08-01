import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';
// import SearchBox from '../components/SearchBox';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(responce => responce.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
        console.log(event.target.value);
    }

    render() {
        const { robots,searchfield} = this.state;
        const updatebots = robots.filter(bot => {
        return bot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ? 
        <h1 className = 'tc'>Loading...</h1> :
        (
            <div className = 'tc' >
                <h1 className = 'f2'>Robo Lake</h1>
                <div className = 'pd2'>
                    <input className='pa3 ba b--green bg-lightest-blue' 
                    type='search' 
                    placeholder='search bots'
                    onChange={this.onSearchChange} />
                </div>
                <Scroll>
                    <CardList robots={updatebots} /> 
                </Scroll>
            </div>
        );
    }
}

export default App;