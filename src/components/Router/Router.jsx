import { Routes, Route, Link } from "react-router-dom";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

import { Proofs } from "../TestComp/Proofs";
import { Talents } from "../TalentsPage";
import { Layout } from "./components/Layout";
import { CreateAccForm } from "../Forms/CreateAccForm/CreateAccForm";

function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={<h1>TALANTINO {process.env.REACT_APP_VERSION}</h1>}
					/>
					<Route path="proofs" element={<Proofs />} />
					<Route path="talents" element={<Talents />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="create-acc" element={<CreateAccForm />} />
					<Route
						path="*"
						element={
							<h1>
								This page doesn't exist! Return to <Link to="/"> home </Link>{" "}
								page
							</h1>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export { Router };
