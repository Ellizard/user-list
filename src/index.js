import React from 'react'
import ReactDOM from 'react-dom';

import './styles.scss';
import Header from './containers/header/header';
import CartBox from './containers/cart/cartBox/cartBox';
import CartTable from './containers/cart/cartTable/cartTable';
import UserForm from './containers/userForm/userForm';
import ToggleView from './containers/toggleView/toggleView'

'use strict';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			isNew: false,
			isList: true,
			viewAsCart: true,
			users: [
				{
					name: 'Artem',
					position: 'FE',
					age: 26,
				},
				{
					name: 'Taras',
					position: 'BE',
					age: 261,
				}
			],
			editValues: [
				{
					index: null,
					name: null,
					position: null,
					age: null
				}
			],
		};

	}

	// Show list of users.
	showUsers = () => {
		this.setState({
			isEdit: false,
			isNew: false,
			isList: true,
		})
	};

	// Show create user form.
	createUser = () => {
		this.setState({
			isEdit: false,
			isNew: true,
			isList: false,
		})
	};

	// Remove user.
	deleteUser = (index) => {
		const users = [...this.state.users];
		users.splice(index, 1);
		this.setState({
			users: users
		})
	};

	// Edit user.
	editUser = (index) => {
		const users = [...this.state.users];
		const editValues = [...this.state.editValues];

		// Get values from form
		const {name: name, position: position, age: age} = users[index];

		// Update and write new values.
		editValues.name = name;
		editValues.age = age;
		editValues.position = position;
		editValues.index = index;

		// Update state.
		this.setState({
			isEdit: true,
			isNew: false,
			isList: false,
			editValues: editValues
		})

	};

	saveNewUser = (event) => {
		event.preventDefault();

		// Get values from form.
		const {position: {value: position}, age: {value: age}, name: {value: name}} = event.target;

		// Get and update default user array.
		const users = [...this.state.users];
		users.push({
			name,
			position,
			age
		});

		// Update state.
		this.setState({
			users: users,
			isEdit: false,
			isNew: false,
			isList: true,
		})
	};

	// Change view.
	changeView = () => {
		const viewAsCart = this.state.viewAsCart;
		this.setState({
			viewAsCart: !viewAsCart
		})
	};

	// Save edited user.
	saveEditUser = (event) => {
		event.preventDefault();

		// Get values.
		const {position: {value: position}, age: {value: age}, name: {value: name}} = event.target;

		// Get current user index.
		const current = this.state.editValues.index;

		// Get all users array
		const users = [...this.state.users];

		// Update current user.
		users[current].name = name;
		users[current].position = position;
		users[current].age = age;

		// update state
		this.setState({
			users: users,
			isEdit: false,
			isNew: false,
			isList: true,
		})
	};

	render() {

		// Manage variables for display.
		let users = null;
		let userForm = null;

		// Show all users.
		if (this.state.isList) {

			if (this.state.viewAsCart) {
				users = this.state.users.map((user, index) => {
					return (
						<CartBox
							key={index}
							name={user.name}
							position={user.position}
							age={user.age}
							index={user.index}
							editUser={() => this.editUser(index)}
							deleteUser={() => this.deleteUser(index)}
						/>
					)
				});
			}

			if (!this.state.viewAsCart) {
				users = (
					<CartTable
						users={this.state.users}
						editUser={this.editUser}
						deleteUser={this.deleteUser}
					/>
				)
			}
		}


		if (this.state.isEdit) {
			userForm = (
				<UserForm
					editValues={this.state.editValues}
					action={this.saveEditUser}
					submitCopy="Edit current user"
				/>
			);
		}

		if (this.state.isNew) {
			userForm = (
				<UserForm
					action={this.saveNewUser}
					submitCopy="Save new user"
				/>
			);
		}

		return (
			<div className="container">
				<Header
					isList={this.state.isList}
					isNew={this.state.isNew}
					showUsers={this.showUsers}
					createUser={this.createUser}
				/>

				{this.state.isList ? <ToggleView changeView={this.changeView} /> : null}

				<div className="row">
					{users}
					{userForm}
				</div>
			</div>
		)
	};
}

let domContainer = document.getElementById('app');
ReactDOM.render(<Users/>, domContainer);