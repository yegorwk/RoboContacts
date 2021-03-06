import React, { Component } from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';


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
		const {robots, searchField} = this.state;
			const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length ?
		<h1 className='tc'>Loading...</h1> :
		(
			<div className = 'tc'>
			  <h1 className='f1'>Robo Contact</h1>
			  <h3 className='f2' word-spacing='0.35em'>Find contact with your personal robot</h3>
			  <SearchBox searchChange = {this.onSearchChange}/>
			  <Scroll>
			  	<ErrorBoundary>
			  		<CardList robots = {filteredRobots} />
		  		</ErrorBoundary>
			  </Scroll>
		</div>
		);
    }
}

export default App;