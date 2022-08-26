import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllMweets } from "../firebase/data/mweet";

const MweetsList = () => {
  let [mweets, setMweets] = useState([]);

  useEffect(() => {
    const getMweets = async () => {
      const data = await getAllMweets();
      setMweets(data);
    };
    getMweets();
  }, [mweets]);

  return (
    <div className="py-40 flex flex-row">
      <div>
        {mweets.map((mweetData: any) => (
          <div key={mweetData.key} className="py-2 flex flex-row pt-8">
            <div className="pr-2">
              <Image
                src={mweetData.user.photoURL}
                width={35}
                height={35}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-14 flex flex-row gap-2">
                <p>
                  {mweetData.user.firstName + " " + mweetData.user.lastName}
                </p>
                <p className="text-gray2">{mweetData.user.username}</p>
                <li className="text-gray2">{mweetData.createdAt}</li>
              </div>

              <p>{mweetData.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MweetsList;
