import React from 'react'

const cartRow = (props) => {
	return (
		<tr>
			<th scope="row">{props.index + 1}</th>
			<td>{props.name}</td>
			<td>{props.position}</td>
			<td>{props.age}</td>
			<td>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => props.editUser(props.index)}
				>
					Edit
				</button>
				<button
					className="btn btn-danger btn-sm"
					onClick={ () => props.deleteUser(props.index)}
				>
					Delete
				</button>
			</td>
		</tr>
	)
};

export default cartRow;