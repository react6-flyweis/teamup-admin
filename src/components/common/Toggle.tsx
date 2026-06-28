import React, { useEffect, useRef, useState } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeText?: string;
  inactiveText?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  activeColor = "#10A200",
  inactiveColor = "#EC221F",
  activeText,
  inactiveText,
}) => {
  const activeRef = useRef<HTMLSpanElement>(null);
  const inactiveRef = useRef<HTMLSpanElement>(null);
  const [activeWidth, setActiveWidth] = useState(0);
  const [inactiveWidth, setInactiveWidth] = useState(0);

  useEffect(() => {
    if (activeRef.current) {
      setActiveWidth(activeRef.current.clientWidth);
    }
    if (inactiveRef.current) {
      setInactiveWidth(inactiveRef.current.clientWidth);
    }
  }, [activeText, inactiveText]);

  // Sizing constants
  const paddingX = 8;
  const gap = 10;
  const knobSize = 18;
  const containerHeight = 32;
  const minWidth = 56; // Minimum width for no-text case
  const knobTop = (containerHeight - knobSize) / 2;
  const textTop = (containerHeight - 20) / 2;

  const activeHasText = !!activeText;
  const inactiveHasText = !!inactiveText;

  const activeContainerWidth =
    paddingX * 2 + knobSize + (activeHasText ? gap + activeWidth : 0);
  const inactiveContainerWidth =
    paddingX * 2 + knobSize + (inactiveHasText ? gap + inactiveWidth : 0);

  const currentContainerWidth = checked
    ? activeContainerWidth
    : inactiveContainerWidth;

  const knobLeft = checked
    ? paddingX
    : Math.max(currentContainerWidth, minWidth) - paddingX - knobSize;

  const activeTextLeft = paddingX + knobSize + (activeHasText ? gap : 0);
  const inactiveTextLeft = paddingX;

  return (
    <>
      <div className="absolute left-[-9999px]">
        <span
          ref={activeRef}
          className="text-sm font-medium text-white"
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.1px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {activeText}
        </span>
      </div>
      <div className="absolute left-[-9999px] ">
        <span
          ref={inactiveRef}
          className="text-sm font-medium text-white"
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.1px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {inactiveText}
        </span>
      </div>
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer "
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className="relative overflow-hidden rounded-[24px]"
          style={{
            width: `${Math.max(currentContainerWidth, minWidth)}px`,
            height: `${containerHeight}px`,
            backgroundColor: checked ? activeColor : inactiveColor,
            transition: "background-color 0.5s, width 0.5s",
          }}
        >
          <div
            className="absolute bg-white rounded-[10px]"
            style={{
              width: `${knobSize}px`,
              height: `${knobSize}px`,
              left: `${knobLeft}px`,
              top: `${knobTop}px`,
              transition: "left 0.5s",
            }}
          />
          {activeHasText && (
            <span
              className="absolute text-sm font-medium text-white"
              style={{
                left: `${activeTextLeft}px`,
                top: `${textTop}px`,
                opacity: checked ? 1 : 0,
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                transition: "opacity 0.5s",
              }}
            >
              {activeText}
            </span>
          )}
          {inactiveHasText && (
            <span
              className="absolute text-sm font-medium text-white"
              style={{
                left: `${inactiveTextLeft}px`,
                top: `${textTop}px`,
                opacity: checked ? 0 : 1,
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.1px",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                transition: "opacity 0.5s",
              }}
            >
              {inactiveText}
            </span>
          )}
        </div>
      </label>
    </>
  );
};

export default Toggle;
