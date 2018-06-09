import React, { Component } from 'react';
import Scroll from './Scroll';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('http://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {this.setState({robots: users})});
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value})
	}

	render() {
			const filteredRobots = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase());
		})
		return (
			<div className = 'tc'>
			  <h1 className='f1'>RoboFriends</h1>
			  <SearchBox searchChange = {this.onSearchChange}/>
			  <Scroll>
			  	<CardList robots = {filteredRobots} />
			  </Scroll>
		</div>
		);
    }
}

export default App;