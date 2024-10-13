/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Navside from "../components/navside";
import Setting from "../components/setting";
import Link from "next/link";
import { RiAddLine, RiDeleteBin7Line, RiEyeLine } from "@remixicon/react";
import { getTimelines } from "@/actions/timeline";
import { getUser } from "@/actions/profile";

export default async function Page() {
  const timelines = (await getTimelines()) ?? [];
  const profile = await getUser();

  return (
    <div className="w-full flex bg-gradient-to-br from-[#1A0733] to-[#5E27D1] h-screen overflow-hidden">
      <div className="my-16 container flex justify-between gap-10 flex-row mx-auto">
        {/* Sidebar */}
        <aside className="max-w-max">
          <Navside />
        </aside>

        {/* Main Content */}
        <div className="container bg-[#10071d]/80 rounded-xl flex flex-col items-center py-10 px-6 shadow-xl space-y-8 relative overflow-hidden">
          {/* Box shadow effect */}
          <div className="absolute inset-0 bg-[#10071d] opacity-60 shadow-[0px_0px_50px_rgb(140,69,255),0px_0px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)] rounded-xl"></div>

          {/* Profile Section */}
          <div className="relative z-10">
            <Image src={profile?.profilePicture ?? "/image/profile-picture.png"} alt="Profile" width={120} height={120} className="rounded-full mb-6 bg-[#666666] border-4 border-[#fdfdfd] shadow-lg object-cover" />
          </div>

          <div className="relative z-10 text-center space-y-2">
            <div className="font-bold text-3xl text-[#f5f5f5]">{profile?.name ?? "User Name"}</div>
            <div className="font-light text-md text-[#d5d5d5] mx-auto">{profile?.bio ?? "No bio available"}</div>
          </div>

          {/* Timeline Cards */}
          <div className="w-2/3 h-[50vh] flex flex-col gap-10 border-t border-[#8c45ff] pt-4 px-5 overflow-auto justify-start relative z-10">
            {timelines.map((timeline, i) => (
              <div className="bg-[#252A34] text-white py-4 px-6 rounded-lg flex flex-row justify-between items-center shadow-[0px_0px_15px_#8c45ff] transition-all hover:shadow-[0px_0px_25px_#8c45ff]" key={i}>
                <div className="text-3xl font-bold">{timeline["year"]} | </div>
                <div className="flex gap-5">
                  <Link href={`accounts/timeline/${timeline.year}`}>
                    <span className="cursor-pointer text-gray-500 hover:text-white transition-all duration-200">
                      <RiEyeLine size={40} />
                    </span>
                  </Link>
                  <Link href={"accounts/profile"}>
                    <span className="cursor-pointer text-gray-500 hover:text-white transition-all duration-200">
                      <RiDeleteBin7Line size={40} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Timeline Button */}
          <div className="bottom-0 left-8 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-[#1A0733] to-[#6E27D1] rounded-full flex justify-center items-center shadow-[0px_0px_20px_#8c45ff] cursor-pointer transition-all hover:shadow-[0px_0px_30px_#8c45ff] relative z-10">
            <Link href={"accounts/timeline/new"}>
              <RiAddLine size={40} className="text-white" />
            </Link>
          </div>
        </div>

        {/* Settings Sidebar */}
        <aside className="max-w-max">
          <Setting />
        </aside>
      </div>
    </div>
  );
}
