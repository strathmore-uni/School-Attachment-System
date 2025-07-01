import custAxios from "@/hooks/custAxios";

 type LoginResponse = {
  token: string;
  userData: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export async function loginUser(user: {role: string; email: string; password: string }) :Promise<LoginResponse | undefined> {
  try {
    const res = await custAxios.post<LoginResponse>("/auth/login", user);
    console.log(res);
    const { token, userData  } = res.data;
localStorage.setItem("token", token);
    return { token, userData };
  } catch (error) {
    console.error("error in login");
  }
}

export async function registerUser(user: {
  role: string;
  name: string;
  password: string;
  email: string;
}) {
  try {
    const res = await custAxios.post("/auth/create-user", user);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("error in login");
  }
}
export async function getUser() {
  try {
    const res = await custAxios.get("/auth/user");
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("error in getting user");
  }
}
