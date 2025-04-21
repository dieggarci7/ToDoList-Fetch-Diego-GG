import React from "react";
import ToDo from "./ToDoList";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="container-fluid d-flex justify-content-center align-items-start mt-2 vh-100">
			<ToDo/>
		</div>
	);
};

export default Home;