import { useCallback, useState } from "react";

import { createPresignedPostApi } from "../services/files/createPresignedPost";

import { IFile } from "../interfaces/files";

export const useFiles = () => {
	const [uploadedFile, setUploadedFile] = useState<IFile | undefined>(undefined);
	const [isUploadLoading, setIsUploadLoading] = useState(false);
	const [uploadErrors, setUploadErrors] = useState("");

	const handleFileUpload = async (file: File) => {
		const response = await createPresignedPostApi({
			key: file.name,
			type: file.type,
		});

		const presignedLink = response.data.url;
		const fields = response.data.fields;

		const formData = new FormData();
		Object.entries(fields).forEach(([k, v]) => {
			formData.append(k, v);
		});
		formData.append("file", file);

		setIsUploadLoading(true);
		fetch(presignedLink, {
			method: "POST",
			body: formData,
		})
			.then(async () => {
				setUploadedFile({
					key: response.data.fields.key,
					name: file.name,
				});
			})
			.catch((e) => console.log(e))
			.finally(() => setIsUploadLoading(false));
	};

	const handleOnDrop = useCallback(async (files: File[]) => {
		console.log("drop", files);
		if (files.length > 1) {
			setUploadErrors("Max files length is 1");
			return;
		}
		handleFileUpload(files[0]);
	}, []);

	return { uploadedFile, uploadErrors, isUploadLoading, handleFileUpload, setUploadErrors, handleOnDrop };
};
