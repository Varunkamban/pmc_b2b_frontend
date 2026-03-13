import { useState } from "react";
import PopupModal from "components/common/PopupModal";
import { useKanban } from "./KanbanContext";

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
  carBrand: "",
  carModel: "",
  numberPlate: "",
  color: "",
  priority: "Normal",
  pickupLocation: "",
  pickupDate: "",
  pickupTime: "",
  dropLocation: "",
  dropDate: "",
  dropTime: "",
  specialInstructions: "",
};

const CreateTicketModal = ({ show, onClose }) => {
  const { addTicket } = useKanban();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (currentStep) => {
    const stepErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim())
        stepErrors.fullName = "Full name is required";
      if (!formData.phone.trim())
        stepErrors.phone = "Phone number is required";
      else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone.trim()))
        stepErrors.phone = "Invalid phone number format";
      if (
        formData.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
      )
        stepErrors.email = "Invalid email format";
      if (!formData.carBrand.trim())
        stepErrors.carBrand = "Car brand is required";
      if (!formData.numberPlate.trim())
        stepErrors.numberPlate = "Number plate is required";
    } else if (currentStep === 2) {
      if (!formData.pickupLocation.trim())
        stepErrors.pickupLocation = "Pickup location is required";
      if (!formData.pickupDate) stepErrors.pickupDate = "Pickup date is required";
      if (!formData.pickupTime) stepErrors.pickupTime = "Pickup time is required";
    } else if (currentStep === 3) {
      if (!formData.dropLocation.trim())
        stepErrors.dropLocation = "Drop location is required";
      if (!formData.dropDate) stepErrors.dropDate = "Drop date is required";
      if (!formData.dropTime) stepErrors.dropTime = "Drop time is required";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;
    addTicket(formData);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <PopupModal
      show={show}
      onClose={handleClose}
      size="xl"
      header={false}
      customClassName="create-ticket-modal"
    >
      <div className="create-ticket-container">
        <div className="create-ticket-header">
          <div>
            <h4>Create New Service Request</h4>
            <p>Configure service parameters for the new ticket.</p>
          </div>
          <button type="button" className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="ticket-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span className="step-circle">{step > 1 ? "✓" : "1"}</span>
            Customer & Vehicle
          </div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span className="step-circle">{step > 2 ? "✓" : "2"}</span>
            Pickup Details
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span className="step-circle">3</span>
            Drop Details
          </div>
        </div>

        {step === 1 && (
          <div className="ticket-form">
            <h5>Customer Information</h5>

            <input
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              placeholder="Full Name"
              aria-label="Full Name"
              maxLength={100}
              value={formData.fullName}
              onChange={handleChange("fullName")}
            />
            {errors.fullName && (
              <div className="invalid-feedback d-block">{errors.fullName}</div>
            )}

            <div className="row">
              <div className="col">
                <input
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  maxLength={15}
                  value={formData.phone}
                  onChange={handleChange("phone")}
                />
                {errors.phone && (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                )}
              </div>
              <div className="col">
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email Address"
                  aria-label="Email Address"
                  type="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={handleChange("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                )}
              </div>
            </div>

            <h5>Vehicle Details</h5>

            <div className="row">
              <div className="col">
                <input
                  className={`form-control ${errors.carBrand ? "is-invalid" : ""}`}
                  placeholder="Car Brand"
                  aria-label="Car Brand"
                  maxLength={50}
                  value={formData.carBrand}
                  onChange={handleChange("carBrand")}
                />
                {errors.carBrand && (
                  <div className="invalid-feedback d-block">
                    {errors.carBrand}
                  </div>
                )}
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Car Model"
                  aria-label="Car Model"
                  maxLength={50}
                  value={formData.carModel}
                  onChange={handleChange("carModel")}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <input
                  className={`form-control ${errors.numberPlate ? "is-invalid" : ""}`}
                  placeholder="Number Plate"
                  aria-label="Number Plate"
                  maxLength={20}
                  value={formData.numberPlate}
                  onChange={handleChange("numberPlate")}
                />
                {errors.numberPlate && (
                  <div className="invalid-feedback d-block">
                    {errors.numberPlate}
                  </div>
                )}
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Color"
                  aria-label="Color"
                  maxLength={30}
                  value={formData.color}
                  onChange={handleChange("color")}
                />
              </div>
            </div>

            <h5>Priority</h5>
            <div className="kb-priority-toggle">
              <button
                type="button"
                className={`kb-priority-btn ${formData.priority === "Normal" ? "active normal" : ""}`}
                onClick={() =>
                  setFormData((p) => ({ ...p, priority: "Normal" }))
                }
              >
                Normal
              </button>
              <button
                type="button"
                className={`kb-priority-btn ${formData.priority === "VIP" ? "active vip" : ""}`}
                onClick={() =>
                  setFormData((p) => ({ ...p, priority: "VIP" }))
                }
              >
                ★ VIP
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ticket-form">
            <h5>Pickup Details</h5>

            <input
              className={`form-control ${errors.pickupLocation ? "is-invalid" : ""}`}
              placeholder="Pickup Location"
              aria-label="Pickup Location"
              maxLength={200}
              value={formData.pickupLocation}
              onChange={handleChange("pickupLocation")}
            />
            {errors.pickupLocation && (
              <div className="invalid-feedback d-block">
                {errors.pickupLocation}
              </div>
            )}

            <div className="row">
              <div className="col">
                <input
                  className={`form-control ${errors.pickupDate ? "is-invalid" : ""}`}
                  type="date"
                  aria-label="Pickup Date"
                  value={formData.pickupDate}
                  onChange={handleChange("pickupDate")}
                />
                {errors.pickupDate && (
                  <div className="invalid-feedback d-block">
                    {errors.pickupDate}
                  </div>
                )}
              </div>
              <div className="col">
                <input
                  className={`form-control ${errors.pickupTime ? "is-invalid" : ""}`}
                  type="time"
                  aria-label="Pickup Time"
                  value={formData.pickupTime}
                  onChange={handleChange("pickupTime")}
                />
                {errors.pickupTime && (
                  <div className="invalid-feedback d-block">
                    {errors.pickupTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="ticket-form">
            <h5>Drop Logistics</h5>

            <input
              className={`form-control ${errors.dropLocation ? "is-invalid" : ""}`}
              placeholder="Drop Location"
              aria-label="Drop Location"
              maxLength={200}
              value={formData.dropLocation}
              onChange={handleChange("dropLocation")}
            />
            {errors.dropLocation && (
              <div className="invalid-feedback d-block">
                {errors.dropLocation}
              </div>
            )}

            <div className="row">
              <div className="col">
                <input
                  className={`form-control ${errors.dropDate ? "is-invalid" : ""}`}
                  type="date"
                  aria-label="Drop Date"
                  value={formData.dropDate}
                  onChange={handleChange("dropDate")}
                />
                {errors.dropDate && (
                  <div className="invalid-feedback d-block">
                    {errors.dropDate}
                  </div>
                )}
              </div>
              <div className="col">
                <input
                  className={`form-control ${errors.dropTime ? "is-invalid" : ""}`}
                  type="time"
                  aria-label="Drop Time"
                  value={formData.dropTime}
                  onChange={handleChange("dropTime")}
                />
                {errors.dropTime && (
                  <div className="invalid-feedback d-block">
                    {errors.dropTime}
                  </div>
                )}
              </div>
            </div>

            <textarea
              className="form-control"
              placeholder="Special Instructions"
              aria-label="Special Instructions"
              maxLength={500}
              value={formData.specialInstructions}
              onChange={handleChange("specialInstructions")}
            />
          </div>
        )}

        <div className="modal-footer-custom">
          {step > 1 && (
            <button type="button" className="btn-prev" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}

          {step < 3 && (
            <button type="button" className="btn-next" onClick={handleNext}>
              Next →
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              className="btn-submit"
              onClick={handleSubmit}
            >
              Create Service Request
            </button>
          )}
        </div>
      </div>
    </PopupModal>
  );
};

export default CreateTicketModal;
