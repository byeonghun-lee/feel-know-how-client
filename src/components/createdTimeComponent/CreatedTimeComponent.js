import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./CreatedTimeComponent.scss";

dayjs.extend(relativeTime);

const Timer = ({ time }) => {
    const [displayTime, setDisplayTime] = useState();

    const getTime = (time) => {
        if (dayjs().diff(dayjs(time).toDate(), "days") < 1) {
            const timeFromNow = dayjs(time).fromNow();

            if (timeFromNow.indexOf("hours") >= 0) {
                return timeFromNow.replace("hours ago", "시간 전");
            } else if (timeFromNow.indexOf("minutes") >= 0) {
                return timeFromNow.replace("minutes ago", "분 전");
            } else {
                return "몇 초전";
            }
        } else {
            return dayjs(time).format("YYYY-MM-DD HH:mm");
        }
    };

    useEffect(() => {
        setDisplayTime(getTime(time));
    }, []);

    return (
        <div className="created-time-component">
            <p>{displayTime}</p>
        </div>
    );
};

export default Timer;
