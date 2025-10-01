import React from "react";

export default function Profile({ user, onLogout }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card text-center p-4 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 25px 40px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.15)";
        }}
      >
        {/* Avatar */}
        <div className="position-relative d-inline-block mb-3">

          {/* Online status badge */}
          <span
            className={`position-absolute bottom-0 end-0 rounded-circle border border-white`}
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: user.isOnline ? "#28a745" : "#6c757d",
            }}
          ></span>
        </div>

        {/* User Info */}
        <h4 className="fw-bold">{user.username}</h4>
        <p className="text-muted mb-1">{user.email}</p>
        {user.phone && <p className="text-muted mb-1">📞 {user.phone}</p>}
        {user.address && <p className="text-muted mb-3">🏠 {user.address}</p>}

        {/* Logout Button */}
        <button
          className="btn mt-3 w-100"
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ff4757)",
            color: "white",
            border: "none",
            padding: "12px 0",
            borderRadius: "50px",
            fontWeight: "500",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
