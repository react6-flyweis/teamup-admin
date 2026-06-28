import { useState, useEffect } from "react";
import { FormDropdown } from "@/components/common/FormDropdown";
import CloseIcon from "@/assets/icons/CloseIcon";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  assignedZone: string;
  shiftTiming: string;
  status: "Active" | "On Leave" | "Inactive";
}

interface FormData {
  name: string;
  role: string;
  assignedZone: string;
  shiftTiming: string;
  active: boolean;
  permissions: {
    manageBooking: boolean;
    accessReport: boolean;
    editZones: boolean;
    handlePayments: boolean;
  };
}

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffData: StaffMember) => void;
  staff?: StaffMember | null;
}

export default function CreateRoleModal({ isOpen, onClose, onSave, staff }: CreateRoleModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    assignedZone: "",
    shiftTiming: "",
    active: false,
    permissions: {
      manageBooking: false,
      accessReport: false,
      editZones: false,
      handlePayments: false
    }
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or staff changes
  useEffect(() => {
    if (isOpen) {
      if (staff) {
        // Edit mode - populate with staff data
        setFormData({
          name: staff.name,
          role: staff.role,
          assignedZone: staff.assignedZone,
          shiftTiming: staff.shiftTiming,
          active: staff.status === "Active",
          permissions: {
            manageBooking: true, // Default permissions for existing staff
            accessReport: true,
            editZones: true,
            handlePayments: true
          }
        });
      } else {
        // Create mode - reset to empty
        setFormData({
          name: "",
          role: "",
          assignedZone: "",
          shiftTiming: "",
          active: false,
          permissions: {
            manageBooking: false,
            accessReport: false,
            editZones: false,
            handlePayments: false
          }
        });
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, staff]);

  const handlePermissionChange = (permission: keyof typeof formData.permissions) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.assignedZone) {
      newErrors.assignedZone = "Assigned Zone is required";
    }

    if (!formData.shiftTiming) {
      newErrors.shiftTiming = "Shift Timing is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const staffData: StaffMember = {
        id: staff?.id || `staff_${Date.now()}`, // Generate ID for new staff
        name: formData.name.trim(),
        role: formData.role,
        assignedZone: formData.assignedZone,
        shiftTiming: formData.shiftTiming,
        status: formData.active ? "Active" : "Inactive"
      };

      onSave(staffData);
      onClose();
    } catch (error) {
      console.error("Error saving staff data:", error);
      // Handle error (could show toast notification)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[#F9D2EA] border border-white rounded-2xl p-6 w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-400 pb-4">
            <h2 className="font-poppins font-semibold text-[22px] text-[#0C0C0C]">
              {staff ? "Edit Staff Role" : "Create Staff Role"}
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-6 h-6 flex items-center justify-center bg-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder="Enter Name"
                className={`px-4 py-3 rounded-lg border font-roboto text-sm bg-white ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-roboto">{errors.name}</span>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <FormDropdown
                options={["Manager", "Game Host", "Cashier", "Bartender"]}
                value={formData.role}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, role: value }));
                  if (errors.role) {
                    setErrors(prev => ({ ...prev, role: undefined }));
                  }
                }}
                width="100%"
                placeholder="Select Role"
              />
              {errors.role && (
                <span className="text-red-500 text-xs font-roboto">{errors.role}</span>
              )}
            </div>

            {/* Assigned Zone */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Assigned Zone <span className="text-red-500">*</span>
              </label>
              <FormDropdown
                options={[
                  "All Zones",
                  "Axe Throwing",
                  "Entrance Lobby",
                  "Bar A",
                  "Bar B",
                  "Shuffle Board",
                  "Beer Pong Zone",
                  "Main Counter"
                ]}
                value={formData.assignedZone}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, assignedZone: value }));
                  if (errors.assignedZone) {
                    setErrors(prev => ({ ...prev, assignedZone: undefined }));
                  }
                }}
                width="100%"
                placeholder="Select Zone"
              />
              {errors.assignedZone && (
                <span className="text-red-500 text-xs font-roboto">{errors.assignedZone}</span>
              )}
            </div>

            {/* Shift Timing */}
            <div className="flex flex-col gap-2">
              <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
                Shift Timing <span className="text-red-500">*</span>
              </label>
              <FormDropdown
                options={[
                  "10:00 AM - 18:00 PM",
                  "18:00 PM - 02:00 AM",
                  "14:00 PM - 22:00 PM"
                ]}
                value={formData.shiftTiming}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, shiftTiming: value }));
                  if (errors.shiftTiming) {
                    setErrors(prev => ({ ...prev, shiftTiming: undefined }));
                  }
                }}
                width="100%"
                placeholder="Select Time"
              />
              {errors.shiftTiming && (
                <span className="text-red-500 text-xs font-roboto">{errors.shiftTiming}</span>
              )}
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex flex-col gap-2">
            <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
              Active
            </label>
            <div className="flex items-center gap-3">
              <div
                className={`relative rounded-full bg-white`}
                style={{ width: "50px", height: "24px" }}
              >
                <div
                  className={`absolute w-5 h-5 rounded-full top-1/2 transform -translate-y-1/2 transition-transform ${formData.active ? "bg-[#003240]" : "bg-gray-400"
                    } ${formData.active ? "translate-x-[26px]" : "translate-x-[4px]"
                    }`}
                />
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="font-roboto text-sm text-[#0C0C0C]">
                {formData.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Permission */}
          <div className="flex flex-col gap-2">
            <label className="font-roboto text-sm text-[#0C0C0C] font-medium">
              Permission
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(formData.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="relative w-[24px] h-[24px] bg-[#003240] rounded cursor-pointer"
                    onClick={() => handlePermissionChange(key as keyof typeof formData.permissions)}
                  >
                    {value && (
                      <div className="absolute w-[17px] h-[11px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 17 11" fill="none" className="w-full h-full">
                          <path
                            d="M1 5.5L6 9.5L16 1.5"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="font-roboto text-sm text-[#0C0C0C]">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-[#7E0B0B] rounded-[10px] text-[#7E0B0B] font-poppins font-semibold text-base bg-transparent hover:bg-[#E1017D]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#E1017D] rounded-[10px] text-white font-poppins font-semibold text-base hover:bg-[#c9016f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isSubmitting ? "Saving..." : staff ? "Update Role" : "Create Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}