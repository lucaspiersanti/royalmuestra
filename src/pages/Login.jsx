import HeaderBasico from "../components/HeaderBasico";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
// import md5 from "md5";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Login as LoginAPI } from "../controllers/loginController";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userNameObligatorioError, setUserNameObligatorioError] = useState("");
  const [passwordObligatorioError, setPasswordObligatorioError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verAdministracion = () => {
    navigate("/Administracion");
  };

  const resetFormulario = () => {
    setUsername("");
    setPassword("");
    //Limpiando errores
    setUserNameObligatorioError("");
    setPasswordObligatorioError("");
  };

  const campoUserNameObligatorio = () => {
    setUserNameObligatorioError("");
  };
  const campoPasswordObligatorio = () => {
    setPasswordObligatorioError("");
  };

  const hamdleSubmit = async () => {
    if (username === "" || password === "") {
      swal("Favor de verificar", "Hay campos sin completar", "warning");
      if (username === "") {
        setUserNameObligatorioError("Debe completar el nombre de usuario");
      }
      if (password === "") {
        setPasswordObligatorioError("Debe completar la contraseña");
      }
    } else {
      try {
        setLoading(true);

        let response = await LoginAPI(username, password);
        //////console.log("Devuelve el loginApi",response);
        // const response = await axios.post(baseURL, {
        //   username: username,
        //   password: password, // Asegúrate de manejar las contraseñas de manera segura en el servidor
        // });
        localStorage.clear();
        //////console.log("Response:", response.user);

        if (response.user) {
          ////console.log(response);

          localStorage.setItem("id", response.user.idUsuario, { path: "/" });
          localStorage.setItem("username", response.user.username, {
            path: "/",
          });
          localStorage.setItem("nombre", response.user.nombre, { path: "/" });
          localStorage.setItem("apellido", response.user.apellido, {
            path: "/",
          });
          localStorage.setItem("rol", response.user.rol, { path: "/" });
          localStorage.setItem("habilitado", response.user.habilitado, {
            path: "/",
          });

          swal("Bienvenido", " Administración Royal ...", "info");
          verAdministracion();
        } else {
          swal(
            "No se pudo iniciar sesion.",
            "Verifique los datos ingresados.",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        resetFormulario();
        swal(
          "No se pudo iniciar sesion.",
          "Verifique los datos ingresados.",
          "error"
        );
      } finally {
        setLoading(false);
        resetFormulario();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          <HeaderBasico></HeaderBasico>
          <section className="text-white mt-20 w-full h-full body-font absolute ">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-medium text-3xl text-white">
                  Control y Administración de Lotes
                </h1>
                <p className="leading-relaxed mt-4">
                  Clasifica, filtra y administra con precisión - Explora por
                  Categorías, estado, disponibilidad, precio, dimensiones y más.
                </p>
              </div>
              <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Ingreso a plataforma de gestión
                </h2>
                <div className="relative mb-4">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm text-gray-600">
                    Nombre de usuario
                  </label>
                  <input
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    onBlur={() => campoUserNameObligatorio()}
                    type="text"
                    id="username"
                    name="username"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p className="text-white bg-red-600">
                    {userNameObligatorioError}
                  </p>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600">
                    Contraseña
                  </label>
                  <input
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    onBlur={() => campoPasswordObligatorio()}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p className="text-white bg-red-600">
                    {passwordObligatorioError}
                  </p>
                </div>
                <button
                  onClick={() => hamdleSubmit()}
                  className="text-white bg-yellow-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                  Ingresar
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  *Para registro de usuarios, comunicarse con sistemas.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
