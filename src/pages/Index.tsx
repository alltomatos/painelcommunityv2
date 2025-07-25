
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard as this is the main admin page
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
