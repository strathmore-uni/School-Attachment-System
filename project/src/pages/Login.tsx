import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLogin } from "@/lib/auth/mutations";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutateAsync: loginUser } = useLogin();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userRole || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const session = await loginUser({
      role: userRole,
      email: email,
      password: password,
    
    });

    if (!session) {
      console.log("No session found");
      return;
    }
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("email", email);
    toast({
      title: "Login Successful",
      description: `Welcome to Strathmore Attachment System`,
    });

    switch (userRole) {
      case "student":
        navigate("/student-dashboard");
        break;
      case "school-supervisor":
        navigate("/school-supervisor-dashboard");
        break;
      case "host-supervisor":
        navigate("/host-supervisor-dashboard");
        break;
      case "administrator":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  }
const handleLogin = async (formData) => {
  const { role, email, password } = formData;
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    // Handle successful login
    localStorage.setItem("userRole", role);
    localStorage.setItem("email", email);
    toast({
      title: "Login Successful",
      description: `Welcome to Strathmore Attachment System`,
    });
    navigate(`/${role}-dashboard`);
  } else {
    // Handle login error
    toast({
      title: "Login Failed",
      description: data.message || "Please check your credentials",
      variant: "destructive",
    });
  }
};
  //       description: "Please fill in all fields",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // Store user role in localStorage for demo purposes
  //   localStorage.setItem("userRole", userRole);
  //   localStorage.setItem("username", username);

  //   toast({
  //     title: "Login Successful",
  //     description: `Welcome to Strathmore Attachment System`,
  //   });

  //   // Navigate based on role
  //   switch (userRole) {
  //     case "student":
  //       navigate("/student-dashboard");
  //       break;
  //     case "school-supervisor":
  //       navigate("/school-supervisor-dashboard");
  //       break;
  //     case "host-supervisor":
  //       navigate("/host-supervisor-dashboard");
  //       break;
  //     case "administrator":
  //       navigate("/admin-dashboard");
  //       break;
  //     default:
  //       navigate("/");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/StrathmoreLogo.png" 
              alt="Strathmore University" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Strathmore University
          </h1>
          <p className="text-gray-600">Attachment Management System</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="school-supervisor">
                      School Supervisor
                    </SelectItem>
                    <SelectItem value="host-supervisor">
                      Host Supervisor
                    </SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>

                <p>
                  Don't have an account?
                  <Link
                    to={"/register"}
                    className="text-small-regular text-light-2 text-center mt-2"
                  >
                    register
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;