import { useState } from "react";

export default function PromotionalNotificationSettings() {
  const [settings, setSettings] = useState({
    pushNotification: true,
    emailNotification: true,
    smsAlert: true,
  });

  const [disabled] = useState({
    pushNotification: false,
    emailNotification: false,
    smsAlert: false,
  });

  const getKnobColor = (isDisabled: boolean, isChecked: boolean) => {
    if (isDisabled) return "bg-gray-400";
    return isChecked ? "bg-[#003240]" : "bg-gray-400";
  };

  const handleToggle = (setting: keyof typeof settings) => {
    if (disabled[setting]) return;
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const toggles = [
    {
      key: "pushNotification",
      label: "Enable Push Notification",
    },
    {
      key: "emailNotification",
      label: "Enable Email Notification",
    },
    {
      key: "smsAlert",
      label: "Enable SMS Alert",
    },
  ] as const;

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Promotional Email & Push Notification
        </h2>
      </div>
      <div
        className="flex flex-col items-start gap-4 p-6 bg-[#F9D2EA] rounded-[16px]"
        style={{ height: "248px" }}
      >
        <div className="flex flex-col items-start gap-4 w-full">
          {toggles.map(({ key, label }) => {
            const isDisabled = disabled[key];
            const isChecked = settings[key];
            const knobColor = getKnobColor(isDisabled, isChecked);

            return (
              <div
                key={key}
                className={`flex flex-col items-start p-4 w-full border rounded-[8px] ${isDisabled ? "border-gray-400 bg-gray-50" : "border-black"
                  }`}
                style={{ height: "56px" }}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-start gap-2">
                      <span
                        className={`font-manrope font-bold text-base ${isDisabled ? "text-gray-400" : "text-black"
                          }`}
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: "22px",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div
                    className={`relative rounded-full bg-white`}
                    style={{ width: "50px", height: "24px" }}
                  >
                    <div
                      className={`absolute w-5 h-5 rounded-full top-1/2 transform -translate-y-1/2 transition-transform ${knobColor} ${isChecked
                        ? "translate-x-[26px]"
                        : "translate-x-[4px]"
                        }`}
                    />
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(key)}
                      disabled={isDisabled}
                      className={`absolute inset-0 w-full h-full opacity-0 ${isDisabled
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                        }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
