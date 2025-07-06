import custAxios from "@/hooks/custAxios";

 type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

type Response = {
  success: boolean;
  message: string;
  data: LoginResponse;
}

export async function loginUser(userData: {role: string; email: string; password: string }) {
  try {
    const res = await custAxios.post<Response>("/auth/login", userData);
    console.log(res);
    const { user, token } = res.data.data;
    
    localStorage.setItem("token", token);
    return {user, token};
  } catch (error) {
    console.error("error in login: ", error);
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
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("error in login");
    throw new Error("Registration failed");
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
