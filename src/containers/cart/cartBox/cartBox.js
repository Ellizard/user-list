import React from 'react'

const cartBox = (props) => {
	return (
		<div className="col-md-3">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.name}</h5>
					<p className="card-text">
						<strong>position: </strong>
						{props.position}
					</p>
					<p className="card-text">
						<strong>age: </strong>
						{props.age}
					</p>
					<button
						className="btn btn-primary"
						onClick={() => props.editUser(props.index)}
					>
						Edit
					</button>
					<button
						className="btn btn-danger"
						onClick={ () => props.deleteUser(props.index)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default cartBox;