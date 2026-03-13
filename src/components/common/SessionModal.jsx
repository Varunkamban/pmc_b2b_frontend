const SessionModal = ({ show, onContinue }) => {

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <h3>Session Expiring</h3>

        <p>Your session will expire soon.</p>

        <button onClick={onContinue}>
          Continue Working
        </button>

      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    background: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px"
  }
};

export default SessionModal;