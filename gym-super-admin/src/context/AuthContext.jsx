import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error(error);
        }

        setUser(data?.session?.user ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Unable to log out right now");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);