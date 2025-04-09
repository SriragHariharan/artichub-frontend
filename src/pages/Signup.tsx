import { useForm } from "react-hook-form";

interface SignupUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    interests: string[];
}

const interests = [
  { id: "sports", label: "Sports" },
  { id: "politics", label: "Politics" },
  { id: "films", label: "Films" },
  { id: "space", label: "Space" },
  { id: "cooking", label: "Cooking" },
];

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: SignupUser) => {
    console.log(data);
    // Handle form submission
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Artichub
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to join our community
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 text-left" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                />
                {errors.username && (
                  <p className=" text-xs text-red-600">
                    {errors.username.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                />
                {errors.phone && (
                  <p className=" text-xs text-red-600">
                    {errors.phone.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                />
                {errors.email && (
                  <p className=" text-xs text-red-600">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                />
                {errors.password && (
                  <p className=" text-xs text-red-600">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className=" text-xs text-red-600">
                    {errors.confirmPassword.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Interests Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <div className="mt-2 space-y-2">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center">
                    <input
                      id={interest.id}
                      type="checkbox"
                      value={interest.id}
                      {...register("interests", {
                        required: "Please select at least one interest",
                      })}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label
                      htmlFor={interest.id}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {interest.label}
                    </label>
                  </div>
                ))}
                {errors.interests && (
                  <p className=" text-xs text-red-600">
                    {errors.interests.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}