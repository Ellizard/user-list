import './styles.scss';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

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
		console.log('create');
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
		const {name: name, position: position, age: age } = users[index];

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
			users:users,
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
			users:users,
			isEdit: false,
			isNew: false,
			isList: true,
		})
	};

	render() {

		// Navigation.
		let navigation = (
			<nav className="navbar justify-content-between navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">React user list: </a>
				<button className="navbar-toggler" type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse"
					 id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li
							className={`nav-item ${this.state.isList ? 'active' : null}`}
						>
							<button
								className="nav-link"
								onClick={this.showUsers}
							>
								All users
							</button>
						</li>
						<li
							className={`nav-item ${this.state.isNew ? 'active' : null}`}
						>
							<button
								className="nav-link"
								onClick={ this.createUser}
							>
								Create User
							</button>
						</li>
					</ul>
				</div>
			</nav>
		);

		// Manage variables for display.
		let users = null;
		let createUser = null;
		let editUser = null;
		let toggleView = null;

		// switch view button
		if (this.state.isList) {
			toggleView = <button
				className="btn btn-sm btn-outline-primary switch-view"
				onClick={this.changeView}
			>
				switch view
			</button>
		}

		// Show all users.
		if (this.state.isList) {

			if (this.state.viewAsCart) {
				users = this.state.users.map( (user, index) => {
					return (
						<div className="col-md-3" key={index}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{user.name}</h5>
									<p className="card-text">
										<strong>position: </strong>
										{user.position}
									</p>
									<p className="card-text">
										<strong>age: </strong>
										{user.age}
									</p>
									<button
										className="btn btn-primary"
										onClick={() => this.editUser(index)}
									>
										Edit
									</button>
									<button
										className="btn btn-danger"
										onClick={ () => this.deleteUser(index)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					)
				});
			} else {
				users = (
					<table className="table col-sm">
						<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Position</th>
							<th scope="col">Age</th>
							<th scope="col">Action</th>
						</tr>
						</thead>
						<tbody>

						{this.state.users.map( (user, index) => {
							return (
								<tr>
									<th scope="row">{index + 1}</th>
									<td>{user.name}</td>
									<td>{user.position}</td>
									<td>{user.age}</td>
									<td>
										<button
											className="btn btn-primary btn-sm"
											onClick={() => this.editUser(index)}
										>
											Edit
										</button>
										<button
											className="btn btn-danger btn-sm"
											onClick={ () => this.deleteUser(index)}
										>
											Delete
										</button>
									</td>
								</tr>
							)
						})}


						</tbody>
					</table>
				)
			}
		}

		// Create user.
		if (this.state.isNew) {
			createUser = (
				<form className="col-sm" onSubmit={this.saveNewUser}>
					<div className="form-group row">
						<label htmlFor="username"
							   className="col-sm-1 col-form-label-sm">Name</label>
						<div className="col-sm-11">
							<input type="text"
								   className=""
								  	name="name"
								   defaultValue=""
								   id="username"/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="position"
							   className="col-sm-1 col-form-label-sm">Position</label>
						<div className="col-sm-11">
							<input type="text"
								   name="position"
								   className=""
								   id="position"/>
						</div>
					</div>

					<div className="form-group row">
						<label htmlFor="userage"
							   className="col-sm-1 col-form-label-sm">Age</label>
						<div className="col-sm-11">
							<input type="text"
								   className=""
								   name="age"
								   id="userage"/>
						</div>
					</div>
					<div className="row">
						<input type="submit" value="Submit" />
					</div>
				</form>
			);
		}


		// Edit user.
		if (this.state.isEdit) {
			createUser = (
				<form className="col-sm" onSubmit={this.saveEditUser}>
					<div className="form-group row">
						<label htmlFor="username"
							   className="col-sm-1 col-form-label-sm">Name</label>
						<div className="col-sm-11">
							<input type="text"
								   className=""
								   name="name"
								   defaultValue={this.state.editValues.name}
								   id="username"/>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="position"
							   className="col-sm-1 col-form-label-sm">Position</label>
						<div className="col-sm-11">
							<input type="text"
								   name="position"
								   className=""
								   defaultValue={this.state.editValues.position}
								   id="position"/>
						</div>
					</div>

					<div className="form-group row">
						<label htmlFor="userage"
							   className="col-sm-1 col-form-label-sm">Age</label>
						<div className="col-sm-11">
							<input type="text"
								   className=""
								   name="age"
								   defaultValue={this.state.editValues.age}
								   id="userage"/>
						</div>
					</div>
					<div className="row">
						<input type="submit" value="Save changes" />
					</div>
				</form>
			);
		}

		return (
			<div className="container">
				{navigation}
				{toggleView}

				<div className="row">
					{users}
					{createUser}
					{editUser}
				</div>
			</div>
		)
	};
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<Users/>, domContainer);