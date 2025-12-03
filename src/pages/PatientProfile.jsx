import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import { useAuth } from "../context/AuthContext";

export default function PatientProfile({ currentRole, onRoleChange }) {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: null, // base64 string
  });

  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Load initial user data
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || null,
      });
      if (user.photo) {
        setPreview(`data:image/jpeg;base64,${user.photo}`);
      }
    }
  }, [user]);

  // Convert uploaded image → Base64 and update profile.photo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setProfile((p) => ({ ...p, photo: base64 }));
      setPreview(reader.result);
      setUser((u) => ({ ...u, photo: base64 })); // Update global user for avatar
    };

    reader.readAsDataURL(file);
  };

  // Save profile including base64 photo
  const handleSaveChanges = async () => {
    try {
      setSaving(true);

      const res = await api.put("/api/auth/upload-profile", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        photo: profile.photo,
      });

      setUser(res.data); // Update global auth context

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="My Profile"
      currentRole={currentRole}
      onRoleChange={onRoleChange}
      currentUser={{
        name: `${profile.firstName || "First"} ${profile.lastName || "Last"}`,
        photo: profile.photo,
      }}
    >
      <div className="max-w-2xl mx-auto mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Profile Information</h2>

        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border">
            <img
              src={preview || "/default-avatar.png"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button variant="secondary" onClick={handleButtonClick}>
            Change Photo
          </Button>
        </div>

        {/* Editable Fields */}
        <div className="mt-6 space-y-4">
          <input
            placeholder="First Name"
            value={profile.firstName}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setProfile((p) => ({ ...p, firstName: e.target.value }))
            }
          />

          <input
            placeholder="Last Name"
            value={profile.lastName}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setProfile((p) => ({ ...p, lastName: e.target.value }))
            }
          />

          <input
            readOnly
            value={profile.email}
            className="w-full bg-gray-100 border p-2 rounded"
          />

          <input
            placeholder="Phone Number"
            value={profile.phone}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setProfile((p) => ({ ...p, phone: e.target.value }))
            }
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleSaveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
