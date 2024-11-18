declare global {
	interface ImportMetaEnv {}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}
