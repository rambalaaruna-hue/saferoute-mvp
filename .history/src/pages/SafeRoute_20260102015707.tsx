import PageMeta from "../components/common/PageMeta";

export default function SafeRoute() {
	return (
		<>
			<PageMeta title="SafeRoute" description="Main dashboard" />
			<div style={{ color: "white", padding: "24px" }}>
				<h1>SafeRoute Home</h1>
				<p>You are logged in. Replace this with your main app content.</p>
			</div>
		</>
	);
}
