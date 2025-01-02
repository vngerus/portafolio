'use client'
import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

export default function CatModel() {
    return (
        <main className="h-full">
            <Scene />
        </main>
    )
}