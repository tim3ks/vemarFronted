
export const useLayout = () => {
	const layout = ref('moskitiera-okienna')

	const setLayout = (newLayout: any) => {
		layout.value = newLayout
	}

	return {
		layout,
		setLayout
	}
}
