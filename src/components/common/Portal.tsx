import React from "react";
import { createPortal } from "react-dom";

const portalEl = document.getElementById("portal");

export const Portal = ({ children }: { children: React.ReactNode }) =>
	createPortal(children, portalEl ? portalEl : document.body);
