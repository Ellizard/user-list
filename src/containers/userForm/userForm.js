import React from 'react'

const userForm = (props) => {
	const newUser = props.editValues === undefined;

	return (
		<form className="col-sm"
				onSubmit={ props.action }
		>
			<div className="form-group row">
				<label htmlFor="username"
					   className="col-sm-1 col-form-label-sm">Name</label>
				<div className="col-sm-11">
					<input type="text"
						   className=""
						   name="name"
						   defaultValue={!newUser ? props.editValues.name: null}
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
						   defaultValue={!newUser ? props.editValues.position: null}
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
						   defaultValue={!newUser ? props.editValues.age : null}
						   id="userage"/>
				</div>
			</div>
			<div className="row">
				<input type="submit" value={props.submitCopy}/>
			</div>
		</form>
	)
};

export default userForm;