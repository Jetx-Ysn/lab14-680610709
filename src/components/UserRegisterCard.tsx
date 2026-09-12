import type { Registrant } from "../libs/Registrant";

interface Props {
  registrant: Registrant;
}

export default function UserRegisterCard({ registrant }: Props) {
  const genderText = registrant.gender === "Male" ? "👨 Male" : "👩 Female";

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h5 className="card-title text-primary">
        {registrant.firstName} {registrant.lastName}
      </h5>
      <p className="mb-1"><strong>Plan:</strong> {registrant.plan}</p>
      <p className="mb-1"><strong>Gender:</strong> {genderText}</p>
      <p className="mb-1">
        <strong>Extra Item(s):</strong> {registrant.extras && registrant.extras.length > 0 ? registrant.extras.join(", ") : "-"}
      </p>
      <p className="mb-0 fw-bold text-success">
        Total Payment: {registrant.totalPayment?.toLocaleString()} THB
      </p>
    </div>
  );
}