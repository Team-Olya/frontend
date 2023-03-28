import { Routes, Route, Link, Navigate } from "react-router-dom";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

import { Proofs } from "../TestComp/Proofs";
import { Talents } from "../TalentsPage";
import { Layout } from "./components/Layout";
import { CreateAccForm } from "../Forms/CreateAccForm/CreateAccForm";
import { TalentProfile } from "../TalentProfile";
import { Settings } from "../Settings/Settings";

function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/talents" />} />
					<Route path="proofs" element={<Proofs />} />
					<Route path="talents" element={<Talents />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="create-acc" element={<CreateAccForm />} />
					<Route path="talent/:talentId" element={<TalentProfile />} />
					<Route path="settings" element={<Settings />} />
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
