import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return (
    <Layout>
      <section className="text-blue-900 flex justify-between">
        <h2>Hello,{" "} <span className="font-bold">{session?.user?.name}</span> </h2>
        <div className="flex flex-col items-center bg-gray-300 gap-1 text-black rounded-md overflow-hidden">
          <img className="w-6 h-6 md:w-24 md:h-24 rounded-md" src={session?.user?.image} alt="user" />
          <span className="font-bold px-2">
            {session?.user?.name}
          </span>
        </div>
      </section>
    </Layout>
  );
}
