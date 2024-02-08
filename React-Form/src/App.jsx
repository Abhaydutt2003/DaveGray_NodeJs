import {
  Register,
  Login,
  Home,
  Layout,
  Editor,
  Admin,
  Missing,
  Unauthorized,
  Lounge,
  LinkPage,
  RequireAuth,
  PersistLogin,
} from "./components";

import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

let App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        {/* public routes */}
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="linkpage" element={<LinkPage></LinkPage>}></Route>
        <Route
          path="unauthorized"
          element={<Unauthorized></Unauthorized>}
        ></Route>
        {/* protected routes */}
        <Route element={<PersistLogin></PersistLogin>}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User]}></RequireAuth>}
          >
            <Route path="/" element={<Home></Home>}></Route>
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor]}></RequireAuth>}
          >
            <Route path="editor" element={<Editor></Editor>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all the missing pages with *  */}
        <Route path="*" element={<Missing></Missing>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
