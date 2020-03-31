import React from 'react'
import CartRow from './cartRow/cartRow';

const cartTable = (props) => {
	return (
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
			{props.users.map( (user, index) => {
				return (
					<CartRow
						key={index}
						index={index}
						name={user.name}
						position={user.position}
						age={user.age}

						editUser={ () => props.editUser(index)}
						deleteUser={ () => props.deleteUser(index)}

						// editUser={props.editUser(index)}
						// delete={props.editUser(index)}
					/>
				)
			})}
			</tbody>
		</table>
	);
};

export default cartTable;