import "../stilos/contrasena.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CambiarContraseña = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user") || {});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para cambiar la contraseña
    console.log("Contraseña actual:");
  };

  const handleCancel = () => {
    // Redirigir al usuario a la página de perfil o donde desees
    console.log("user", user);
    navigate(`/datos-user/${user.user.name}`);
  };

  return (
    <div className="container">
      <div className="password-change-container">
        <div className="password-form-section">
          <h1>Cambiar Contraseña</h1>
          <form>
            <div className="form-group">
              <label htmlFor="currentPassword">Contraseña Actual</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="container-btn">
              <button
                className="btn-cancelar"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-password"
                onClick={handleSubmit}
              >
                Cambiar Contraseña
              </button>
            </div>
          </form>
        </div>
        <div className="password-rules-section">
          <h2>Requisitos para la nueva contraseña</h2>
          <ul>
            <li>Mínimo 8 caracteres</li>
            <li>Al menos una mayúscula</li>
            <li>Al menos una minúscula</li>
            <li>Al menos un número</li>
            <li>Al menos un carácter especial</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CambiarContraseña;
