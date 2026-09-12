import { useState } from "react";
//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPlanObj = plans.find((p) => p.id === plan);
  const planPrice = selectedPlanObj ? selectedPlanObj.price : 0;

  const extraItemsPrice = extras.reduce((total, itemId) => {
    const item = extraItems.find((i) => i.id === itemId);
    return total + (item ? item.price : 0);
  }, 0);

  const subTotal = planPrice + extraItemsPrice;
  const isAllExtras = extras.length === extraItems.length;
  const discount = isAllExtras ? subTotal * 0.2 : 0;
  const totalPayment = subTotal - discount;

  const handleExtraChange = (id: string) => {
    if (extras.includes(id)) {
      setExtras(extras.filter((item) => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  const isFirstNameValid = firstName.trim() !== "";
  const isLastNameValid = lastName.trim() !== "";
  const isPlanValid = plan !== "";
  const isGenderValid = gender !== "";

  const handleRegister = () => {
    setIsSubmitted(true);

    if (!isFirstNameValid || !isLastNameValid || !isPlanValid || !isGenderValid || !agree) {
      return;
    }

    const newItem = {
      firstName,
      lastName,
      plan: selectedPlanObj?.label,
      gender,
      extras: extras.map((id) => extraItems.find((e) => e.id === id)?.label),
      totalPayment,
    };

    const existingData = JSON.parse(localStorage.getItem("marathon_registrations") || "[]");
    localStorage.setItem("marathon_registrations", JSON.stringify([newItem, ...existingData]));

    alert(`Registration complete. Please pay money for ${totalPayment.toLocaleString()} THB.`);

    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setExtras([]);
    setAgree(false);
    setIsSubmitted(false);
  };
  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className={`form-control ${isSubmitted && !isFirstNameValid ? "is-invalid" : ""}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className={`form-control ${isSubmitted && !isLastNameValid ? "is-invalid" : ""}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${isSubmitted && !isPlanValid ? "is-invalid" : ""}`}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select>
            </div>
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="genderGroup"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="genderGroup"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />
                Female 👩
              </div>
              {isSubmitted && !isGenderValid && (
                <div className="text-danger small mt-1">Please select gender</div>
              )}
            </div>
            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={extras.includes("bottle")}
                  onChange={() => handleExtraChange("bottle")}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={extras.includes("shoes")}
                  onChange={() => handleExtraChange("shoes")}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={extras.includes("cap")}
                  onChange={() => handleExtraChange("cap")}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>
              {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
              {isAllExtras && <span className="text-success d-block">(20% Discounted)</span>}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>Total Payment : {totalPayment.toLocaleString()} THB</div>
          </div>

          <div className="modal-footer">
            <div>
              <input
                className="me-2 form-check-input"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
            <button
              className="btn btn-success my-2"
              disabled={!agree}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}