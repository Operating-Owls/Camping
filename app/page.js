'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar";
import HeroCard from "@/components/Firebase_Components/HeroCardDisplay";

export default function Home() {
  return (
    <div>
    <Calendar/>
    <HeroCard />
    </div>
  );
}
