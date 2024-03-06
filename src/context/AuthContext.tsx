import { FC, ReactNode, createContext, useContext, useState } from "react";

import { IUser } from "../interfaces/auth";

type StateContextType = {
	auth: IUser;
	setAuth: React.Dispatch<React.SetStateAction<IUser>>;
};

interface IProps {
	children: ReactNode;
}

export const initialState: IUser = {
	id: 0,
	email: "",
};

const AuthContext = createContext<StateContextType>(null as unknown as StateContextType);

export const AuthProvider: FC<IProps> = ({ children }) => {
	const [auth, setAuth] = useState<IUser>(initialState);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
