import { useState } from "react";
function ProfileTabs({ course }) {
  const [activeTab, setActiveTab] = useState("aboutMe");
  if (!course || !course.information) return <p>Loading...</p>;
  const tabs = [
    { key: "aboutMe", label: "About Me" },
    { key: "meAsATeacher", label: "Me As A Teacher" },
    { key: "lessonsAndTeachingStyle", label: "Teaching Style" },
    { key: "resumeCertificates", label: "Resume" },
  ];
  return (
    <div>
      <div className="font-bold flex justify-center gap-4  my-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative text-[12px] text-sm px-3 py-1 transition-all duration-300 ease-in-out
              ${activeTab === tab.key ? " text-blue-600" : ""}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "aboutMe" && (
          <div>
            <div className="flex ">
              <ul className="  flex flex-wrap list-none items-center text-sm gap-2 ">
                <li>
                  <strong>Interests</strong>
                </li>
                {course.information.aboutMe.interests.map((item, i) => (
                  <li
                    className="bg-red-400 flex  items-center  px-2 rounded-sm"
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="my-5 text-justify ">
              {course.information.aboutMe.introduce}
            </p>
          </div>
        )}

        {activeTab === "meAsATeacher" && (
          <p>{course.information.meAsATeacher.description}</p>
        )}

        {activeTab === "lessonsAndTeachingStyle" && (
          <div>
            <p>{course.information.lessonsAndTeachingStyle.script}</p>
            <ul className="list-disc pl-5 mt-2">
              {course.information.lessonsAndTeachingStyle.materials.map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </div>
        )}

        {activeTab === "resumeCertificates" && (
          <div>
            <h4 className="font-semibold">Certificates:</h4>
            <ul className="list-disc pl-5">
              {course.information.resumeCertificates.certificates.map(
                (c, i) => (
                  <li key={i}>{c}</li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProfileTabs;
