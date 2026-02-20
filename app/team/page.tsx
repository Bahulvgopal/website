import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import Image from "next/image";

export const dynamic = "force-dynamic"; // 🚀 disable cache

export default async function TeamPage() {
  await connectDB();

  const members = await Member.find({ status: "current" })
    .sort({ priority: 1 })
    .lean();

  // Role hierarchy order
  const roleOrder = [
    "Nodal Officer",
    "Project Coordinator",
    "Mentor",
    "Chief Executive Officer",
    "Women Lead",
    "Chief Quality And Operation Officer",
    "Quality And Operation Officer",
    "Chief Technology Officer",
    "Technology Officer",
    "Chief Branding And Marketing Officer",
    "Branding And Marketing Officer",
    "Chief Finance Officer",
    "Finance Officer",
    "Chief Women Innovation Officer",
    "Women Innovation Officer",
    "Chief IPR And Research Officer",
    "IPR And Research Officer",
    "Chief Community Officer",
    "Community Officer",
    "Chief Creative And Innovation Officer",
    "Creative And Innovation Officer",
  ];

  const mentors = members.filter((m: any) => m.isMentor);
  const coreTeam = members.filter((m: any) => !m.isMentor);

  const grouped: Record<string, any[]> = {};

  roleOrder.forEach((role) => {
    const roleMembers = coreTeam.filter((m: any) => m.role === role);
    if (roleMembers.length > 0) {
      grouped[role] = roleMembers;
    }
  });

  return (
    <div className="pt-28 px-6 md:px-10 bg-black text-white min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">
        Our Team
      </h1>

      {/* 🔹 Mentors Section */}
      {mentors.length > 0 && (
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">
            Mentors
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((member: any) => (
              <div
                key={member._id.toString()}
                className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="w-full h-52 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">
                  {member.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🔹 Core Team Section */}
      {Object.keys(grouped).map((role) => (
        <section key={role} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-yellow-500">
            {role}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {grouped[role].map((member: any) => (
              <div
                key={member._id.toString()}
                className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="w-full h-52 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {member.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
