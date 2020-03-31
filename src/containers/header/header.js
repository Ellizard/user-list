import React from 'react'

const header = (props) => {
	return (
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
						className={`nav-item ${props.isList ? 'active' : null}`}
					>
						<button
							className="nav-link"
							onClick={props.showUsers}
						>
							All users
						</button>
					</li>
					<li
						className={`nav-item ${props.isNew ? 'active' : null}`}
					>
						<button
							className="nav-link"
							onClick={ props.createUser}
						>
							Create User
						</button>
					</li>
				</ul>
			</div>
		</nav>
	)
};

export default header;