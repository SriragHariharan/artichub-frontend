import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SettingsPage = () => {
  const [profilePic, setProfilePic] = useState(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
    watch: watchPassword,
  } = useForm();

  const [preferences, setPreferences] = useState({
    sports: true,
    politics: false,
    films: true,
    space: false,
    cooking: true,
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmitProfile = (data) => {
    console.log('Profile updated:', data);
  };

  const onSubmitPassword = (data) => {
    console.log('Password changed:', data);
    resetPasswordForm();
  };

  const togglePreference = (pref) => {
    setPreferences((prev) => ({ ...prev, [pref]: !prev[pref] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile, password and article preferences</p>
        </div>

        {/* Profile Section */}
        <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                className="h-20 w-20 rounded-full object-cover border border-gray-300"
                src={profilePic ?? 'https://via.placeholder.com/80'}
                alt="Current profile"
              />
            </div>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...registerProfile('username', { required: 'Username is required' })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
              {profileErrors.username && (
                <p className="text-sm text-red-600 mt-1">{profileErrors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                readOnly
                id="email"
                type="email"
                className="cursor-not-allowed mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 text-sm"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* Preferences Section */}
        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Article Preferences</h2>
          <p className="text-gray-600 mb-6">Choose the topics you'd like to see more of</p>

          <div className="space-y-4">
            {Object.keys(preferences).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  id={`${key}-pref`}
                  type="checkbox"
                  checked={preferences[key]}
                  onChange={() => togglePreference(key)}
                  className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor={`${key}-pref`} className="ml-3 text-sm text-gray-700 capitalize">
                  {key.replace(/&/g, 'and')}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => console.log('Preferences saved:', preferences)}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 text-sm"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="border-t border-gray-200 pt-10 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
          <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...registerPassword('currentPassword', {
                    required: 'Current password is required',
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...registerPassword('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...registerPassword('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) => val === watchPassword('newPassword') || 'Passwords do not match',
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default SettingsPage;
