
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Orangeback from './Orangeback.jpg';
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // تعريف المستخدمين الثابتين
  const users = {
    Admin: { email: "admin@bookngo.com", password: "admin123", role: "Admin" },
    TravelAgency: { email: "agency@bookngo.com", password: "agency123", role: "TravelAgency" },
    Tourist: { email: "tourist@bookngo.com", password: "tourist123", role: "Tourist" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // إعادة تعيين الخطأ في البداية

    // تحقق من كلمة السر واسم المستخدم
    const user = Object.values(users).find((user) => user.email === email && user.password === password);

    if (!user) {
      setError("Invalid username or password"); // إذا كانت بيانات الدخول خاطئة
      return;
    }

    // تخزين الـ token والدور في الـ localStorage
    const fakeToken = "fake-token-123"; // يمكن استبداله بتوكن حقيقي عند الربط مع الـ API
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userRole", user.role);

    onLogin({ role: user.role });

    // التوجيه إلى الصفحة المناسبة بناءً على الدور
    if (user.role === "Admin") {
      navigate("/admin");
    } else if (user.role === "TravelAgency") {
      navigate("/travel-agency");
    } else if (user.role === "Tourist") {
      navigate("/tourist");
    }
  };

  return (
    <div className="login-containerr" style={{ backgroundImage: `url(${Orangeback})` }}>
      <div className="login-boxx">
        <h2 className="login-titlee">Welcome to BooknGo</h2>
        {error && <p className="error-message">{error}</p>} {/* عرض الخطأ إذا كان موجودًا */}

        <form onSubmit={handleLogin} className="loginform">
          <div className="input-groupL">
            <label>E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-groupL">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-buttonn">Login</button>
        </form>

        <div className="forgot-password">
          <a href="/reset-password">FORGET YOUR PASSWORD?</a>
        </div>
        <div className="forgot-password">
          <a href="/new-account" style={{ textDecoration: 'underline' }}>
            Don't have an account? Create a new account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;



// بختبر ربط الكود بثوابت ده مش صح طبعا

// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Orangeback from './Orangeback.jpg';
// import "./Login.css";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("https://your-api-endpoint.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid username or password");
//       }

//       const data = await response.json();
//       const { role, token } = data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("userRole", role);

//       onLogin({ role });

//       if (role === 'Admin') {
//         navigate('/admin');
//       } else if (role === 'TravelAgency') {
//         navigate('/travel-agency');
//       } else if (role === 'Tourist') {
//         navigate('/tourist');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="login-containerr" style={{ backgroundImage: `url(${Orangeback})` }}>
//       <div className="login-boxx">
//         <h2 className="login-titlee">Welcome to BooknGo</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLogin} className="loginform">
//           <div className="input-groupL">
//             <label>E-MAIL</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-groupL">
//             <label>PASSWORD</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-buttonn">Login</button>
//         </form>
//         <div className="forgot-password">
//           <a href="/reset-password">FORGET YOUR PASSWORD?</a>
//         </div>
//         <div className="forgot-password">
//           <a href="/new-account" style={{ textDecoration: 'underline' }}>
//             Don't have an account? Create a new account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// the real one
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Orangeback from './Orangeback.jpg';
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error before attempting login

//     // إرسال البيانات إلى الـ API للتحقق
//     try {
//       const response = await fetch("https://your-api-endpoint.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid username or password");
//       }

//       const data = await response.json();

//       // استخراج الـ Role من الاستجابة
//       const { role, token } = data;

//       // تخزين التوكن في الـ LocalStorage
//       localStorage.setItem("authToken", token);

//       // توجيه المستخدم بناءً على الـ role
//       if (role === 'admin') {
//         navigate('/admin');
//       } else if (role === 'travel-agency') {
//         navigate('/travel-agency');
//       } else if (role === 'tourist') {
//         navigate('/tourist');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="login-containerr" style={{ backgroundImage: `url(${Orangeback})` }}>
//       <div className="login-boxx">
//         <h2 className="login-titlee">Welcome to BooknGo</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLogin} className="loginform">
//           <div className="input-groupL">
//             <label>E-MAIL</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-groupL">
//             <label>PASSWORD</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-buttonn">Login</button>
//         </form>
//         <div className="forgot-password">
//           <a href="#">FORGET YOUR PASSWORD?</a>
//         </div>
//         <div className="forgot-password">
//           <a href="/new-account" style={{ textDecoration: 'underline' }}>
//             Don't have an account? Create a new account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
