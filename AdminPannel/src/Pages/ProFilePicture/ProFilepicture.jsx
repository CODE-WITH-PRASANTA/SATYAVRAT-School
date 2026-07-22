import React, { useState, useEffect } from "react";
import API, { IMAGE_URL } from "../../Api/axios";
import "./ProFilepicture.css";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150";

const ProFilePicture = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
    avatar: "",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 1. Fetch Profile Data on Mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/profile");
      if (res.data && res.data.data) {
        setProfile(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setMessage("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Form Field Changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    if (message) setMessage("");
  };

  // 3. Handle Avatar File Selection & Direct Upload
  const handleAvatarSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show temporary local preview instantly
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: previewUrl }));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setMessage("Uploading avatar...");
      const res = await API.post("/profile/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data && res.data.data) {
        setProfile(res.data.data);
        setMessage("Profile picture updated successfully!");
      }
    } catch (err) {
      console.error("Error uploading avatar:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to upload avatar.");
    } finally {
      // Reset file input value to allow re-uploading the same file
      e.target.value = "";
    }
  };

  // 4. Remove Profile Picture
  const deleteAvatar = async () => {
    try {
      setMessage("Removing avatar...");
      const res = await API.delete("/profile/avatar");
      if (res.data && res.data.data) {
        setProfile(res.data.data);
        setMessage("Profile picture removed");
      }
    } catch (err) {
      console.error("Error deleting avatar:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to delete avatar.");
    }
  };

  // 5. Save Form Details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await API.put("/profile", {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        bio: profile.bio,
      });

      if (res.data && res.data.data) {
        setProfile(res.data.data);
        setMessage(res.data.message || "Profile details saved successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to save profile details.");
    } finally {
      setSaving(false);
    }
  };

  // Safe Image URL Resolver
  const getAvatarSrc = () => {
    if (!profile.avatar) return DEFAULT_AVATAR;

    // Local object URL (blob) or full HTTP address
    if (profile.avatar.startsWith("blob:") || /^https?:\/\//i.test(profile.avatar)) {
      return profile.avatar;
    }

    // Backend relative image path formatting
    const base = IMAGE_URL || "";
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const cleanPath = profile.avatar.startsWith("/") ? profile.avatar : `/${profile.avatar}`;

    return `${cleanBase}${cleanPath}`;
  };

  const currentAvatarSrc = getAvatarSrc();

  if (loading) {
    return <div className="ProfilePage__loading">Loading profile...</div>;
  }

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__container">
        {/* Header */}
        <div className="ProfilePage__header">
          <div className="ProfilePage__headerContent">
            <h1 className="ProfilePage__title">Admin Profile</h1>
            <p className="ProfilePage__subtitle">
              Manage your personal details & profile preferences
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="ProfilePage__content">
          {/* Sidebar / Photo Card */}
          <div className="ProfilePage__sidebarCard">
            <div className="ProfilePage__avatarWrapper">
              <img
                src={currentAvatarSrc}
                alt="Avatar"
                className="ProfilePage__avatar"
                onError={(e) => {
                  e.target.src = DEFAULT_AVATAR;
                }}
              />

              <label className="ProfilePage__avatarOverlay" title="Change Avatar">
                <svg
                  className="ProfilePage__cameraIcon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="ProfilePage__hiddenInput"
                />
              </label>
            </div>

            <h3 className="ProfilePage__name">{profile.name || "Admin User"}</h3>
            <span className="ProfilePage__roleBadge">{profile.role || "User"}</span>

            <label className="ProfilePage__avatarBtn">
              Change Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                className="ProfilePage__hiddenInput"
              />
            </label>

            {profile.avatar && (
              <button
                type="button"
                className="ProfilePage__deleteBtn"
                onClick={deleteAvatar}
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Form Card */}
          <form className="ProfilePage__formCard" onSubmit={handleSubmit}>
            <div className="ProfilePage__formHeader">
              <h2>Account Settings</h2>
              <p>Keep your information up to date</p>
            </div>

            {message && (
              <div className="ProfilePage__errorBanner" role="alert">
                {message}
              </div>
            )}

            <div className="ProfilePage__grid">
              <div className="ProfilePage__field">
                <label className="ProfilePage__label">Full Name</label>
                <input
                  name="name"
                  value={profile.name || ""}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="ProfilePage__input"
                  required
                />
              </div>

              <div className="ProfilePage__field">
                <label className="ProfilePage__label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={profile.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="ProfilePage__input"
                  required
                />
              </div>

              <div className="ProfilePage__field ProfilePage__field--full">
                <label className="ProfilePage__label">Phone Number</label>
                <input
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="ProfilePage__input"
                />
              </div>
            </div>

            <div className="ProfilePage__field">
              <label className="ProfilePage__label">Bio</label>
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                placeholder="Write a short description..."
                className="ProfilePage__input ProfilePage__textarea"
              />
            </div>

            <div className="ProfilePage__actions">
              <button
                type="submit"
                className="ProfilePage__saveBtn"
                disabled={saving}
              >
                <span>{saving ? "Saving..." : "Save Changes"}</span>
                <svg
                  className="ProfilePage__btnIcon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProFilePicture;