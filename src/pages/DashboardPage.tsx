import { useState, useEffect } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("marathon_registrations") || "[]");
    setRegistrants(data);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p className="text-muted">Total Registrations: {registrants.length}</p>

      {registrants.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No registration data found. Please register on the home page!
        </div>
      ) : (
        <div className="row">
          {registrants.map((item, index) => (
            <div className="col-md-4" key={index}>
              <UserRegisterCard registrant={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}