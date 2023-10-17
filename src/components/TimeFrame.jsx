import React from "react";
import PropTypes from "prop-types";

export default function TimeFrame({ value, onChange }) {
    return (
        <div className="time-buttons">
        <button className="short-button time" onClick={() => onChange("short_term")} disabled={value === "short_term"}>
            last 30 days
        </button>
        <button className="medium-button time" onClick={() => onChange("medium_term")} disabled={value === "medium_term"}>
            last 6 months
        </button>
        <button className="long-button time" onClick={() => onChange("long_term")} disabled={value === "long_term"}>
            of all time
        </button>
        </div>
    );
}

TimeFrame.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
