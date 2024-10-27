import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div class="w-100">
      <div class="container text-center my-3">
        <h2>React Firebase Panel Boilerplate</h2>
      </div>
      <div class="container">
        <Outlet />
      </div>
    </div>
  );
}
