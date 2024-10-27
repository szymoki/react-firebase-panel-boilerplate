import { signOut, getAuth } from "firebase/auth";

export default function DashboardIndex(user) {
  console.log("user", user);

  function logout() {
    signOut(getAuth());
    window.location.reload()
  }
  return (
    <div className="text-center">
      Hello in dashboard. Hello {user.user.email} <button onClick={logout}>Log Out</button>
    </div>
  );
}
