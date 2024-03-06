import { lazy } from "react";

export const Login = lazy(() => import("../auth/Login"));
export const SignUp = lazy(() => import("../auth/SignUp"));

export const FileSystem = lazy(() => import("../file-system/FileSystem"));
