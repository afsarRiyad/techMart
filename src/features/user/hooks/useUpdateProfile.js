import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePassword, updateProfile } from "../services/userServices";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      username,
      phone,
      currentPassword,
      newPassword,
      confirmPassword,
    }) => {
        const wantsPasswordChange =
        currentPassword || newPassword || confirmPassword;
        if (wantsPasswordChange) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                throw new Error("Complete all password fields");
            }
            
            if (newPassword !== confirmPassword) {
                throw new Error("New passwords do not match");
            }
            
            await changePassword({ currentPassword, newPassword });
        }
        await updateProfile({ firstName, lastName, username, phone });
        return {
                passwordChanged: Boolean(wantsPasswordChange),
            };
    },
    onMutate: () => {
      toast.loading("updating details....", { id: "update" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
       toast.success(
    data.passwordChanged
      ? "Profile and password updated successfully."
      : "Profile updated successfully.",
    { id: "update" }
  );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Could not save changes",
        { id: "update" },
      );
    },
  });
};
