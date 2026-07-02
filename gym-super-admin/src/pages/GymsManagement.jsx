import { useEffect, useState } from "react";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { Pencil, Trash2, Search, Mail, } from "lucide-react";
import { registerGym } from "../services/registerGym";
import { resendCredentials } from "../services/resendCredentials";

export default function GymsManagement() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // form states
  const [gymName, setGymName] = useState("");
  const [ownerName, setOwnerName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [city, setCity] =
    useState("");
  const [editingGymId, setEditingGymId] =
    useState(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  const resetForm = () => {
    setGymName("");
    setOwnerName("");
    setEmail("");
    setPhone("");
    setCity("");
    setEditingGymId(null);
  };

  const fetchGyms = async () => {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("gyms")
          .select("*");

      if (error) throw error;

      setGyms(data || []);
    } catch (err) {
      console.error(
        "FETCH ERROR:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditGym = (
    gym
  ) => {
    setEditingGymId(gym.id);
    setGymName(gym.gym_name || "");
    setOwnerName(gym.owner_name || "");
    setEmail(gym.email || "");
    setPhone(gym.phone || "");
    setCity(gym.city || "");
  };

  const handleSubmit =
    async () => {
      if (
        !gymName ||
        !ownerName ||
        !email
      ) {
        alert(
          "Please fill required fields"
        );
        return;
      }

      if (editingGymId) {
        const { error } =
          await supabaseAdmin
            .from("gyms")
            .update({
              gym_name: gymName,
              owner_name:
                ownerName,
              email,
              phone,
              city,
            })
            .eq("id", editingGymId);

        if (error) {
          console.error(
            "UPDATE ERROR:",
            error
          );
          alert(
            "Failed to update gym"
          );
          return;
        }

        alert(
          "Gym updated successfully"
        );
      } else {
        const result =
          await registerGym({
            gym_name: gymName,
            owner_name:
              ownerName,
            email,
            phone,
            city,
          });

        if (result.success) {
          alert(
            "Gym registered successfully"
          );
        } else {
          alert(result.error);
          return;
        }
      }

      fetchGyms();
      resetForm();
    };

  const deleteGym = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this gym?"
      );

    if (!confirmDelete) return;

    const { error } =
      await supabaseAdmin
        .from("gyms")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
      alert(
        "Failed to delete gym"
      );
    } else {
      fetchGyms();
    }
  };

  const filteredGyms =
    gyms.filter((gym) =>
      gym.gym_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleResendEmail =
  async (gym) => {
    const result =
      await resendCredentials(
        gym
      );

    if (result.success) {
      alert(
        "Credentials email sent successfully"
      );
    } else {
      alert(
        result.error ||
          "Failed to resend email. Check server logs for details."
      );
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Gyms Management
          </h1>

          <p className="text-gray-500">
            Manage all registered gyms
          </p>
        </div>
      </div>

      {/* Register Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editingGymId
            ? "Edit Gym"
            : "Register New Gym"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Gym Name"
            value={gymName}
            onChange={(e) =>
              setGymName(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) =>
              setOwnerName(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={
              handleSubmit
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
          >
            {editingGymId
              ? "Update Gym"
              : "Register Gym"}
          </button>

          {editingGymId && (
            <button
              onClick={resetForm}
              className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Gym Table */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <div className="relative mb-5">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search gyms..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p>Loading gyms...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-4">
                    Gym Name
                  </th>
                  <th>
                    Owner
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Phone
                  </th>
                  <th>
                    City
                  </th>
                  <th>
                    Plan
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredGyms.map(
                  (gym) => (
                    <tr
                      key={
                        gym.id
                      }
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-medium">
                        {
                          gym.gym_name
                        }
                      </td>

                      <td>
                        {
                          gym.owner_name
                        }
                      </td>

                      <td>
                        {
                          gym.email
                        }
                      </td>

                      <td>
                        {
                          gym.phone
                        }
                      </td>

                      <td>
                        {
                          gym.city
                        }
                      </td>

                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {gym.subscription_plan ||
                            "basic"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleResendEmail(
                                gym
                              )
                            }
                            className="p-2 rounded-lg hover:bg-green-100 transition"
                          >
                            <Mail className="w-4 h-4 text-green-600" />
                          </button>

                          <button
                            onClick={() =>
                              handleEditGym(
                                gym
                              )
                            }
                            className="p-2 rounded-lg hover:bg-blue-100 transition"
                          >
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </button>

                          <button
                            onClick={() =>
                              deleteGym(
                                gym.id
                              )
                            }
                            className="p-2 rounded-lg hover:bg-red-100 transition"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {filteredGyms.length ===
              0 && (
              <div className="text-center py-10 text-gray-500">
                No gyms found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}