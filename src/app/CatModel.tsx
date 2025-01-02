"use client";

import dynamic from "next/dynamic";

const DynamicScene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
    return (
        <div className="w-full h-screen">
            <DynamicScene />
        </div>
    );
}
