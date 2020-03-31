import React from 'react'

const toggleView = (props) => {
	return (
		<button
			className="btn btn-sm btn-outline-primary switch-view"
			onClick={props.changeView}
		>
			Switch view
		</button>
	);
};

export default toggleView;
