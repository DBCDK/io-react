import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => (
	<div className="wrapper">
		<nav id="sidebar">
			<h1>dataio</h1>
			<ul>
				<li><Link to="/">jobs</Link></li>
			</ul>
		</nav>
	</div>
)

export default Sidebar;
