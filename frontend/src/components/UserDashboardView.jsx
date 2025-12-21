
export default function UserDashboardView({ user }) {
  return (
    <div style={{ padding: '2rem', background: '#eee' }}>
      <h2>DASHBOARD ACTIVO</h2>
      <p>Hola, {user.name}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
