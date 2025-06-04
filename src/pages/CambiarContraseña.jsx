import "../stilos/contrasena.css";

const CambiarContraseña = () => {
  return (
    <div className="container">
      <h1>Cambiar Contraseña</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Contraseña Actual
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Nueva Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default CambiarContraseña;
