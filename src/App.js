// import { useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts";

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Layout = route.layout || DefaultLayout;
                  const Path = route.path;
                  const Page = route.component;
                  return (
                     <Route
                        key={index}
                        path={Path}
                        element={
                           <Layout>
                              <Page />
                              <button>
                                 <Link to={"/"}>Trang Home</Link>
                              </button>
                              <button>
                                 <Link to={"/following"}>Trang Following</Link>
                              </button>
                              <button>
                                 <Link to={"/profile"}>Trang Profile</Link>
                              </button>
                              <button>
                                 <Link to={"/search"}>Trang Search</Link>
                              </button>
                              <button>
                                 <Link to={"/upload"}>Trang Upload</Link>
                              </button>
                           </Layout>
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
