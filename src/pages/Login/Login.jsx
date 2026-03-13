import { AuthContext } from "context/AuthContext";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { companyLogo } from "assets/images";
import validateLogin from "./validateRules";

const OTP_LENGTH = 6;

const OtpInputGroup = ({ otp, setOtp, error }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = otp.split("");
    newOtp[index] = value;
    const joined = newOtp.join("");
    setOtp(joined);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(pasted.padEnd(OTP_LENGTH, ""));
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="otp-input-group">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={`otp-box ${error ? "otp-box-error" : ""} ${otp[i] ? "otp-box-filled" : ""}`}
          value={otp[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
};

const Login = () => {
  const { login, loginWithOtp, sendOtp, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const id = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    return () => clearTimeout(id);
  }, [otpTimer]);

  const resetState = useCallback(() => {
    setErrors({});
    setLoginError("");
    setOtpSent(false);
    setOtp("");
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    resetState();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoginError("");
    const validationErrors = validateLogin("mobile", { mobile });
    setErrors({ ...validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const success = await sendOtp(mobile);
      if (success) {
        setOtpSent(true);
        setOtpTimer(60);
      } else {
        setLoginError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!otp || otp.replace(/ /g, "").length < 4) {
      setErrors({ otp: "Please enter a valid OTP" });
      return;
    }

    setLoading(true);
    try {
      const success = await loginWithOtp(mobile, otp.replace(/ /g, ""));
      if (success) {
        navigate("/dashboard");
      } else {
        setLoginError("Invalid OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const validationErrors = validateLogin(null, { email, password });
    setErrors({ ...validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setLoginError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v2" />
          <path d="M14 17a4 4 0 1 0 0-8h-1l-1 4h-2" />
          <circle cx="7.5" cy="17" r="2.5" /><circle cx="16.5" cy="17" r="2.5" />
          <path d="M3 10h1m16 0h1" />
        </svg>
      ),
      title: "Valet Services",
      desc: "Seamless car pickup & delivery",
    },
    {
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Real-time Tracking",
      desc: "Monitor every trip live",
    },
    {
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Fully Insured",
      desc: "Every ride covered & secure",
    },
  ];

  return (
    <div className="login-page">
      <div className="login-layout">
        {/* Hero Banner */}
        <div className="login-hero">
          <div className="login-hero__overlay" />
          <div className="login-hero__content">
            <div className="login-hero__badge">Trusted by 500+ Businesses</div>
            <h1 className="login-hero__title">
              Your Trusted<br />Valet &amp; Transport<br />Partner
            </h1>
            <p className="login-hero__subtitle">
              Seamless car pickup, parking and delivery services for businesses across the region.
            </p>
            <div className="login-hero__features">
              {features.map((f, i) => (
                <div key={i} className="login-hero__feature">
                  <div className="login-hero__feature-icon">
                    {f.svg}
                  </div>
                  <div>
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="login-panel">
          <div className="login-panel__inner">
            <div className="login-panel__header">
              <img src={companyLogo} alt="Logo" className="login-panel__logo" />
              <h2 className="login-panel__title">Welcome back</h2>
              <p className="login-panel__subtitle">Sign in to your account to continue</p>
            </div>

            <div className="login-panel__tabs">
              <button
                className={`login-panel__tab ${activeTab === "mobile" ? "login-panel__tab--active" : ""}`}
                onClick={() => handleTabSwitch("mobile")}
              >
                <i className="fa-solid fa-mobile-screen-button" />
                Mobile
              </button>
              <button
                className={`login-panel__tab ${activeTab === "email" ? "login-panel__tab--active" : ""}`}
                onClick={() => handleTabSwitch("email")}
              >
                <i className="fa-solid fa-envelope" />
                Email
              </button>
            </div>

            {loginError && (
              <div className="login-panel__error">
                <i className="fa-solid fa-circle-exclamation" />
                {loginError}
              </div>
            )}

            {/* Mobile - Send OTP */}
            {activeTab === "mobile" && !otpSent && (
              <form onSubmit={handleSendOtp} noValidate className="login-panel__form fade-in">
                <div className="form-field">
                  <label className="form-field__label">Mobile Number</label>
                  <div className={`form-field__input-wrap ${errors.mobile ? "form-field__input-wrap--error" : ""}`}>
                    <i className="fa-solid fa-phone form-field__icon" />
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={15}
                    />
                  </div>
                  {errors.mobile && <span className="form-field__error">{errors.mobile}</span>}
                </div>
                <button type="submit" className="login-panel__btn" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <>Send OTP <i className="fa-solid fa-arrow-right" /></>
                  )}
                </button>
              </form>
            )}

            {/* Mobile - Verify OTP */}
            {activeTab === "mobile" && otpSent && (
              <form onSubmit={handleVerifyOtp} noValidate className="login-panel__form fade-in">
                <div className="form-field">
                  <label className="form-field__label">
                    Verification code sent to <strong>+{mobile}</strong>
                  </label>
                  <OtpInputGroup otp={otp} setOtp={setOtp} error={!!errors.otp} />
                  {errors.otp && <span className="form-field__error">{errors.otp}</span>}
                </div>
                <button type="submit" className="login-panel__btn" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Verifying...</>
                  ) : (
                    <>Verify &amp; Login <i className="fa-solid fa-arrow-right" /></>
                  )}
                </button>
                <div className="otp-actions">
                  {otpTimer > 0 ? (
                    <span className="otp-actions__timer">
                      <i className="fa-regular fa-clock" /> Resend in {otpTimer}s
                    </span>
                  ) : (
                    <button type="button" className="otp-actions__resend" onClick={handleSendOtp}>
                      Resend OTP
                    </button>
                  )}
                  <button
                    type="button"
                    className="otp-actions__change"
                    onClick={() => { setOtpSent(false); setOtp(""); }}
                  >
                    Change Number
                  </button>
                </div>
              </form>
            )}

            {/* Email Login */}
            {activeTab === "email" && (
              <form onSubmit={handleEmailLogin} noValidate className="login-panel__form fade-in">
                <div className="form-field">
                  <label className="form-field__label">Email Address</label>
                  <div className={`form-field__input-wrap ${errors.email ? "form-field__input-wrap--error" : ""}`}>
                    <i className="fa-solid fa-envelope form-field__icon" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <span className="form-field__error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label className="form-field__label">Password</label>
                  <div className={`form-field__input-wrap ${errors.password ? "form-field__input-wrap--error" : ""}`}>
                    <i className="fa-solid fa-lock form-field__icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="form-field__toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                  {errors.password && <span className="form-field__error">{errors.password}</span>}
                </div>
                <button type="submit" className="login-panel__btn" disabled={loading}>
                  {loading ? (
                    <><span className="spinner" /> Signing in...</>
                  ) : (
                    <>Sign In <i className="fa-solid fa-arrow-right" /></>
                  )}
                </button>
              </form>
            )}

            <div className="login-panel__footer">
              <p className="login-panel__signup">
                Don&apos;t have an account? <span>Sign up</span>
              </p>
              <div className="login-panel__trust">
                <i className="fa-solid fa-lock" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
